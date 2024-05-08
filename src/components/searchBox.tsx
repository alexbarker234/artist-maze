"use client";

import { KeyboardEvent, useEffect, useState } from "react";
import { useDebouncedCallback } from "use-debounce";
interface SearchBoxProps {
    runSearch: (searchText: string) => void;
    startValue?: string;
}

export default function SearchBox({ runSearch, startValue }: SearchBoxProps) {
    const [searchText, setSearchText] = useState(startValue ?? "");

    const handleInputChange = (searchTerm: string) => {
        setSearchText(searchTerm);
        handleSearch(searchTerm);
    };

    const handleSearch = useDebouncedCallback((searchTerm) => {
        runSearch(searchTerm);
    }, 300);

    const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
        if (event.key === "Enter" && searchText.replaceAll(" ", "").length > 0) {
            runSearch(searchText);
        }
    };

    useEffect(() => {
        if (startValue) runSearch(searchText);
    }, []);

    return (
        <div className="w-11/12 max-w-[700px] mx-auto my-8">
            <input
                type="text"
                value={searchText}
                onChange={(e) => handleInputChange(e.currentTarget.value)}
                onKeyDown={handleKeyDown}
                placeholder="Search..."
                className="w-full h-full bg-transparent outline-none p-3 border-2 border-white rounded text-white transition-colors hover:border-gray-300 focus:border-sky-600"
            />
        </div>
    );
}
