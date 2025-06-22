"use client";
import Loading from "@/app/loading";
import ArtistGrid from "@/components/artistGrid";
import ArtistImage from "@/components/artistImage";
import ChosenArtists from "@/components/chosenArtists";
import ErrorIcon from "@/components/errorIcon";
import { useArtistPair, useRelatedArtists } from "@/hooks/artist";
import { Artist } from "@/types/types";
import { use, useEffect, useRef, useState } from "react";
import { IconType } from "react-icons";
import { FaArrowDown, FaArrowRight, FaPeopleArrows, FaRedo, FaStopwatch } from "react-icons/fa";

const formatTime = (seconds: number) => {
  const minutes = Math.floor(seconds / 60);
  const secondsLeft = seconds % 60;
  return `${minutes}m ${secondsLeft}s`;
};

export default function Play(props: { params: Promise<{ firstArtist: string; secondArtist: string }> }) {
  const params = use(props.params);
  const [currentArtistId, setCurrentArtistId] = useState<string>(params.firstArtist);
  const [artistChain, setArtistChain] = useState<Artist[]>([]);
  // game things
  const [hasWon, setHasWon] = useState<boolean>(false);
  const [secondsElapsed, setSecondsElapsed] = useState(0);
  const [timerActive, setTimerActive] = useState(true);
  const timerActiveRef = useRef(true);

  const { data: artistPair, isError: isErrorArtistPair } = useArtistPair(params.firstArtist, params.secondArtist);
  const { data: relatedArtists, isError: isErrorRelatedArtists } = useRelatedArtists(
    artistChain[artistChain.length - 1]?.name ?? ""
  );

  // initialise
  useEffect(() => {
    if (!artistPair?.artist1) return;
    setArtistChain([artistPair.artist1]);
  }, [artistPair]);

  // timer
  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;
    if (timerActive) {
      interval = setInterval(() => {
        // check again incase
        if (!timerActiveRef.current) return;
        setSecondsElapsed((seconds) => seconds + 1);
      }, 1000);
    }

    return () => {
      interval && clearInterval(interval);
    };
  }, [secondsElapsed]);
  useEffect(() => {
    timerActiveRef.current = timerActive;
  }, [timerActive]);

  const onClickChainArtist = (index: number) => {
    const newArtistChain = artistChain.slice(0, index + 1);

    setArtistChain(newArtistChain);
    if (newArtistChain.length > 0) {
      setCurrentArtistId(newArtistChain[newArtistChain.length - 1].id);
    }
  };

  const onClickArtist = (artist: Artist) => {
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
      icon: IconType;
    }
    function Card({ icon: Icon, value, title }: CardProps) {
      return (
        <div className="flex max-w-[20rem] flex-1 rounded-md border-2 border-slate-700 p-8">
          <Icon className="float-start self-center text-4xl" />
          <div className="grow">
            <p className="text-lg font-bold">{title}</p>
            <p>{value}</p>
          </div>
        </div>
      );
    }

    return (
      <div>
        <div className="fixed top-0 z-10 h-svh w-full backdrop-blur-md" />
        <div className="fixed inset-0 z-20 m-auto flex flex-col items-center overflow-y-auto bg-slate-800 p-8 sm:h-[90%] sm:w-1/2 sm:rounded-lg">
          <div className="flex w-full justify-center gap-2 text-center">
            <Card icon={FaStopwatch} title="Time Taken:" value={formatTime(secondsElapsed)} />
            <Card icon={FaPeopleArrows} title="Distance:" value={`${artistChain.length - 2}`} />
          </div>
          <button
            className="m-4 flex cursor-pointer rounded-md border-2 border-slate-700 p-2 transition-colors hover:bg-slate-700"
            onClick={() => restart()}
          >
            <p className="mr-2">Restart</p>
            <FaRedo className="self-center" />
          </button>
          <ArtistChainVertical artistChain={artistChain} />
        </div>
      </div>
    );
  }

  function ErrorReturn() {
    return (
      <div className="m-8 flex flex-col items-center gap-4">
        <ErrorIcon className="text-6xl" />
        <div className="text-center">
          <p className="text-xl font-bold">Something went wrong!</p>
          <p>Please try refreshing the page</p>
        </div>
      </div>
    );
  }
  if (isErrorArtistPair || isErrorRelatedArtists) return <ErrorReturn />;

  // omfg the nesting
  return (
    <div>
      {artistPair != undefined ? (
        <div className="m-auto sm:w-1/2">
          <div className="m-2 text-center">Timer: {formatTime(secondsElapsed)}</div>
          <ChosenArtists artistPair={artistPair} />
          <ArtistChain artistChain={artistChain} onClickArtist={onClickChainArtist} />
          {!hasWon ? (
            relatedArtists != undefined ? (
              relatedArtists.length > 0 ? (
                <ArtistGrid artists={relatedArtists} onClickArtist={onClickArtist} />
              ) : (
                <div className="m-4 p-4 text-center">
                  <p className="font-bold">Sorry</p>
                  <p>No related artists found for this artist.</p>
                </div>
              )
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
    </div>
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
    <div className="m-4 flex flex-wrap gap-y-4">
      {artistChain.map((artist, index) => (
        <div key={index} className="flex">
          <div className="h-10 cursor-pointer transition-opacity hover:opacity-50" onClick={() => onClickArtist(index)}>
            <ArtistImage artist={artist} />
          </div>
          {index == artistChain.length - 1 ? (
            <div className="ml-2 self-center">{artist.name}</div>
          ) : (
            <FaArrowRight className="mr-2 ml-2 self-center" />
          )}
        </div>
      ))}
    </div>
  );
}

function ArtistChainVertical({ artistChain }: { artistChain: Artist[] }) {
  return (
    <div className="m-4 flex w-1/2 flex-col flex-wrap">
      {artistChain.map((artist, index) => (
        <div key={index} className="justify-center">
          <div className="flex">
            <div className="relative">
              {index != 0 && index != artistChain.length - 1 && (
                <div className="absolute top-[50%] right-full mr-4 -translate-y-1/2 font-bold">{index}.</div>
              )}
              <div className="h-16">
                <ArtistImage artist={artist} />
              </div>
            </div>
            <div className="ml-2 self-center">{artist.name}</div>
          </div>
          <div className="flex w-16 justify-center">
            {index != artistChain.length - 1 && <FaArrowDown className="m-2 self-center text-2xl" />}
          </div>
        </div>
      ))}
    </div>
  );
}
