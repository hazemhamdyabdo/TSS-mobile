import type { RegulationDocument, RegulationFilter } from '../types';

export const REGULATION_FILTERS: RegulationFilter[] = [
  'all',
  'competitions',
  'players',
  'clubs',
  'referees',
];

/** Shared TOC keys for competition-style regulations (Figma details screen). */
export const COMPETITION_REGULATION_SECTION_KEYS = [
  'generalProvisions',
  'tournaments',
  'participation',
  'playerRegistration',
  'ageGroups',
  'competitionSystem',
  'withdrawal',
  'resultsRanking',
  'violations',
  'closingProvisions',
] as const;

const DEFAULT_META = {
  publishedAt: '29-06-2026',
  issuePeriod: '2026 - 2027',
  sectionKeys: [...COMPETITION_REGULATION_SECTION_KEYS],
};

export const DUMMY_REGULATIONS: RegulationDocument[] = [
  {
    id: 'competitions',
    category: 'competitions',
    titleKey: 'more.regulations.documents.competitions.title',
    descriptionKey: 'more.regulations.documents.competitions.description',
    fileSizeMb: '4.5',
    ...DEFAULT_META,
  },
  {
    id: 'players',
    category: 'players',
    titleKey: 'more.regulations.documents.players.title',
    descriptionKey: 'more.regulations.documents.players.description',
    fileSizeMb: '4.5',
    ...DEFAULT_META,
  },
  {
    id: 'clubs',
    category: 'clubs',
    titleKey: 'more.regulations.documents.clubs.title',
    descriptionKey: 'more.regulations.documents.clubs.description',
    fileSizeMb: '4.5',
    ...DEFAULT_META,
  },
  {
    id: 'nationalTeams',
    category: 'nationalTeams',
    titleKey: 'more.regulations.documents.nationalTeams.title',
    descriptionKey: 'more.regulations.documents.nationalTeams.description',
    fileSizeMb: '4.5',
    ...DEFAULT_META,
  },
  {
    id: 'referees',
    category: 'referees',
    titleKey: 'more.regulations.documents.referees.title',
    descriptionKey: 'more.regulations.documents.referees.description',
    fileSizeMb: '4.5',
    ...DEFAULT_META,
  },
  {
    id: 'rankings',
    category: 'rankings',
    titleKey: 'more.regulations.documents.rankings.title',
    descriptionKey: 'more.regulations.documents.rankings.description',
    fileSizeMb: '4.5',
    ...DEFAULT_META,
  },
];

export function getRegulationById(id: string): RegulationDocument | undefined {
  return DUMMY_REGULATIONS.find((document) => document.id === id);
}
