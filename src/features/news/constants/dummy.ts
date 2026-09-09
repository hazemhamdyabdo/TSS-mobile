import type {
  NewsCategory,
  NewsCategoryFilter,
  NewsHeroSlide,
  NewsItem,
} from '../types';

export const NEWS_CATEGORY_FILTERS: NewsCategoryFilter[] = [
  'all',
  'tournaments',
  'nationalTeam',
];

export const NEWS_HERO_SLIDES: NewsHeroSlide[] = [
  {
    id: 'hero-kingdom',
    category: 'tournaments',
    titleKey: 'news.hero.kingdom.title',
    eventTypeKey: 'news.meta.individualFoil',
    dateKey: 'news.hero.kingdom.date',
    timeKey: 'news.meta.time1000',
    locationKey: 'news.hero.kingdom.location',
    imageId: 'hero1',
    newsId: 'news-saudi-grand',
  },
  {
    id: 'hero-youth',
    category: 'tournaments',
    titleKey: 'news.hero.youth.title',
    eventTypeKey: 'news.meta.individualFoil',
    dateKey: 'news.hero.youth.date',
    timeKey: 'news.meta.time1000',
    locationKey: 'news.hero.youth.location',
    imageId: 'tournament',
    newsId: 'news-saudi-grand-2',
  },
  {
    id: 'hero-national',
    category: 'nationalTeam',
    titleKey: 'news.items.nationalPrep.title',
    eventTypeKey: 'news.meta.trainingCamp',
    dateKey: 'news.hero.national.date',
    timeKey: 'news.meta.time0900',
    locationKey: 'news.hero.national.location',
    imageId: 'national',
    newsId: 'news-national-prep',
  },
];

const SAUDI_GRAND_DETAILS: NewsItem['details'] = {
  statusKey: 'news.status.ended',
  subtitleKey: 'news.details.saudiGrand.subtitle',
  dateRangeKey: 'news.details.saudiGrand.dateRange',
  venueKey: 'news.details.saudiGrand.venue',
  countriesCount: 9,
  playersCount: 163,
  durationKey: 'news.details.saudiGrand.duration',
  weaponsKey: 'news.details.saudiGrand.weapons',
  bodyKey: 'news.details.saudiGrand.body',
  countries: [
    { flag: '🇸🇦', nameKey: 'news.countries.saudi' },
    { flag: '🇧🇭', nameKey: 'news.countries.bahrain' },
    { flag: '🇶🇦', nameKey: 'news.countries.qatar' },
    { flag: '🇰🇼', nameKey: 'news.countries.kuwait' },
    { flag: '🇦🇪', nameKey: 'news.countries.uae' },
    { flag: '🇪🇬', nameKey: 'news.countries.egypt' },
    { flag: '🇴🇲', nameKey: 'news.countries.oman' },
    { flag: '🇹🇩', nameKey: 'news.countries.chad' },
    { flag: '🇩🇿', nameKey: 'news.countries.algeria' },
  ],
  program: [
    {
      id: 'day1',
      labelKey: 'news.program.day1',
      dateKey: 'news.program.dates.day1',
      itemKeys: [
        'news.program.items.registration',
        'news.program.items.poules',
        'news.program.items.preliminary',
      ],
    },
    {
      id: 'day2',
      labelKey: 'news.program.day2',
      dateKey: 'news.program.dates.day2',
      itemKeys: [
        'news.program.items.semiFinal',
        'news.program.items.knockout',
        'news.program.items.mainRounds',
      ],
    },
    {
      id: 'day3',
      labelKey: 'news.program.day3',
      dateKey: 'news.program.dates.day3',
      itemKeys: [
        'news.program.items.finals',
        'news.program.items.awards',
        'news.program.items.closing',
      ],
    },
  ],
};

