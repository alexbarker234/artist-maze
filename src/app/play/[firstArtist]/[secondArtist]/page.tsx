"use client";
import Loading from "@/app/loading";
import ArtistImage from "@/components/artistImage";
import ArtistRow from "@/components/artistRow";
import ChosenArtists from "@/components/chosenArtists";
import { useArtist, useArtistPair, useRelatedArtists } from "@/hooks/artist";
import {
    IconDefinition,
    faArrowDown,
    faArrowRight,
    faArrowsRotate,
    faPeopleArrows,
    faStopwatch
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";

const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const secondsLeft = seconds % 60;
    return `${minutes}m ${secondsLeft}s`;
};

export default function Play({ params }: { params: { firstArtist: string; secondArtist: string } }) {
    const [currentArtistId, setCurrentArtistId] = useState<string>(params.firstArtist);
    const [artistChain, setArtistChain] = useState<Artist[]>([]);
    // game things
    const [hasWon, setHasWon] = useState<boolean>(false);
    const [secondsElapsed, setSecondsElapsed] = useState(0);
    const [timerActive, setTimerActive] = useState(true);

    const { data: artistPair } = useArtistPair(params.firstArtist, params.secondArtist);
    const { data: currentArtist } = useArtist(currentArtistId);
    const { data: relatedArtists } = useRelatedArtists(currentArtistId);

    // initialise
    useEffect(() => {
        if (!artistPair?.artist1) return;
        setArtistChain([artistPair.artist1]);
    }, [artistPair]);

    // timer
    useEffect(() => {
        let interval = null;
        if (timerActive) {
            interval = setInterval(() => {
                // check again incase
                if (!timerActive) return;
                setSecondsElapsed((seconds) => seconds + 1);
            }, 1000);
        }

        return () => {
            interval && clearInterval(interval);
        };
    }, [secondsElapsed]);

    const onClickChainArtist = (index: number) => {
        const newArtistChain = artistChain.slice(0, index + 1);

        setArtistChain(newArtistChain);
        if (newArtistChain.length > 0) {
            setCurrentArtistId(newArtistChain[newArtistChain.length - 1].id);
        }
    };

    const onClickArtist = (event: React.MouseEvent, artist: Artist) => {
        setArtistChain([...artistChain, artist]);
        setCurrentArtistId(artist.id);

        scrollTo(0, 0);

        // WIN
        if (artist.id == params.secondArtist) {
            setHasWon(true);
            setTimerActive(false);
        }
    };

    const restart = () => {
        if (!artistPair?.artist1) return;

        setCurrentArtistId(params.firstArtist);
        setSecondsElapsed(0);
        setTimerActive(true);
        setHasWon(false);
        setArtistChain([artistPair.artist1]);
    };

    // sub componenets
    function WinScreen() {
        interface CardProps {
            title: string;
            value: string;
            icon: IconDefinition;
        }
        function Card({ icon, value, title }: CardProps) {
            return (
                <div className="p-8 flex-1 max-w-[20rem] flex border-2 border-slate-700 rounded-md">
                    <FontAwesomeIcon icon={icon} className="self-center text-4xl float-start " />
                    <div className="grow">
                        <p className="text-lg font-bold">{title}</p>
                        <p>{value}</p>
                    </div>
                </div>
            );
        }

        return (
            <div>
                <div className="fixed z-10 w-full h-svh top-0 backdrop-blur-md" />
                <div className="fixed z-20 p-8 inset-0 m-auto w-1/2 h-[90%] bg-slate-800 flex flex-col items-center rounded-lg overflow-y-auto">
                    <div className="flex gap-2 w-full justify-center text-center">
                        <Card icon={faStopwatch} title="Time Taken:" value={formatTime(secondsElapsed)} />
                        <Card icon={faPeopleArrows} title="Distance:" value={`${artistChain.length - 2}`} />
                    </div>
                    <button
                        className="flex m-4 p-2 border-2 border-slate-700 rounded-md hover:bg-slate-700 transition-colors"
                        onClick={() => restart()}
                    >
                        <p className="mr-2">Restart</p>
                        <FontAwesomeIcon icon={faArrowsRotate} className="self-center" />
                    </button>
                    <ArtistChainVertical artistChain={artistChain} />
                </div>
            </div>
        );
    }

    return (
        <main className="mt-16">
            {artistPair != undefined ? (
                <div className="w-1/2 m-auto">
                    <h1>Timer: {formatTime(secondsElapsed)}</h1>
                    <ChosenArtists artistPair={artistPair} />
                    <ArtistChain artistChain={artistChain} onClickArtist={onClickChainArtist} />
                    {!hasWon ? (
                        relatedArtists != undefined ? (
                            relatedArtists.map((artist, index) => {
                                return <ArtistRow key={index} artist={artist} onClickArtist={onClickArtist} />;
                            })
                        ) : (
                            <Loading />
                        )
                    ) : (
                        <></>
                    )}
                </div>
            ) : (
                <Loading />
            )}
            {hasWon && <WinScreen />}
        </main>
    );
}

function ArtistChain({
    artistChain,
    onClickArtist
}: {
    artistChain: Artist[];
    onClickArtist: (index: number) => void;
}) {
    return (
        <div className="flex m-4 flex-wrap gap-y-4">
            {artistChain.map((artist, index) => (
                <div key={artist.id} className="flex">
                    <div
                        className="h-10 hover:opacity-50 transition-opacity cursor-pointer"
                        onClick={() => onClickArtist(index)}
                    >
                        <ArtistImage artist={artist} />
                    </div>
                    {index == artistChain.length - 1 ? (
                        <div className="self-center ml-2">{artist.name}</div>
                    ) : (
                        <FontAwesomeIcon className="self-center mr-2 ml-2" icon={faArrowRight} />
                    )}
                </div>
            ))}
        </div>
    );
}

function ArtistChainVertical({ artistChain }: { artistChain: Artist[] }) {
    return (
        <div className="flex m-4 flex-wrap flex-col w-1/2">
            {artistChain.map((artist, index) => (
                <div key={artist.id} className="justify-center">
                    <div className="flex">
                        <div className="relative">
                            {index != 0 && index != artistChain.length - 1 && (
                                <div className="absolute mr-4 right-[100%] top-[50%] -translate-y-1/2 font-bold">
                                    {index}.
                                </div>
                            )}
                            <div className="h-16">
                                <ArtistImage artist={artist} />
                            </div>
                        </div>
                        <div className="self-center ml-2">{artist.name}</div>
                    </div>
                    <div className="w-16 flex justify-center">
                        {index != artistChain.length - 1 && (
                            <FontAwesomeIcon className="self-center m-2 text-2xl" icon={faArrowDown} />
                        )}
                    </div>
                </div>
            ))}
        </div>
    );
}
