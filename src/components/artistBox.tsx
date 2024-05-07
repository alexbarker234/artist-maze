import Image from "next/image";
import NoArtist from "@/../public/NoArtistImg.svg";

interface ArtistBoxProps {
    artist: Artist;
    className?: string;
    onClickArtist?: (event: React.MouseEvent, artist: Artist) => void;
}

export default function ArtistBox({ artist, className, onClickArtist }: ArtistBoxProps) {
    return (
        <div key={Math.random()} className={className}>
            <div className="" onClick={(e) => onClickArtist && onClickArtist(e, artist)}>
                {artist.imageURL ? <Image src={artist.imageURL} alt={artist.name} width={640} height={640} /> : <Image className="" src={NoArtist} alt={artist.name} />}
            </div>
            <div>{artist.name}</div>
        </div>
    );
}
