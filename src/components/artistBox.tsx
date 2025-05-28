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
                    "mb-0 pb-8 w-44 h-64 relative flex flex-col overflow-y-hidden transition-opacity duration-200",
                    className
                ),
                { "animate-fadeDropIn opacity-0": delay != undefined }
            )}
            style={{ animationDelay: `${delay}s` }}
        >
            <div
                onClick={(e) => onClickArtist && onClickArtist(artist)}
                className={clsx({ "cursor-pointer hover:opacity-50 transition-opacity": onClickArtist })}
            >
                <ArtistImage artist={artist} />
            </div>
            <div>{artist.name}</div>
        </div>
    );
}
