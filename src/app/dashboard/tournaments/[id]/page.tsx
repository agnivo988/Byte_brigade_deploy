import { getTournamentById } from '@/lib/api';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { notFound } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Users, Swords, BarChart } from 'lucide-react';
import Image from 'next/image';

export default async function ManageTournamentPage({ params }: { params: { id: string } }) {
  const tournament = await getTournamentById(params.id);
  if (!tournament) {
    notFound();
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight font-headline">Manage: {tournament.name}</h1>
        <p className="text-muted-foreground">Tournament management tools and overview.</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Teams</CardTitle>
          <CardDescription>Manage participating teams.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between p-2 bg-muted/50 rounded-lg">
            <div className="flex -space-x-2 overflow-hidden">
                {tournament.teams.slice(0, 5).map(team => (
                    <Image key={team.id} className="inline-block h-8 w-8 rounded-full ring-2 ring-background" src={team.logoUrl} alt={team.name} width={32} height={32} />
                ))}
            </div>
             <p className="text-sm font-medium">{tournament.teams.length} teams registered</p>
          </div>
          <Button>
            <Users className="mr-2 h-4 w-4" />
            Manage Teams
          </Button>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Fixtures</CardTitle>
          <CardDescription>Generate and manage match schedules.</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground mb-4">
            {tournament.matches.length > 0 ? `${tournament.matches.length} matches have been generated.` : 'No fixtures generated yet.'}
          </p>
          <Button>
            <Swords className="mr-2 h-4 w-4" />
            {tournament.matches.length > 0 ? 'Manage Fixtures' : 'Generate Fixtures'}
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
