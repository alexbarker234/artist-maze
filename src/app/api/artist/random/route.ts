import { searchArtists } from "@/lib/spotify";
import { SpotifySearchResponse } from "@/types/spotifyAPI";
import { Artist, ErrorResponse } from "@/types/types";
import { NextResponse } from "next/server";
import seedrandom from "seedrandom";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const seed = searchParams.get("seed");
    if (!seed) return NextResponse.json({ error: "no seed supplied" }, { status: 400 });

    const random = seedrandom(seed);

    const letters = "abcdefghijklmnopqrstuvwxyz";
    const randomLetter = letters[Math.floor(random() * letters.length)];
    const wildcard = `${randomLetter}*`;
    const offset = Math.floor(Math.random() * 4);

    const spotifyResponse = await searchArtists(wildcard, offset);
    if (spotifyResponse.status >= 400) {
      console.log(spotifyResponse);
      const response: ErrorResponse = { error: "request error" };
      return NextResponse.json(response, { status: spotifyResponse.status });
    }
    const json: SpotifySearchResponse = await spotifyResponse.json();

    const randomNum = Math.floor(random() * 20);
    const chosen = json.artists.items[randomNum];

    const artist: Artist = {
      id: chosen.id,
      name: chosen.name,
      imageURL: chosen.images.length > 0 ? chosen.images[0].url : "",
      popularity: chosen.popularity,
      link: chosen.external_urls.spotify
    };

    return NextResponse.json(artist);
  } catch (e) {
    console.log(e);
    const response: ErrorResponse = { error: "internal error" };
    return NextResponse.json(response, { status: 500 });
  }
}
