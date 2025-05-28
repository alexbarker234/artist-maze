import { Artist, ArtistPair } from "@/types/types";
import { useQuery } from "@tanstack/react-query";

const requestArtist = async (artistId: string) => {
    const params = new URLSearchParams({
        id: artistId
    });

    const url = `/api/artist?${params.toString()}`;

    const response: Artist = await (await fetch(url)).json();
    return response;
};

export const useArtist = (artistId: string) => {
    const queryFn = async () => {
        const response: Artist = await requestArtist(artistId);
        return response;
    };

    return useQuery({
        queryKey: ["artist", artistId],
        queryFn: queryFn
    });
};

export const useArtistPair = (firstArtistId: string, secondArtistId: string) => {
    return useQuery<ArtistPair>({
        queryKey: ["artistPair", firstArtistId, secondArtistId],
        queryFn: async () => ({
            artist1: await requestArtist(firstArtistId),
            artist2: await requestArtist(secondArtistId)
        })
    });
};

export const useRelatedArtists = (artistId: string) => {
    const queryFn = async () => {
        const params = new URLSearchParams({
            id: artistId
        });

        const url = `/api/artist/related?${params.toString()}`;

        const response: Artist[] = await (await fetch(url)).json();
        return response;
    };

    return useQuery({
        queryKey: ["relatedArtists", artistId],
        queryFn: queryFn
    });
};

export const useRandomArtist = (seed: number) => {
    const queryFn = async () => {
        const params = new URLSearchParams({
            seed: seed.toString()
        });

        const url = `/api/artist/random?${params.toString()}`;

        const response: Artist = await (await fetch(url)).json();
        return response;
    };

    return useQuery({
        queryKey: ["randomArtist", seed],
        queryFn: queryFn,
        enabled: seed != 0
    });
};