export const NEWS_ITEMS: NewsItem[] = [
  {
    id: 'news-saudi-grand',
    category: 'tournaments',
    titleKey: 'news.items.saudiGrand.title',
    summaryKey: 'news.items.saudiGrand.summary',
    imageId: 'tournament',
    meta: {
      eventTypeKey: 'news.meta.individualFoil',
      timeKey: 'news.meta.time1000',
      dateKey: 'news.meta.date18Aug',
      locationKey: 'news.meta.newDelhi',
    },
    details: { ...SAUDI_GRAND_DETAILS },
  },
  {
    id: 'news-saudi-grand-2',
    category: 'tournaments',
    titleKey: 'news.items.saudiGrand.title',
    summaryKey: 'news.items.saudiGrand.summary',
    imageId: 'details',
    meta: {
      eventTypeKey: 'news.meta.individualFoil',
      timeKey: 'news.meta.time1000',
      dateKey: 'news.meta.date18Aug',
      locationKey: 'news.meta.newDelhi',
    },
    details: { ...SAUDI_GRAND_DETAILS },
  },
  {
    id: 'news-national-prep',
    category: 'nationalTeam',
    titleKey: 'news.items.nationalPrep.title',
    summaryKey: 'news.items.nationalPrep.summary',
    imageId: 'national',
    hasVideo: true,
    details: {
      statusKey: 'news.status.ongoing',
      subtitleKey: 'news.details.nationalPrep.subtitle',
      dateRangeKey: 'news.details.nationalPrep.dateRange',
      venueKey: 'news.details.nationalPrep.venue',
      countriesCount: 1,
      playersCount: 28,
      durationKey: 'news.details.nationalPrep.duration',
      weaponsKey: 'news.details.saudiGrand.weapons',
      bodyKey: 'news.details.nationalPrep.body',
      countries: [{ flag: '🇸🇦', nameKey: 'news.countries.saudi' }],
      program: [
        {
          id: 'day1',
          labelKey: 'news.program.day1',
          dateKey: 'news.program.dates.camp1',
          itemKeys: [
            'news.program.items.training',
            'news.program.items.fitness',
            'news.program.items.tactics',
          ],
        },
        {
          id: 'day2',
          labelKey: 'news.program.day2',
          dateKey: 'news.program.dates.camp2',
          itemKeys: [
            'news.program.items.sparring',
            'news.program.items.videoReview',
            'news.program.items.recovery',
          ],
        },
        {
          id: 'day3',
          labelKey: 'news.program.day3',
          dateKey: 'news.program.dates.camp3',
          itemKeys: [
            'news.program.items.selection',
            'news.program.items.briefing',
            'news.program.items.travelPrep',
          ],
        },
      ],
    },
  },
  {
    id: 'news-national-camp',
    category: 'nationalTeam',
    titleKey: 'news.items.nationalCamp.title',
    summaryKey: 'news.items.nationalCamp.summary',
    imageId: 'national',
    hasVideo: true,
    details: {
      statusKey: 'news.status.ongoing',
      subtitleKey: 'news.details.nationalPrep.subtitle',
      dateRangeKey: 'news.details.nationalPrep.dateRange',
      venueKey: 'news.details.nationalPrep.venue',
      countriesCount: 1,
      playersCount: 28,
      durationKey: 'news.details.nationalPrep.duration',
      weaponsKey: 'news.details.saudiGrand.weapons',
      bodyKey: 'news.details.nationalPrep.body',
      countries: [{ flag: '🇸🇦', nameKey: 'news.countries.saudi' }],
      program: [
        {
          id: 'day1',
          labelKey: 'news.program.day1',
          dateKey: 'news.program.dates.camp1',
          itemKeys: [
            'news.program.items.training',
            'news.program.items.fitness',
            'news.program.items.tactics',
          ],
        },
        {
          id: 'day2',
          labelKey: 'news.program.day2',
          dateKey: 'news.program.dates.camp2',
          itemKeys: [
            'news.program.items.sparring',
            'news.program.items.videoReview',
            'news.program.items.recovery',
          ],
        },
        {
          id: 'day3',
          labelKey: 'news.program.day3',
          dateKey: 'news.program.dates.camp3',
          itemKeys: [
            'news.program.items.selection',
            'news.program.items.briefing',
            'news.program.items.travelPrep',
          ],
        },
      ],
    },
  },
];

export function getNewsById(id: string): NewsItem | undefined {
  return NEWS_ITEMS.find((item) => item.id === id);
}

export function getNewsByCategory(category: NewsCategory): NewsItem[] {
  return NEWS_ITEMS.filter((item) => item.category === category);
}

export function categoryTitleKey(category: NewsCategory) {
  switch (category) {
    case 'tournaments':
      return 'news.sections.tournaments';
    case 'nationalTeam':
      return 'news.sections.nationalTeam';
    default: {
      const exhaustive: never = category;
      return exhaustive;
    }
  }
}
