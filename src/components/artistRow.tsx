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
        "mx-auto mb-8 h-40 relative flex flex-row overflow-y-hidden transition-opacity duration-200 gap-4 cursor-pointer hover:opacity-50 bg-gray-900",
        className
      )}
      onClick={(e) => onClickArtist && onClickArtist(e, artist)}
    >
      <div className="relative block h-full aspect-square transition duration-200 select-none bg-(--grey) overflow-hidden shrink-0">
        <ArtistImage artist={artist} />
      </div>
      <div className="text-3xl self-center">{artist.name}</div>
    </div>
  );
}
