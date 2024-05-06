import ArtistSearch from "../components/artistSearch";
import GameCard from "./gameCard";

export default function Home() {
    return (
        <main style={{ marginTop: "4rem" }}>
            <div className=" flex justify-center flex-col sm:flex-row">
                <GameCard title="Custom" description="Choose 2 artists" href="/custom"></GameCard>
                <GameCard title="Daily" description="Play the daily challenge - Coming soon" href="/daily" disabled={true}></GameCard>
            </div>
        </main>
    );
}
