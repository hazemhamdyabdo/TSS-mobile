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
  | '/regulations'
  | '/laws';

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
  publishedAt: string;
  issuePeriod: string;
  sectionKeys: string[];
};

export type FencingLawFilter = 'all' | 'basics' | 'weapons' | 'match' | 'refereeing';

export type FencingLawSectionId = Exclude<FencingLawFilter, 'all'>;

export type FencingLawExplanationArticle = {
  kind: 'explanation';
  id: string;
  titleKey: string;
  bodyKey: string;
};

export type FencingLawPenaltyItem = {
  titleKey: string;
  bodyKey: string;
};

export type FencingLawPenaltiesArticle = {
  kind: 'penalties';
  id: string;
  items: FencingLawPenaltyItem[];
};

export type FencingLawBulletsArticle = {
  kind: 'bullets';
  id: string;
  titleKey: string;
  bulletKeys: string[];
};

export type FencingLawArticle =
  | FencingLawExplanationArticle
  | FencingLawPenaltiesArticle
  | FencingLawBulletsArticle;

export type FencingLawSection = {
  id: FencingLawSectionId;
  titleKey: string;
  articles: FencingLawArticle[];
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
