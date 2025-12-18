import Image from 'next/image';
import Link from 'next/link';
import { Calendar, ChevronsRight, Trophy } from 'lucide-react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import type { Tournament } from '@/lib/types';
import { format } from 'date-fns';

interface TournamentCardProps {
  tournament: Tournament;
}

export default function TournamentCard({ tournament }: TournamentCardProps) {
  return (
    <Card className="flex flex-col overflow-hidden transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
      <div className="relative aspect-video">
        <Image
          src={tournament.bannerUrl}
          alt={tournament.name}
          fill
          className="object-cover"
          data-ai-hint={tournament.bannerImageHint}
        />
        <div className="absolute top-2 right-2">
            <Badge variant="secondary" className="bg-background/80 backdrop-blur-sm">
                <Trophy className="mr-1.5 h-3 w-3 text-accent" />
                {tournament.sport}
            </Badge>
        </div>
      </div>
      <CardHeader>
        <CardTitle className="font-headline tracking-tight">{tournament.name}</CardTitle>
        <CardDescription className="flex items-center gap-2">
          <Calendar className="h-4 w-4" />
          <span>{format(new Date(tournament.startDate), 'MMM d, yyyy')} - {format(new Date(tournament.endDate), 'MMM d, yyyy')}</span>
        </CardDescription>
      </CardHeader>
      <CardContent className="flex-grow">
        <p className="text-muted-foreground line-clamp-2">{tournament.description}</p>
      </CardContent>
      <CardFooter>
        <Button asChild className="w-full">
          <Link href={`/tournaments/${tournament.id}`}>
            View Tournament <ChevronsRight className="ml-2 h-4 w-4" />
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
