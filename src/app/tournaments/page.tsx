import TournamentCard from '@/components/TournamentCard';
import { getTournaments } from '@/lib/api';

export default async function TournamentsPage() {
  const tournaments = await getTournaments();

  return (
    <div className="space-y-8">
      <div className="text-center">
        <h1 className="text-4xl font-extrabold tracking-tight font-headline">
          All Tournaments
        </h1>
        <p className="mt-2 max-w-2xl mx-auto text-lg text-muted-foreground">
          Browse ongoing and upcoming tournaments. Click on any to see fixtures, standings, and live scores.
        </p>
      </div>

      {tournaments.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {tournaments.map((tournament) => (
            <TournamentCard key={tournament.id} tournament={tournament} />
          ))}
        </div>
      ) : (
        <div className="text-center py-16">
          <p className="text-muted-foreground">No tournaments found.</p>
        </div>
      )}
    </div>
  );
}
