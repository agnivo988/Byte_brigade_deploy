export type Sport = 'Football' | 'Basketball' | 'Tennis';
export type TournamentFormat = 'Round Robin' | 'Knockout' | 'League';
export type MatchStatus = 'scheduled' | 'live' | 'completed';

export interface Team {
  id: string;
  name: string;
  logoUrl: string;
  logoImageHint: string;
}

export interface Match {
  id: string;
  tournamentId: string;
  round: number;
  teamA: Team;
  teamB: Team;
  scoreA: number;
  scoreB: number;
  status: MatchStatus;
  date: string;
}

export interface Standing {
  teamId: string;
  teamName: string;
  teamLogoUrl: string;
  played: number;
  won: number;
  lost: number;
  drawn: number;
  points: number;
}

export interface Tournament {
  id: string;
  name: string;
  sport: Sport;
  format: TournamentFormat;
  startDate: string;
  endDate: string;
  description: string;
  bannerUrl: string;
  bannerImageHint: string;
  teams: Team[];
  matches: Match[];
  standings: Standing[];
}
