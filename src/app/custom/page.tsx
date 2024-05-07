"use client";
import ArtistSearch from "@/components/artistSearch";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

export default function Home() {
    const router = useRouter();
    const [artists, setArtists] = useState<Artist[]>([]);

    const onClickArtist = (event: React.MouseEvent, artist: Artist) => {
        let newArtists = [...artists];

        if (artists.length < 2) {
            newArtists = [...artists, artist];
        }
        if (artists.length == 1) {
            router.push(`/play/${newArtists[0].id}/${newArtists[1].id}`);
        }
        setArtists(newArtists);
    };

    return (
        <main style={{ marginTop: "4rem" }}>
            {/* {artists[0] && <ArtistBox artist={artists[0]}></ArtistBox>}
            {artists[1] && <ArtistBox artist={artists[1]}></ArtistBox>} */}
            <ArtistSearch onClickArtist={onClickArtist}></ArtistSearch>
        </main>
    );
}
