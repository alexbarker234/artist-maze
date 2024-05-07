"use client";

import { KeyboardEvent, useEffect, useState } from "react";
import { useDebouncedCallback } from "use-debounce";
import styles from "./searchBox.module.scss";
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
        <div className={styles["search"]}>
            <input
                type="text"
                value={searchText}
                onChange={(e) => handleInputChange(e.currentTarget.value)}
                onKeyDown={handleKeyDown}
                placeholder="Search..."
            />
        </div>
    );
}
