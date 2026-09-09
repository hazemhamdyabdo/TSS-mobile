import type { MatchStat } from '@/features/competitions/types';

import type { LiveMatch } from '../types';

const LIVE_STATS: MatchStat[] = [
  {
    id: 'touches',
    labelKey: 'competitions.matchDetails.stats.touches',
    startValue: 12,
    endValue: 8,
  },
  {
    id: 'successRate',
    labelKey: 'competitions.matchDetails.stats.successRate',
    startValue: 48,
    endValue: 32,
  },
  {
    id: 'highestStreak',
    labelKey: 'competitions.matchDetails.stats.highestStreak',
    startValue: 5,
    endValue: 3,
  },
  {
    id: 'successfulAttacks',
    labelKey: 'competitions.matchDetails.stats.successfulAttacks',
    startValue: 16,
    endValue: 10,
  },
  {
    id: 'failedAttacks',
    labelKey: 'competitions.matchDetails.stats.failedAttacks',
    startValue: 6,
    endValue: 8,
  },
];

function createLiveMatch(id: string): LiveMatch {
  return {
    id,
    tournamentKey: 'competitions.items.asian.title',
    roundKey: 'competitions.rounds.quarterFinal',
    dateKey: 'competitions.shared.august25',
    weaponKey: 'competitions.matchDetails.weaponFoil',
    durationMinutes: 26,
    viewerCount: 1540,
    startSide: {
      nameKey: 'competitions.people.ahmedKhaldi',
      nationality: 'sa',
      photoId: 1,
      score: 2,
    },
    endSide: {
      nameKey: 'competitions.people.mohammedOtaibi',
      nationality: 'qa',
      photoId: 2,
      score: 1,
    },
    startPeriods: [5, 7, 3, 3],
    endPeriods: [1, 2, 4, 4],
    stats: LIVE_STATS,
  };
}

export const LIVE_MATCHES: LiveMatch[] = [
  createLiveMatch('live-1'),
  createLiveMatch('live-2'),
  createLiveMatch('live-3'),
];

export const LIVE_BANNER_IMAGE = require('@/assets/images/live/match-banner.png');
export const LIVE_VIDEO_POSTER = require('@/assets/images/live/video-poster.png');
export const LIVE_DEMO_VIDEO = require('@/assets/demo-fencing.mp4');

export function getLiveMatchById(id: string): LiveMatch | undefined {
  return LIVE_MATCHES.find((match) => match.id === id);
}
