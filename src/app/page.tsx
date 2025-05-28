export default function Home() {
  return (
    <>
      {/* <div className="flex justify-center flex-col sm:flex-row">
        <GameCard title="Custom" description="Choose 2 artists" icon={faPen} href="/custom"></GameCard>
        <GameCard
          title="Daily"
          description="Play the daily challenge - Coming soon"
          icon={faCalendarDays}
          href="/daily"
          disabled={true}
        ></GameCard>
        <GameCard title="Random" description="Play with two random artists" icon={faShuffle} href="/random"></GameCard> 
      </div> */}

      <div className="h-full flex items-center">
        <div className="text-center p-8 max-w-2xl mx-auto border-2 border-slate-700 rounded-lg">
          <h1 className="text-2xl font-bold mb-4">
            Game Temporarily<sup className="text-sm"> (?)</sup> Unavailable
          </h1>
          <p className="mb-4">
            Unfortunately, Spotify has disabled the API endpoints that this game relies on. I am working on finding an
            alternative solution to bring the game back online.
          </p>
          <p className="text-sm text-slate-400">Come on Spotify :(</p>
        </div>
      </div>
    </>
  );
}
