"use client";
import SearchBox from "@/components/searchBox";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import Loading from "../app/loading";

import { useSearch } from "@/hooks/search";
import { Artist } from "@/types/types";
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

  const [searchTerm, setSearchTerm] = useState("");
  const { data: artists, isSuccess, isLoading, isFetched } = useSearch(searchTerm);

  const search = async (searchText: string) => {
    setSearchTerm(searchText);
  };

  function SearchResults() {
    if (isLoading) return <Loading />;
    if (!isFetched) return <></>;
    if (!isSuccess) return <ErrorIcon className="mx-auto" />;
    return <ArtistGrid artists={artists} onClickArtist={onClickArtist} />;
  }

  return (
    <>
      <SearchBox runSearch={search} startValue={shouldSave ? (searchParams.get("search") ?? "") : ""} />
      <SearchResults />

      {(!artists || artists.length == 0) && !isLoading && <div className="text-center">Search for artists!</div>}
    </>
  );
}
