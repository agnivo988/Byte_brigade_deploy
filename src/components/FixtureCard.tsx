import Image from 'next/image';
import Link from 'next/link';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import type { Match } from '@/lib/types';
import { cn } from '@/lib/utils';
import { Button } from './ui/button';
import { Radio } from 'lucide-react';

export default function FixtureCard({ match }: { match: Match }) {
  const getStatusColor = (status: Match['status']) => {
    switch (status) {
      case 'live':
        return 'bg-red-500 text-white animate-pulse';
      case 'completed':
        return 'bg-secondary text-secondary-foreground';
      case 'scheduled':
      default:
        return 'bg-muted text-muted-foreground';
    }
  };

  return (
    <Card className="transition-all hover:shadow-md">
      <CardContent className="p-4 flex items-center justify-between">
        <div className="flex items-center gap-4 text-sm font-medium">
          <div className="flex flex-col items-end gap-2 text-right">
            <span>{match.teamA.name}</span>
            <span>{match.teamB.name}</span>
          </div>
          <div className="flex flex-col items-center gap-1">
            <Image src={match.teamA.logoUrl} alt={match.teamA.name} width={32} height={32} className="rounded-full" data-ai-hint={match.teamA.logoImageHint} />
            <Image src={match.teamB.logoUrl} alt={match.teamB.name} width={32} height={32} className="rounded-full" data-ai-hint={match.teamB.logoImageHint}/>
          </div>
        </div>

        <div className="text-center">
            {match.status !== 'scheduled' ? (
                 <div className="flex items-center gap-3">
                    <span className="text-2xl font-bold">{match.scoreA}</span>
                    <span className="text-muted-foreground">-</span>
                    <span className="text-2xl font-bold">{match.scoreB}</span>
                 </div>
            ) : (
                <div className="text-sm text-muted-foreground">
                    {new Date(match.date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </div>
            )}
        </div>

        <div className="flex flex-col items-center gap-2">
            <Badge className={cn("capitalize w-24 justify-center", getStatusColor(match.status))}>
                {match.status}
            </Badge>
            {match.status !== 'scheduled' && (
                <Button variant="secondary" size="sm" asChild>
                    <Link href={`/tournaments/${match.tournamentId}/match/${match.id}`}>
                        {match.status === 'live' && <Radio className="mr-2 h-4 w-4 text-red-400" />}
                        Match Page
                    </Link>
                </Button>
            )}
        </div>
      </CardContent>
    </Card>
  );
}
