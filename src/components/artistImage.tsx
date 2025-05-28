import NoArtist from "@/../public/NoArtistImg.svg";
import { Artist } from "@/types/types";
import Image from "next/image";

export default function ArtistImage({ artist }: { artist: Artist }) {
    return (
        // this eats through vercel free tier 😔 unoptimise!
        <div className="relative block h-full aspect-square transition duration-200 select-none bg-[var(--grey)] overflow-hidden">
            {artist.imageURL ? (
                <Image unoptimized src={artist.imageURL} alt={artist.name} width={640} height={640} />
            ) : (
                <Image
                    unoptimized
                    className="absolute w-7/10 left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 filter invert-[30%]"
                    src={NoArtist}
                    alt={artist.name}
                />
            )}
        </div>
    );
}
