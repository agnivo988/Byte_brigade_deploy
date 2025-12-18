import { getMatchById, getTournamentById } from '@/lib/api';
import { notFound } from 'next/navigation';
import Scoreboard from '@/components/Scoreboard';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import FixtureCard from '@/components/FixtureCard';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';

export default async function MatchPage({ params }: { params: { id: string, matchId: string }}) {
  const match = await getMatchById(params.id, params.matchId);
  const tournament = await getTournamentById(params.id);

  if (!match || !tournament) {
    notFound();
  }

  const otherMatches = tournament.matches.filter(m => m.id !== match.id).slice(0, 3);

  return (
    <div className="space-y-12">
        <Button asChild variant="outline">
            <Link href={`/tournaments/${tournament.id}`}>
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to {tournament.name}
            </Link>
        </Button>
        
        <Scoreboard initialMatch={match} />

        <Card>
            <CardHeader>
                <CardTitle>Other Matches</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
                {otherMatches.map(otherMatch => (
                    <FixtureCard key={otherMatch.id} match={otherMatch} />
                ))}
            </CardContent>
        </Card>
    </div>
  );
}
