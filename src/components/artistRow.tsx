import { Artist } from "@/types/types";
import { twMerge } from "tailwind-merge";
import ArtistImage from "./artistImage";
interface ArtistBoxProps {
  artist: Artist;
  className?: string;
  onClickArtist?: (event: React.MouseEvent, artist: Artist) => void;
}

export default function ArtistRow({ artist, className, onClickArtist }: ArtistBoxProps) {
  return (
    <div
      className={twMerge(
        "relative mx-auto mb-8 flex h-40 cursor-pointer flex-row gap-4 overflow-y-hidden bg-gray-900 transition-opacity duration-200 hover:opacity-50",
        className
      )}
      onClick={(e) => onClickArtist && onClickArtist(e, artist)}
    >
      <div className="relative block aspect-square h-full shrink-0 overflow-hidden bg-(--grey) transition duration-200 select-none">
        <ArtistImage artist={artist} />
      </div>
      <div className="self-center text-3xl">{artist.name}</div>
    </div>
  );
}
