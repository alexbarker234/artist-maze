import { faCalendarDays, faPen, faShuffle } from "@fortawesome/free-solid-svg-icons";
import GameCard from "./gameCard";

export default function Home() {
    return (
        <>
            <div className="flex justify-center flex-col sm:flex-row">
                <GameCard title="Custom" description="Choose 2 artists" icon={faPen} href="/custom"></GameCard>
                <GameCard
                    title="Daily"
                    description="Play the daily challenge - Coming soon"
                    icon={faCalendarDays}
                    href="/daily"
                    disabled={true}
                ></GameCard>
                <GameCard
                    title="Random"
                    description="Play with two random artists"
                    icon={faShuffle}
                    href="/random"
                ></GameCard>
            </div>
        </>
    );
}
