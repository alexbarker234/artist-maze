import Loading from "@/app/loading";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import clsx from "clsx";
import ArtistImage from "./artistImage";

interface ChosenArtistsProps {
    artistPair: ArtistPair;
    displayNames?: boolean;
    loading?: { one: boolean; two: boolean };
}

export default function ChosenArtists({ artistPair, displayNames = true, loading }: ChosenArtistsProps) {
    return (
        <div className="flex w-full justify-center m-auto text-right">
            {displayNames && <ArtistName name={artistPair.artist1?.name} align="right" />}
            <ArtistItem artist={artistPair.artist1} loading={loading?.one} />
            <FontAwesomeIcon className="self-center mx-2" icon={faArrowRight} />
            <ArtistItem artist={artistPair.artist2} loading={loading?.two} />
            {displayNames && <ArtistName name={artistPair.artist2?.name} align="left" />}
        </div>
    );
}

const ArtistItem = ({ artist, loading }: { artist?: Artist; loading?: boolean }) => (
    <div className="h-10 w-10 flex">
        {loading ? <Loading className="w-full h-full m-0" /> : artist && <ArtistImage artist={artist} />}
    </div>
);

const ArtistName = ({ name, align }: { name?: string; align: "left" | "right" }) => (
    <div className={clsx(`self-center flex-1`, { "ml-2": align === "left" }, { "mr-2": align === "right" })}>
        <p className={clsx(`w-fit`, { "mr-auto": align === "left" }, { "ml-auto": align === "right" })}>{name}</p>
    </div>
);
