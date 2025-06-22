import NoArtist from "@/../public/NoArtistImg.svg";
import { Artist } from "@/types/types";
import Image from "next/image";

export default function ArtistImage({ artist }: { artist: Artist }) {
  return (
    // this eats through vercel free tier 😔 unoptimise!
    <div className="relative block aspect-square h-full overflow-hidden bg-(--grey) transition duration-200 select-none">
      {artist.imageURL ? (
        <Image unoptimized src={artist.imageURL} alt={artist.name} width={640} height={640} />
      ) : (
        <Image
          unoptimized
          className="absolute top-1/2 left-1/2 w-7/10 -translate-x-1/2 -translate-y-1/2 invert-30 filter"
          src={NoArtist}
          alt={artist.name}
        />
      )}
    </div>
  );
}
