import ArtistSearch from "@/components/artistSearch";
import { useState } from "react";

export default function Play({ params }: { params: { firstArtist: string; secondArtist: string } }) {
    const [artists, setArtists] = useState<Artist[]>([]);

    return (
        <main style={{ marginTop: "4rem" }}>
            {params.firstArtist}
            {params.secondArtist}
        </main>
    );
}
