import type { Tournament, Team, Match, Standing } from './types';
import { PlaceHolderImages } from './placeholder-images';

const teams: Team[] = [
  { id: 't1', name: 'Golden Eagles', logoUrl: PlaceHolderImages.find(i => i.id === 'team-logo-1')?.imageUrl || '', logoImageHint: 'eagles logo' },
  { id: 't2', name: 'Azure Sharks', logoUrl: PlaceHolderImages.find(i => i.id === 'team-logo-2')?.imageUrl || '', logoImageHint: 'sharks logo' },
  { id: 't3', name: 'Crimson Lions', logoUrl: PlaceHolderImages.find(i => i.id === 'team-logo-3')?.imageUrl || '', logoImageHint: 'lions logo' },
  { id: 't4', name: 'Iron Bears', logoUrl: PlaceHolderImages.find(i => i.id === 'team-logo-4')?.imageUrl || '', logoImageHint: 'bears logo' },
  { id: 't5', name: 'Shadow Tigers', logoUrl: PlaceHolderImages.find(i => i.id === 'team-logo-5')?.imageUrl || '', logoImageHint: 'tigers logo' },
  { id: 't6', name: 'Arctic Wolves', logoUrl: PlaceHolderImages.find(i => i.id === 'team-logo-6')?.imageUrl || '', logoImageHint: 'wolves logo' },
];

const generateMatches = (tournamentId: string, teams: Team[]): Match[] => {
    return [
        { id: 'm1', tournamentId, round: 1, teamA: teams[0], teamB: teams[1], scoreA: 2, scoreB: 1, status: 'completed', date: '2024-07-20T14:00:00Z' },
        { id: 'm2', tournamentId, round: 1, teamA: teams[2], teamB: teams[3], scoreA: 0, scoreB: 0, status: 'completed', date: '2024-07-20T16:00:00Z' },
        { id: 'm3', tournamentId, round: 2, teamA: teams[4], teamB: teams[5], scoreA: 1, scoreB: 3, status: 'completed', date: '2024-07-21T14:00:00Z' },
        { id: 'm4', tournamentId, round: 2, teamA: teams[0], teamB: teams[2], scoreA: 1, scoreB: 1, status: 'live', date: '2024-07-21T16:00:00Z' },
        { id: 'm5', tournamentId, round: 3, teamA: teams[1], teamB: teams[3], scoreA: 0, scoreB: 0, status: 'scheduled', date: '2024-07-22T14:00:00Z' },
        { id: 'm6', tournamentId, round: 3, teamA: teams[4], teamB: teams[0], scoreA: 0, scoreB: 0, status: 'scheduled', date: '2024-07-22T16:00:00Z' },
    ]
};

const generateStandings = (teams: Team[]): Standing[] => {
    return [
        { teamId: teams[0].id, teamName: teams[0].name, teamLogoUrl: teams[0].logoUrl, played: 1, won: 1, lost: 0, drawn: 0, points: 3 },
        { teamId: teams[5].id, teamName: teams[5].name, teamLogoUrl: teams[5].logoUrl, played: 1, won: 1, lost: 0, drawn: 0, points: 3 },
        { teamId: teams[2].id, teamName: teams[2].name, teamLogoUrl: teams[2].logoUrl, played: 1, won: 0, lost: 0, drawn: 1, points: 1 },
        { teamId: teams[3].id, teamName: teams[3].name, teamLogoUrl: teams[3].logoUrl, played: 1, won: 0, lost: 0, drawn: 1, points: 1 },
        { teamId: teams[1].id, teamName: teams[1].name, teamLogoUrl: teams[1].logoUrl, played: 1, won: 0, lost: 1, drawn: 0, points: 0 },
        { teamId: teams[4].id, teamName: teams[4].name, teamLogoUrl: teams[4].logoUrl, played: 1, won: 0, lost: 1, drawn: 0, points: 0 },
    ].sort((a,b) => b.points - a.points);
}


export const tournaments: Tournament[] = [
  {
    id: 'cl-2024',
    name: 'Campus League 2024',
    sport: 'Football',
    format: 'Round Robin',
    startDate: '2024-07-20',
    endDate: '2024-08-15',
    description: 'The annual inter-college football championship. Witness the rise of new legends.',
    bannerUrl: PlaceHolderImages.find(i => i.id === 'tournament-banner-1')?.imageUrl || '',
    bannerImageHint: 'football pitch',
    teams: teams,
    matches: generateMatches('cl-2024', teams),
    standings: generateStandings(teams),
  },
  {
    id: 'hoops-challenge-2024',
    name: 'Hoops Challenge 2024',
    sport: 'Basketball',
    format: 'Knockout',
    startDate: '2024-09-01',
    endDate: '2024-09-10',
    description: 'High-flying dunks and sharp shooting in this electrifying basketball knockout tournament.',
    bannerUrl: PlaceHolderImages.find(i => i.id === 'tournament-banner-2')?.imageUrl || '',
    bannerImageHint: 'basketball court',
    teams: teams.slice(0, 4),
    matches: generateMatches('hoops-challenge-2024', teams.slice(0, 4)).slice(0,3),
    standings: [], // No standings for knockout
  },
];
