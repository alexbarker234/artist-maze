"use client";
import ArtistSearch from "@/components/artistSearch";
import ChosenArtists from "@/components/chosenArtists";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Loading from "../loading";

export default function Home() {
    const router = useRouter();
    const [artists, setArtists] = useState<ArtistPair>({});

    const onClickArtist = (artist: Artist) => {
        let newArtists: ArtistPair = { ...artists };

        if (!artists.artist1) newArtists.artist1 = artist;
        else if (!artists.artist2) newArtists.artist2 = artist;

        if (newArtists.artist1 && newArtists.artist2) {
            router.push(`/play/${newArtists.artist1.id}/${newArtists.artist2.id}`);
        }

        setArtists(newArtists);
    };

    const areBothSelected = artists.artist1 && artists.artist2;

    return (
        <div>
            <ChosenArtists artistPair={artists} />
            {!areBothSelected ? (
                <ArtistSearch
                    // what a wild way to reset the search box
                    key={artists.artist1?.id ?? "" + artists.artist2?.id ?? ""}
                    onClickArtist={onClickArtist}
                    shouldSave={false}
                />
            ) : (
                <Loading />
            )}
        </div>
    );
}
