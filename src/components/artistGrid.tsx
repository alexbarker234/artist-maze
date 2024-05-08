import ArtistBox from "./artistBox";

interface ArtistGridProps {
    artists: Artist[];
    onClickArtist?: (artist: Artist) => void;
}

export default function ArtistGrid({ artists, onClickArtist }: ArtistGridProps) {
    return (
        <div className="flex flex-wrap gap-x-4 justify-center">
            {artists.map((artist, index) => {
                return (
                    <ArtistBox
                        animationDelay={index * 0.05}
                        key={index}
                        artist={artist}
                        onClickArtist={onClickArtist}
                        className="sm:w-44 h-auto w-32"
                    />
                );
            })}
        </div>
    );
}
