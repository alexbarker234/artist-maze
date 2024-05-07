import { twMerge } from "tailwind-merge";
import ArtistImage from "./artistImage";
interface ArtistBoxProps {
    artist: Artist;
    className?: string;
    onClickArtist?: (event: React.MouseEvent, artist: Artist) => void;
}

export default function ArtistBox({
    artist,
    className,
    onClickArtist
}: ArtistBoxProps) {
    return (
        <div
            className={twMerge(
                "mx-auto mb-0 pb-8 w-44 h-64 relative flex flex-col overflow-y-hidden transition-opacity duration-200",
                className
            )}
        >
            <div onClick={(e) => onClickArtist && onClickArtist(e, artist)}>
                <ArtistImage artist={artist} />
            </div>
            <div>{artist.name}</div>
        </div>
    );
}
