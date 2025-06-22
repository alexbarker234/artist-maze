import { Artist } from "@/types/types";
import ArtistBox from "./artistBox";

interface ArtistGridProps {
  artists: Artist[];
  onClickArtist?: (artist: Artist) => void;
}

export default function ArtistGrid({ artists, onClickArtist }: ArtistGridProps) {
  return (
    <div className="flex flex-wrap justify-center gap-x-4">
      {artists.map((artist, index) => {
        return (
          <ArtistBox
            animationDelay={index * 0.05}
            key={index}
            artist={artist}
            onClickArtist={onClickArtist}
            className="h-auto w-32 sm:w-44"
          />
        );
      })}
    </div>
  );
}
