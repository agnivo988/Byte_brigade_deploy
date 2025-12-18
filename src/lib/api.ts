import { tournaments } from './mock-data';
import type { Tournament, Match } from './types';

const delay = (ms: number) => new Promise(res => setTimeout(res, ms));

export async function getTournaments(): Promise<Tournament[]> {
  await delay(500);
  return tournaments;
}

export async function getTournamentById(id: string): Promise<Tournament | null> {
  await delay(500);
  const tournament = tournaments.find(t => t.id === id) || null;
  return tournament;
}

export async function getMatchById(tournamentId: string, matchId: string): Promise<Match | null> {
    await delay(300);
    const tournament = tournaments.find(t => t.id === tournamentId);
    if (!tournament) return null;
    const match = tournament.matches.find(m => m.id === matchId) || null;
    return match;
}
