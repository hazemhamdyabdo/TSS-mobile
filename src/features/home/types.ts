export type TaskStatus = 'new' | 'pendingReview' | 'completed';

export type TaskType = 'transfer' | 'competition' | 'coach' | 'referee';

export type QuickActionId = 'addPlayer' | 'addCoach' | 'addReferee' | 'addCompetition';

export type RelativeTimeUnit = 'minutes' | 'hours';

export type HomeProfile = {
  nameKey: 'home.userName';
  roleKey: 'home.role.federationOfficial';
  notificationCount: number;
};

export type ChampionshipBanner = {
  id: string;
  categoryKey: string;
  titleKey: string;
  eventTypeKey: string;
  dateKey: string;
  timeKey: string;
  locationKey: string;
};

export type QuickAction = {
  id: QuickActionId;
  labelKey: string;
};

export type RecentTask = {
  id: string;
  type: TaskType;
  status: TaskStatus;
  titleKey: string;
  subtitleKey: string;
  relativeTimeUnit: RelativeTimeUnit;
  relativeTimeCount: number;
};

export type HomeDashboard = {
  profile: HomeProfile;
  banners: ChampionshipBanner[];
  quickActions: QuickAction[];
  tasks: RecentTask[];
};
