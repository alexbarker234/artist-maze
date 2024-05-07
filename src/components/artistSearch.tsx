"use client";
import SearchBox from "@/components/searchBox";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import Loading from "../app/loading";

import ArtistGrid from "./artistGrid";
import ErrorIcon from "./errorIcon";

interface ArtistSearchProps {
    shouldSave?: boolean;
    onClickArtist?: (artist: Artist) => void;
}

export default function ArtistSearch({ shouldSave = true, onClickArtist }: ArtistSearchProps) {
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();

    const [artistList, setArtistList] = useState<Artist[]>([]);
    const [searchState, setState] = useState<"ok" | "searching" | "error">("ok");

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
            <SearchBox runSearch={search} startValue={shouldSave ? searchParams.get("search") ?? "" : ""} />
            {searchState === "error" ? (
                <ErrorIcon className="mx-auto" />
            ) : searchState === "searching" ? (
                <Loading />
            ) : (
                <ArtistGrid artists={artistList} onClickArtist={onClickArtist} />
            )}
            {artistList.length == 0 && searchState === "ok" && <div className="text-center">Search for artists!</div>}
        </>
    );
}
