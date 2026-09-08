export type MoreHubId =
  | 'clubs'
  | 'rankings'
  | 'results'
  | 'punishments'
  | 'transfers'
  | 'settings'
  | 'policies'
  | 'contact';

export type MoreHubHref =
  | '/clubs'
  | '/(tabs)/rankings'
  | '/results'
  | '/(tabs)/punishments'
  | '/transfers'
  | '/settings'
  | '/privacy'
  | '/help';

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
  | 'logout';

export type UserProfile = {
  name: string;
  email: string;
  phone: string;
  roleKey: 'home.role.federationOfficial' | 'home.role.player';
  avatarUri?: string;
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
