import Image from 'next/image';
import { notFound } from 'next/navigation';
import { Calendar, Trophy, Users } from 'lucide-react';
import { getTournamentById } from '@/lib/api';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import FixtureCard from '@/components/FixtureCard';
import StandingsTable from '@/components/StandingsTable';
import { format } from 'date-fns';

export default async function TournamentDetailPage({ params }: { params: { id: string } }) {
  const tournament = await getTournamentById(params.id);

  if (!tournament) {
    notFound();
  }

  return (
    <div className="space-y-8">
      <div className="relative h-64 w-full rounded-lg overflow-hidden -mt-8 -mx-4">
        <Image
          src={tournament.bannerUrl}
          alt={tournament.name}
          fill
          className="object-cover"
          data-ai-hint={tournament.bannerImageHint}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
        <div className="absolute bottom-0 left-0 p-8">
          <h1 className="text-4xl font-extrabold tracking-tight text-white font-headline">
            {tournament.name}
          </h1>
          <div className="mt-2 flex flex-wrap items-center gap-4 text-white">
            <Badge variant="secondary" className="bg-white/20 backdrop-blur-sm border-0 text-white">
                <Trophy className="mr-1.5 h-3 w-3" />
                {tournament.sport}
            </Badge>
            <Badge variant="secondary" className="bg-white/20 backdrop-blur-sm border-0 text-white">
                <Users className="mr-1.5 h-3 w-3" />
                {tournament.teams.length} Teams
            </Badge>
            <Badge variant="secondary" className="bg-white/20 backdrop-blur-sm border-0 text-white">
                <Calendar className="mr-1.5 h-3 w-3" />
                {format(new Date(tournament.startDate), 'MMM d')} - {format(new Date(tournament.endDate), 'MMM d, yyyy')}
            </Badge>
          </div>
        </div>
      </div>

      <p className="text-lg text-muted-foreground">{tournament.description}</p>
      
      <Tabs defaultValue="fixtures" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="fixtures">Fixtures</TabsTrigger>
          <TabsTrigger value="standings">Standings</TabsTrigger>
        </TabsList>
        <TabsContent value="fixtures" className="mt-6">
            <div className="space-y-4">
                {tournament.matches.map(match => (
                    <FixtureCard key={match.id} match={match} />
                ))}
            </div>
        </TabsContent>
        <TabsContent value="standings" className="mt-6">
            <StandingsTable standings={tournament.standings} />
        </TabsContent>
      </Tabs>

    </div>
  );
}
