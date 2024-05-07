"use client";
import SearchBox from "@/components/searchBox";
import Image from "next/image";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import Loading from "../app/loading";
import styles from "./artistSearch.module.scss";

import NoArtist from "@/../public/NoArtistImg.svg";

interface ArtistSearchProps {
    shouldSave?: boolean;
    onClickArtist?: (event: React.MouseEvent, artist: Artist) => void;
}

export default function ArtistSearch({
    shouldSave = true,
    onClickArtist
}: ArtistSearchProps) {
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();

    const [artistList, setArtistList] = useState<Artist[]>([]);
    const [searchState, setState] = useState<"ok" | "searching" | "error">(
        "ok"
    );

    const search = async (searchText: string) => {
        if (searchState == "searching") return;
        setState("searching");

        if (shouldSave) router.replace(`${pathname}?search=${searchText}`);

        // bug where token is fetched from cache first time
        let attempts = 0;
        let response: Response | undefined;
        while (attempts < 2) {
            response = await fetch(`/api/search?query=${searchText}`);
            attempts++;
            if (response.ok) break;
        }
        if (!response?.ok) {
            setState("error");
            return;
        }

        const data: Artist[] = await response.json();

        setArtistList(data);
        setState("ok");
    };

    return (
        <>
            <SearchBox
                runSearch={search}
                startValue={shouldSave ? searchParams.get("search") ?? "" : ""}
            />
            {searchState === "error" ? (
                <div className={styles["error"]}>!</div>
            ) : (
                <ArtistList
                    items={artistList}
                    isLoading={searchState === "searching"}
                    onClickArtist={onClickArtist}
                ></ArtistList>
            )}
        </>
    );
}

interface ArtistListProps {
    items: Artist[];
    isLoading: boolean;
    onClickArtist?: (event: React.MouseEvent, artist: Artist) => void;
}

function ArtistList({ items, isLoading, onClickArtist }: ArtistListProps) {
    if (isLoading)
        return (
            <div className={styles["items-container"]}>
                <Loading style={{ margin: "auto" }} />
            </div>
        );

    return (
        <div className={styles["items-container"]}>
            {items.length > 0 ? (
                items.map((artist, index) => {
                    return (
                        <div
                            key={Math.random()}
                            className={styles["item-box"]}
                            style={{ animationDelay: `${index * 0.05}s` }}
                        >
                            <div
                                className={styles["artist-image"]}
                                onClick={(e) =>
                                    onClickArtist && onClickArtist(e, artist)
                                }
                            >
                                {artist.imageURL ? (
                                    <Image
                                        src={artist.imageURL}
                                        alt={artist.name}
                                        width={640}
                                        height={640}
                                    />
                                ) : (
                                    <Image
                                        className={styles["no-img"]}
                                        src={NoArtist}
                                        alt={artist.name}
                                    />
                                )}
                            </div>
                            <div>{artist.name}</div>
                        </div>
                    );
                })
            ) : (
                <div className={styles["placeholder"]}>Search for artists!</div>
            )}
        </div>
    );
}
