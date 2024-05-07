"use client";
import Loading from "@/app/loading";
import { useArtist, useArtistPair, useRelatedArtists } from "@/hooks/artist";
import { useState } from "react";

export default function Play({ params }: { params: { firstArtist: string; secondArtist: string } }) {
    const [currentArtistId, setCurrentArtistId] = useState<string>(params.firstArtist);

    const { data: artistPair, isLoading: isArtistPairLoading } = useArtistPair(params.firstArtist, params.secondArtist);
    const { data: currentArtist, isLoading: isArtistLoading } = useArtist(currentArtistId);
    const { data: relatedArtists, isLoading: isRelatedLoading } = useRelatedArtists(currentArtistId);

    if (isArtistPairLoading || isArtistLoading || isRelatedLoading) {
        return <Loading></Loading>;
    }

    return (
        <main style={{ marginTop: "4rem" }}>
            <div className="flex">
                <div>{artistPair?.artist1.name}</div>
                <div>{" -> "}</div>
                <div>{artistPair?.artist2.name}</div>
            </div>
            <p>{currentArtist?.name}</p>
            {relatedArtists != undefined &&
                relatedArtists.map((artist, index) => {
                    return (
                        <div key={index}>
                            <div>{artist.name}</div>
                        </div>
                    );
                })}
        </main>
    );
}
