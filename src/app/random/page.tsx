"use client";
import ChosenArtists from "@/components/chosenArtists";
import { useRandomArtist } from "@/hooks/artist";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Home() {
    const router = useRouter();

    const [seed1, setSeed1] = useState(0);
    const [seed2, setSeed2] = useState(0);

    const { data: randomArtist } = useRandomArtist(seed1);
    const { data: randomArtist2 } = useRandomArtist(seed2);
    const artists: ArtistPair = { artist1: randomArtist, artist2: randomArtist2 };

    const getSeed = () => Math.floor(Math.random() * 500000);

    const reroll = (first: boolean) => {
        const seed = getSeed();
        if (first) {
        }
    };

    useEffect(() => {
        setSeed1(getSeed());
        setSeed2(getSeed());
    }, []);

    return (
        <main style={{ marginTop: "4rem" }}>
            <ChosenArtists artistPair={artists} />
        </main>
    );
}
