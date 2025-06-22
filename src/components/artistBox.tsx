import { Artist } from "@/types/types";
import clsx from "clsx";
import { twMerge } from "tailwind-merge";
import ArtistImage from "./artistImage";
interface ArtistBoxProps {
  artist: Artist;
  animationDelay?: number;
  className?: string;
  onClickArtist?: (artist: Artist) => void;
}

export default function ArtistBox({ artist, animationDelay: delay, className, onClickArtist }: ArtistBoxProps) {
  return (
    <div
      className={clsx(
        twMerge(
          "relative mb-0 flex h-64 w-44 flex-col overflow-y-hidden pb-8 transition-opacity duration-200",
          className
        ),
        { "animate-fade-drop-in opacity-0": delay != undefined }
      )}
      style={{ animationDelay: `${delay}s` }}
    >
      <div
        onClick={(e) => onClickArtist && onClickArtist(artist)}
        className={clsx({ "cursor-pointer transition-opacity hover:opacity-50": onClickArtist })}
      >
        <ArtistImage artist={artist} />
      </div>
      <div>{artist.name}</div>
    </div>
  );
}
