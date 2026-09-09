export type MoreHubId =
  | 'clubs'
  | 'rankings'
  | 'results'
  | 'punishments'
  | 'transfers'
  | 'settings'
  | 'policies'
  | 'laws'
  | 'regulations'
  | 'contact';

export type MoreHubHref =
  | '/clubs'
  | '/(tabs)/rankings'
  | '/results'
  | '/(tabs)/punishments'
  | '/transfers'
  | '/settings'
  | '/privacy'
  | '/help'
  | '/regulations';

export type RegulationCategory =
  | 'competitions'
  | 'players'
  | 'clubs'
  | 'nationalTeams'
  | 'referees'
  | 'rankings';

export type RegulationFilter = 'all' | Exclude<RegulationCategory, 'nationalTeams' | 'rankings'>;

export type RegulationDocument = {
  id: string;
  category: RegulationCategory;
  titleKey: string;
  descriptionKey: string;
  fileSizeMb: string;
};

export type MoreHubAction = {
  id: MoreHubId;
  titleKey: string;
  subtitleKey: string;
  href: MoreHubHref;
};

export type SettingsRowId =
  | 'profile'
  | 'notifications'
  | 'language'
  | 'privacy'
  | 'help'
  | 'darkMode'
  | 'logout'
  | 'login';

export type UserProfile = {
  name: string;
  email: string;
  phone: string;
  roleKey: 'home.role.federationOfficial' | 'home.role.player';
  avatarUri?: string;
  playerDetails?: PlayerProfileDetails;
};

export type PlayerProfileDetails = {
  club: string;
  birthDate: string;
  weapon: string;
  gender: string;
  ageCategory: string;
  rating: string;
  nationality: string;
  nationalTeam: string;
  contractStart: string;
  contractEnd: string;
};

export type NotificationPrefs = {
  enabled: boolean;
  transferRequests: boolean;
  featureUpdates: boolean;
};

export type MoreState = {
  profile: UserProfile;
  notifications: NotificationPrefs;
  darkMode: boolean;
};
