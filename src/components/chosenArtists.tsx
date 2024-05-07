import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import ArtistImage from "./artistImage";

export default function ChosenArtists({
    artistPair
}: {
    artistPair: ArtistPair;
}) {
    return (
        <div className="flex w-fit m-auto">
            <ArtistItem artist={artistPair.artist1} />
            <FontAwesomeIcon
                className="self-center mr-2 ml-2"
                icon={faArrowRight}
            />
            <ArtistItem artist={artistPair.artist2} />
        </div>
    );
}

function ArtistItem({ artist }: { artist?: Artist }) {
    return (
        <div className="h-10 flex">
            <div className="mr-2 h-full">
                {artist && <ArtistImage artist={artist} />}
            </div>
            {artist && <div className="self-center">{artist.name}</div>}
        </div>
    );
}
