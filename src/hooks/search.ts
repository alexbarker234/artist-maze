import { Artist } from "@/types/types";
import { useQuery } from "@tanstack/react-query";

export const useSearch = (searchTerm: string) => {
  const queryFn = async () => {
    const params = new URLSearchParams({
      query: searchTerm
    });

    const url = `/api/search?${params.toString()}`;
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error("Failed to search artists");
    }
    const data: Artist[] = await response.json();
    return data;
  };

  return useQuery({
    queryKey: ["search", searchTerm],
    queryFn: queryFn,
    enabled: searchTerm.trim() !== ""
  });
};
