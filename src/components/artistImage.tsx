import NoArtist from "@/../public/NoArtistImg.svg";
import Image from "next/image";

export default function ArtistImage({ artist }: { artist: Artist }) {
    return (
        <div className="relative block h-full aspect-square transition duration-200 select-none bg-[var(--grey)] overflow-hidden">
            {artist.imageURL ? (
                <Image
                    src={artist.imageURL}
                    alt={artist.name}
                    width={640}
                    height={640}
                />
            ) : (
                <Image
                    className="absolute w-7/10 left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 filter invert-[30%]"
                    src={NoArtist}
                    alt={artist.name}
                />
            )}
        </div>
    );
}
