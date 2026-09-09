import { DUMMY_GUEST_PROFILE as MORE_GUEST_PROFILE } from '@/features/more/constants/dummy';

import type {
  ChampionshipBanner,
  GuestLeaderboard,
  GuestQuickAction,
  HomeDashboard,
  HomeProfile,
  HomeRankingsPreview,
  QuickAction,
  RecentTask,
  UpcomingCompetition,
} from '../types';

/** Same seed as more guest profile so ranking "you" avatar matches home/settings/profile. */
const GUEST_AVATAR_SEED = MORE_GUEST_PROFILE.email;

export const DUMMY_PROFILE: HomeProfile = {
  nameKey: 'home.userName',
  roleKey: 'home.role.federationOfficial',
  notificationCount: 3,
};

export const DUMMY_GUEST_PROFILE: HomeProfile = {
  nameKey: 'home.guest.userName',
  roleKey: 'home.role.guest',
  notificationCount: 3,
};

export const DUMMY_BANNERS: ChampionshipBanner[] = [
  {
    id: 'banner-kingdom',
    categoryKey: 'home.banner.category',
    titleKey: 'home.banner.kingdom.title',
    eventTypeKey: 'home.banner.kingdom.eventType',
    dateKey: 'home.banner.kingdom.date',
    timeKey: 'home.banner.kingdom.time',
    locationKey: 'home.banner.kingdom.location',
  },
  {
    id: 'banner-youth',
    categoryKey: 'home.banner.category',
    titleKey: 'home.banner.youth.title',
    eventTypeKey: 'home.banner.youth.eventType',
    dateKey: 'home.banner.youth.date',
    timeKey: 'home.banner.youth.time',
    locationKey: 'home.banner.youth.location',
  },
  {
    id: 'banner-clubs',
    categoryKey: 'home.banner.category',
    titleKey: 'home.banner.clubs.title',
    eventTypeKey: 'home.banner.clubs.eventType',
    dateKey: 'home.banner.clubs.date',
    timeKey: 'home.banner.clubs.time',
    locationKey: 'home.banner.clubs.location',
  },
];

export const DUMMY_QUICK_ACTIONS: QuickAction[] = [
  { id: 'addPlayer', labelKey: 'home.quickActions.addPlayer' },
  { id: 'addCoach', labelKey: 'home.quickActions.addCoach' },
  { id: 'addReferee', labelKey: 'home.quickActions.addReferee' },
  { id: 'addCompetition', labelKey: 'home.quickActions.addCompetition' },
];

export const DUMMY_GUEST_QUICK_ACTIONS: GuestQuickAction[] = [
  { id: 'competitions', labelKey: 'home.guest.quickActions.competitions' },
  { id: 'clubs', labelKey: 'home.guest.quickActions.clubs' },
  { id: 'players', labelKey: 'home.guest.quickActions.players' },
  { id: 'news', labelKey: 'home.guest.quickActions.news' },
];

export const DUMMY_TASKS: RecentTask[] = [
  {
    id: 'task-1',
    type: 'transfer',
    status: 'new',
    titleKey: 'home.tasks.transfer.title',
    subtitleKey: 'home.tasks.transfer.subtitle',
    relativeTimeUnit: 'minutes',
    relativeTimeCount: 14,
  },
  {
    id: 'task-2',
    type: 'competition',
    status: 'pendingReview',
    titleKey: 'home.tasks.newCompetition.title',
    subtitleKey: 'home.tasks.newCompetition.subtitle',
    relativeTimeUnit: 'hours',
    relativeTimeCount: 1,
  },
  {
    id: 'task-3',
    type: 'coach',
    status: 'completed',
    titleKey: 'home.tasks.updateCoach.title',
    subtitleKey: 'home.tasks.updateCoach.subtitle',
    relativeTimeUnit: 'hours',
    relativeTimeCount: 3,
  },
  {
    id: 'task-4',
    type: 'referee',
    status: 'new',
    titleKey: 'home.tasks.addReferee.title',
    subtitleKey: 'home.tasks.addReferee.subtitle',
    relativeTimeUnit: 'hours',
    relativeTimeCount: 5,
  },
  {
    id: 'task-5',
    type: 'referee',
    status: 'completed',
    titleKey: 'home.tasks.addReferee.title',
    subtitleKey: 'home.tasks.addReferee.completedSubtitle',
    relativeTimeUnit: 'hours',
    relativeTimeCount: 8,
  },
];

