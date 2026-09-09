export type TaskStatus = 'new' | 'pendingReview' | 'completed';

export type TaskType = 'transfer' | 'competition' | 'coach' | 'referee';

export type QuickActionId = 'addPlayer' | 'addCoach' | 'addReferee' | 'addCompetition';

export type GuestQuickActionId =
  | 'competitions'
  | 'clubs'
  | 'players'
  | 'news';

export type RelativeTimeUnit = 'minutes' | 'hours';

export type HomeProfile = {
  nameKey: 'home.userName' | 'home.guest.userName';
  roleKey: 'home.role.federationOfficial' | 'home.role.player' | 'home.role.guest';
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

export type GuestQuickAction = {
  id: GuestQuickActionId;
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

export type UpcomingCompetition = {
  id: string;
  titleKey: string;
  eventTypeKey: string;
  locationKey: string;
  dateKey: string;
  timeKey: string;
  status: 'ongoing' | 'upcoming';
};

export type HomeRankingEntry = {
  id: string;
  rank: number;
  nameKey: string;
  points: number;
  isCurrentUser?: boolean;
};

export type HomeRankingsPreview = {
  currentUser: HomeRankingEntry;
  leaders: HomeRankingEntry[];
};

export type GuestLeaderboard = {
  podium: [HomeRankingEntry, HomeRankingEntry, HomeRankingEntry];
  currentUser: HomeRankingEntry;
  list: HomeRankingEntry[];
};

export type HomeDashboard = {
  profile: HomeProfile;
  banners: ChampionshipBanner[];
  quickActions: QuickAction[];
  tasks: RecentTask[];
  guestProfile: HomeProfile;
  guestQuickActions: GuestQuickAction[];
  upcomingCompetitions: UpcomingCompetition[];
  rankingsPreview: HomeRankingsPreview;
  leaderboard: GuestLeaderboard;
};
