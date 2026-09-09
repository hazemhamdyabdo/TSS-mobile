export type NewsCategory = 'tournaments' | 'nationalTeam';

export type NewsCategoryFilter = 'all' | NewsCategory;

export type NewsImageId = 'hero1' | 'tournament' | 'national' | 'details';

export type NewsHeroSlide = {
  id: string;
  category: NewsCategory;
  titleKey: string;
  eventTypeKey: string;
  dateKey: string;
  timeKey: string;
  locationKey: string;
  imageId: NewsImageId;
  newsId: string;
};

export type NewsMeta = {
  eventTypeKey: string;
  timeKey: string;
  dateKey: string;
  locationKey: string;
};

export type NewsCountry = {
  flag: string;
  nameKey: string;
};

export type NewsProgramDay = {
  id: string;
  labelKey: string;
  dateKey: string;
  itemKeys: string[];
};

export type NewsDetails = {
  statusKey: string;
  subtitleKey: string;
  dateRangeKey: string;
  venueKey: string;
  countriesCount: number;
  playersCount: number;
  durationKey: string;
  weaponsKey: string;
  bodyKey: string;
  countries: NewsCountry[];
  program: NewsProgramDay[];
};

export type NewsItem = {
  id: string;
  category: NewsCategory;
  titleKey: string;
  summaryKey: string;
  imageId: NewsImageId;
  hasVideo?: boolean;
  meta?: NewsMeta;
  details?: NewsDetails;
};
