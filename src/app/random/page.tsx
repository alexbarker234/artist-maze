"use client";
import Button from "@/components/button";
import ChosenArtists from "@/components/chosenArtists";
import { useRandomArtist } from "@/hooks/artist";
import { faPlay, faRefresh } from "@fortawesome/free-solid-svg-icons";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Home() {
    const router = useRouter();

    const [seed1, setSeed1] = useState(0);
    const [seed2, setSeed2] = useState(0);

    const { data: randomArtist1, isLoading: isLoading1 } = useRandomArtist(seed1);
    const { data: randomArtist2, isLoading: isLoading2 } = useRandomArtist(seed2);
    const artists: ArtistPair = {
        artist1: isLoading1 ? undefined : randomArtist1,
        artist2: isLoading2 ? undefined : randomArtist2
    };

    const getSeed = () => Math.floor(Math.random() * 500000);

    const reroll = (first: boolean) => {
        const seed = getSeed();
        if (first) setSeed1(seed);
        else setSeed2(seed);
    };

    useEffect(() => {
        setSeed1(getSeed());
        setSeed2(getSeed());
    }, []);

    return (
        <div>
            <ChosenArtists artistPair={artists} displayNames={true} loading={{ one: isLoading1, two: isLoading2 }} />
            <div className="flex justify-center mt-4">
                <Button text="Reroll 1" icon={faRefresh} onClick={() => reroll(true)} className="mr-2 ml-2" />
                <Button text="Reroll 2" icon={faRefresh} onClick={() => reroll(false)} className="mr-2 ml-2" />
            </div>
            <div className="flex justify-center mt-4">
                <Button
                    text="Ready?"
                    icon={faPlay}
                    disabled={!artists.artist1 || !artists.artist2}
                    onClick={() => {
                        if (!artists.artist1 || !artists.artist2) return;
                        router.push(`/play/${artists.artist1.id}/${artists.artist2.id}`);
                    }}
                />
            </div>
        </div>
    );
}
