import { Artist } from "@/types/types";
import { useQuery } from "@tanstack/react-query";

export const useSearch = (searchTerm: string) => {
    const queryFn = async () => {
        const params = new URLSearchParams({
            query: searchTerm
        });

        const url = `/api/search?${params.toString()}`;

        const response: Artist[] = await (await fetch(url)).json();
        return response;
    };

    return useQuery({
        queryKey: ["search", searchTerm],
        queryFn: queryFn,
        enabled: searchTerm.trim() !== ""
    });
};
