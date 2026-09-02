import type {
  ChampionshipBanner,
  HomeDashboard,
  HomeProfile,
  QuickAction,
  RecentTask,
} from '../types';

export const DUMMY_PROFILE: HomeProfile = {
  nameKey: 'home.userName',
  roleKey: 'home.role.federationOfficial',
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

export const DUMMY_HOME: HomeDashboard = {
  profile: DUMMY_PROFILE,
  banners: DUMMY_BANNERS,
  quickActions: DUMMY_QUICK_ACTIONS,
  tasks: DUMMY_TASKS,
};
