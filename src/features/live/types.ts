import type {
  MatchSide,
  MatchStat,
  NationalityCode,
} from '@/features/competitions/types';

export type LiveMatchTab = 'broadcast' | 'details' | 'stats';

export type LiveMatch = {
  id: string;
  tournamentKey: string;
  roundKey: string;
  dateKey: string;
  weaponKey: string;
  durationMinutes: number;
  viewerCount: number;
  startSide: MatchSide;
  endSide: MatchSide;
  startPeriods: number[];
  endPeriods: number[];
  stats: MatchStat[];
};

export type { MatchSide, MatchStat, NationalityCode };