export const DUMMY_UPCOMING_COMPETITIONS: UpcomingCompetition[] = [
  {
    id: 'upcoming-1',
    titleKey: 'competitions.items.asian.title',
    eventTypeKey: 'competitions.eventType.individualFoil',
    locationKey: 'competitions.items.asian.location',
    dateKey: 'competitions.items.asian.date',
    timeKey: 'home.banner.kingdom.time',
    status: 'ongoing',
  },
  {
    id: 'upcoming-2',
    titleKey: 'competitions.items.worldCup.title',
    eventTypeKey: 'competitions.eventType.individualFoil',
    locationKey: 'competitions.items.worldCup.location',
    dateKey: 'home.banner.kingdom.date',
    timeKey: 'home.banner.kingdom.time',
    status: 'upcoming',
  },
];

export const DUMMY_RANKINGS_PREVIEW: HomeRankingsPreview = {
  currentUser: {
    id: GUEST_AVATAR_SEED,
    rank: 6,
    nameKey: 'home.guest.ranking.youName',
    points: 1955,
    isCurrentUser: true,
  },
  leaders: [
    {
      id: 'rank-1',
      rank: 1,
      nameKey: 'home.guest.ranking.leaderName',
      points: 2433,
    },
    {
      id: 'rank-2',
      rank: 2,
      nameKey: 'home.guest.ranking.leaderName',
      points: 2234,
    },
    {
      id: 'rank-3',
      rank: 3,
      nameKey: 'home.guest.ranking.leaderName',
      points: 2166,
    },
    {
      id: 'rank-4',
      rank: 4,
      nameKey: 'home.guest.ranking.runnerName',
      points: 1966,
    },
    {
      id: 'rank-5',
      rank: 5,
      nameKey: 'home.guest.ranking.runnerName',
      points: 1966,
    },
  ],
};

export const DUMMY_LEADERBOARD: GuestLeaderboard = {
  podium: [
    {
      id: 'podium-1',
      rank: 1,
      nameKey: 'home.guest.ranking.leaderName',
      points: 2433,
    },
    {
      id: 'podium-2',
      rank: 2,
      nameKey: 'home.guest.ranking.leaderName',
      points: 2234,
    },
    {
      id: 'podium-3',
      rank: 3,
      nameKey: 'home.guest.ranking.leaderName',
      points: 2166,
    },
  ],
  currentUser: DUMMY_RANKINGS_PREVIEW.currentUser,
  list: [
    {
      id: 'list-4',
      rank: 4,
      nameKey: 'home.guest.ranking.leaderName',
      points: 1988,
    },
    {
      id: 'list-5',
      rank: 5,
      nameKey: 'home.guest.ranking.runnerName',
      points: 1966,
    },
    {
      id: GUEST_AVATAR_SEED,
      rank: 6,
      nameKey: 'home.guest.ranking.youName',
      points: 1955,
      isCurrentUser: true,
    },
    {
      id: 'list-7',
      rank: 7,
      nameKey: 'home.guest.ranking.runnerName',
      points: 1930,
    },
    {
      id: 'list-8',
      rank: 8,
      nameKey: 'home.guest.ranking.runnerName',
      points: 1909,
    },
    {
      id: 'list-9',
      rank: 9,
      nameKey: 'home.guest.ranking.runnerName',
      points: 1850,
    },
    {
      id: 'list-10',
      rank: 10,
      nameKey: 'home.guest.ranking.runnerName',
      points: 1833,
    },
    {
      id: 'list-11',
      rank: 11,
      nameKey: 'home.guest.ranking.runnerName',
      points: 1833,
    },
    {
      id: 'list-12',
      rank: 12,
      nameKey: 'home.guest.ranking.runnerName',
      points: 1833,
    },
  ],
};

export const DUMMY_HOME: HomeDashboard = {
  profile: DUMMY_PROFILE,
  banners: DUMMY_BANNERS,
  quickActions: DUMMY_QUICK_ACTIONS,
  tasks: DUMMY_TASKS,
  guestProfile: DUMMY_GUEST_PROFILE,
  guestQuickActions: DUMMY_GUEST_QUICK_ACTIONS,
  upcomingCompetitions: DUMMY_UPCOMING_COMPETITIONS,
  rankingsPreview: DUMMY_RANKINGS_PREVIEW,
  leaderboard: DUMMY_LEADERBOARD,
};
