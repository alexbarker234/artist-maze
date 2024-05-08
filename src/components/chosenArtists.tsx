import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import clsx from "clsx";
import ArtistImage from "./artistImage";

interface ChosenArtistsProps {
    artistPair: ArtistPair;
    displayNames?: boolean;
}

export default function ChosenArtists({ artistPair, displayNames }: ChosenArtistsProps) {
    return (
        <div className="flex w-full justify-center m-auto">
            {displayNames && <ArtistName name={artistPair.artist1?.name} align="right" />}
            <ArtistItem artist={artistPair.artist1} />
            <FontAwesomeIcon className="self-center mx-2" icon={faArrowRight} />
            <ArtistItem artist={artistPair.artist2} />
            {displayNames && <ArtistName name={artistPair.artist2?.name} align="left" />}
        </div>
    );
}

const ArtistItem = ({ artist }: { artist?: Artist }) => (
    <div className="h-10 w-10 flex mr-2">{artist && <ArtistImage artist={artist} />}</div>
);

const ArtistName = ({ name, align }: { name?: string; align: "left" | "right" }) => (
    <div className={`mr-2 self-center flex-1`}>
        <p className={clsx(`w-fit`, { "mr-auto": align === "left" }, { "ml-auto": align === "right" })}>{name}</p>
    </div>
);
