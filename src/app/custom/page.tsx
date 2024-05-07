"use client";
import ArtistSearch from "@/components/artistSearch";
import React, { useState } from "react";

export default function Home() {
    const [artists, setArtists] = useState<Artist[]>([]);

    const onClickArtist = (event: React.MouseEvent, artist: Artist) => {
        if (artists.length < 2) {
            setArtists([...artists, artist]);
        } else {
        }
    };

    return (
        <main style={{ marginTop: "4rem" }}>
            {artists.length >= 1 ? <>test</> : <></>}
            <ArtistSearch onClickArtist={onClickArtist}></ArtistSearch>
        </main>
    );
}
