import { getTournaments } from '@/lib/api';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { PlusCircle, Trophy, Users } from 'lucide-react';
import Link from 'next/link';

export default async function DashboardPage() {
    const tournaments = await getTournaments();

    return (
        <div className="space-y-8">
            <div>
                <h1 className="text-3xl font-bold tracking-tight font-headline">Organizer Dashboard</h1>
                <p className="text-muted-foreground">Welcome back! Here's an overview of your activities.</p>
            </div>

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Total Tournaments</CardTitle>
                        <Trophy className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{tournaments.length}</div>
                        <p className="text-xs text-muted-foreground">Managed by you</p>
                    </CardContent>
                </Card>
                 <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Live Matches</CardTitle>
                        <div className="h-4 w-4 text-red-500 animate-pulse bg-red-500 rounded-full" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">1</div>
                        <p className="text-xs text-muted-foreground">Currently in progress</p>
                    </CardContent>
                </Card>
                <Card className="md:col-span-2 lg:col-span-1 bg-primary text-primary-foreground">
                    <CardHeader>
                        <CardTitle>Create New Tournament</CardTitle>
                        <CardDescription className="text-primary-foreground/80">Get your next event up and running in minutes.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <Button asChild variant="secondary" className="w-full">
                            <Link href="/dashboard/create">
                                <PlusCircle className="mr-2 h-4 w-4" />
                                Start Now
                            </Link>
                        </Button>
                    </CardContent>
                </Card>
            </div>

            <Card>
                <CardHeader>
                    <CardTitle>Your Tournaments</CardTitle>
                    <CardDescription>A list of your recently managed tournaments.</CardDescription>
                </CardHeader>
                <CardContent>
                   <div className="space-y-4">
                        {tournaments.map(tournament => (
                            <div key={tournament.id} className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                                <div>
                                    <p className="font-semibold">{tournament.name}</p>
                                    <p className="text-sm text-muted-foreground">{tournament.sport} - {tournament.teams.length} teams</p>
                                </div>
                                <Button asChild variant="outline">
                                    <Link href={`/dashboard/tournaments/${tournament.id}`}>Manage</Link>
                                </Button>
                            </div>
                        ))}
                   </div>
                </CardContent>
                 <CardFooter>
                    <Button asChild variant="secondary" className="w-full">
                        <Link href="/dashboard/tournaments">View All Tournaments</Link>
                    </Button>
                </CardFooter>
            </Card>
        </div>
    )
}
