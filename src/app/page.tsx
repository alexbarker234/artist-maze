import { FaCalendarDay, FaPen, FaShuffle } from "react-icons/fa6";
import GameCard from "./gameCard";

export default function Home() {
  return (
    <>
      <div className="flex flex-col justify-center sm:flex-row">
        <GameCard title="Custom" description="Choose 2 artists" icon={FaPen} href="/custom"></GameCard>
        <GameCard
          title="Daily"
          description="Play the daily challenge - Coming soon"
          icon={FaCalendarDay}
          href="/daily"
          disabled={true}
        ></GameCard>
        <GameCard title="Random" description="Play with two random artists" icon={FaShuffle} href="/random"></GameCard>
      </div>
    </>
  );
}
