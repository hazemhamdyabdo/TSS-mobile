import type { RegulationDocument, RegulationFilter } from '../types';

export const REGULATION_FILTERS: RegulationFilter[] = [
  'all',
  'competitions',
  'players',
  'clubs',
  'referees',
];

export const DUMMY_REGULATIONS: RegulationDocument[] = [
  {
    id: 'competitions',
    category: 'competitions',
    titleKey: 'more.regulations.documents.competitions.title',
    descriptionKey: 'more.regulations.documents.competitions.description',
    fileSizeMb: '4.5',
  },
  {
    id: 'players',
    category: 'players',
    titleKey: 'more.regulations.documents.players.title',
    descriptionKey: 'more.regulations.documents.players.description',
    fileSizeMb: '4.5',
  },
  {
    id: 'clubs',
    category: 'clubs',
    titleKey: 'more.regulations.documents.clubs.title',
    descriptionKey: 'more.regulations.documents.clubs.description',
    fileSizeMb: '4.5',
  },
  {
    id: 'nationalTeams',
    category: 'nationalTeams',
    titleKey: 'more.regulations.documents.nationalTeams.title',
    descriptionKey: 'more.regulations.documents.nationalTeams.description',
    fileSizeMb: '4.5',
  },
  {
    id: 'referees',
    category: 'referees',
    titleKey: 'more.regulations.documents.referees.title',
    descriptionKey: 'more.regulations.documents.referees.description',
    fileSizeMb: '4.5',
  },
  {
    id: 'rankings',
    category: 'rankings',
    titleKey: 'more.regulations.documents.rankings.title',
    descriptionKey: 'more.regulations.documents.rankings.description',
    fileSizeMb: '4.5',
  },
];
