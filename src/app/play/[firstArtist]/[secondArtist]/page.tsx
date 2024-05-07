"use client";
import Loading from "@/app/loading";
import ArtistImage from "@/components/artistImage";
import ArtistRow from "@/components/artistRow";
import ChosenArtists from "@/components/chosenArtists";
import { useArtist, useArtistPair, useRelatedArtists } from "@/hooks/artist";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";

export default function Play({ params }: { params: { firstArtist: string; secondArtist: string } }) {
    const [currentArtistId, setCurrentArtistId] = useState<string>(params.firstArtist);
    const [artistChain, setArtistChain] = useState<Artist[]>([]);

    const { data: artistPair, isLoading: isArtistPairLoading } = useArtistPair(params.firstArtist, params.secondArtist);
    const { data: currentArtist, isLoading: isArtistLoading } = useArtist(currentArtistId);
    const { data: relatedArtists, isLoading: isRelatedLoading } = useRelatedArtists(currentArtistId);

    const onClickChainArtist = (index: number) => {
        setArtistChain([...artistChain]); // cut everything past the index
        setCurrentArtistId(artistChain[artistChain.length - 1].id);
    };

    const onClickArtist = (event: React.MouseEvent, artist: Artist) => {
        setArtistChain([...artistChain, artist]);
        setCurrentArtistId(artist.id);
    };

    return (
        <main style={{ marginTop: "4rem" }}>
            {artistPair != undefined ? (
                <div className="w-1/2 m-auto">
                    <ChosenArtists artistPair={artistPair} />
                    <ArtistChain artistChain={artistChain} onClickArtist={onClickChainArtist} />
                    {relatedArtists != undefined ? (
                        relatedArtists.map((artist, index) => {
                            return <ArtistRow key={index} artist={artist} onClickArtist={onClickArtist} />;
                        })
                    ) : (
                        <Loading />
                    )}
                </div>
            ) : (
                <Loading />
            )}
        </main>
    );
}

function ArtistChain({ artistChain }: { artistChain: Artist[]; onClickArtist?: (index: number) => void }) {
    return (
        <div className="flex m-4 flex-wrap gap-y-4">
            {artistChain.map((artist, index) => (
                <>
                    <div className="h-10">
                        <ArtistImage artist={artist} />
                    </div>
                    {index == artistChain.length - 1 ? (
                        <div className="self-center ml-2">{artist.name}</div>
                    ) : (
                        <FontAwesomeIcon className="self-center mr-2 ml-2" icon={faArrowRight} />
                    )}
                </>
            ))}
        </div>
    );
}
