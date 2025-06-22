import Loading from "@/app/loading";
import { Artist, ArtistPair } from "@/types/types";
import clsx from "clsx";
import { FaArrowRight } from "react-icons/fa";
import ArtistImage from "./artistImage";

interface ChosenArtistsProps {
  artistPair: ArtistPair;
  displayNames?: boolean;
  loading?: { one: boolean; two: boolean };
}

export default function ChosenArtists({ artistPair, displayNames = true, loading }: ChosenArtistsProps) {
  return (
    <div className="m-auto flex w-full justify-center text-right">
      {displayNames && <ArtistName name={artistPair.artist1?.name} align="right" />}
      <ArtistItem artist={artistPair.artist1} loading={loading?.one} />
      <FaArrowRight className="mx-2 self-center" />
      <ArtistItem artist={artistPair.artist2} loading={loading?.two} />
      {displayNames && <ArtistName name={artistPair.artist2?.name} align="left" />}
    </div>
  );
}

const ArtistItem = ({ artist, loading }: { artist?: Artist; loading?: boolean }) => (
  <div className="flex h-10 w-10">
    {loading ? <Loading className="m-0 h-full w-full" /> : artist && <ArtistImage artist={artist} />}
  </div>
);

const ArtistName = ({ name, align }: { name?: string; align: "left" | "right" }) => (
  <div className={clsx(`flex-1 self-center`, { "ml-2": align === "left" }, { "mr-2": align === "right" })}>
    <p className={clsx(`w-fit`, { "mr-auto": align === "left" }, { "ml-auto": align === "right" })}>{name}</p>
  </div>
);
