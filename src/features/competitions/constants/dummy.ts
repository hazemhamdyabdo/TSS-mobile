import type { Competition, CompetitionsState, MatchResult, Participant } from '../types';

const BASE_PARTICIPANTS: Omit<Participant, 'id' | 'competitionId'>[] = [
  {
    nameKey: 'competitions.people.abdullahFaisal',
    photoId: 1,
    status: 'active',
    nationalTeam: true,
    rating: 1264,
    weaponKey: 'create.options.weapon.epee',
    level: '+6',
  },
  {
    nameKey: 'competitions.people.hanaRashed',
    photoId: 2,
    status: 'suspended',
    nationalTeam: false,
    rating: 1365,
    weaponKey: 'create.options.weapon.foil',
    level: '+4',
  },
  {
    nameKey: 'competitions.people.faisalQahtani',
    photoId: 3,
    status: 'active',
    nationalTeam: false,
    rating: 1684,
    weaponKey: 'create.options.weapon.foil',
    level: '+3',
  },
  {
    nameKey: 'competitions.people.saadDosari',
    photoId: 4,
    status: 'active',
    nationalTeam: false,
    rating: 1510,
    weaponKey: 'create.options.weapon.foil',
    level: '+3',
  },
  {
    nameKey: 'competitions.people.aliMalki',
    photoId: 5,
    status: 'suspended',
    nationalTeam: false,
    rating: 1422,
    weaponKey: 'create.options.weapon.sabre',
    level: '+2',
  },
];

export const DUMMY_COMPETITIONS: Competition[] = [
  {
    id: 'asian-senior',
    titleKey: 'competitions.items.asian.title',
    nameKey: 'competitions.items.asian.name',
    categoryKey: 'competitions.category.senior',
    eventTypeKey: 'competitions.eventType.individualFoil',
    locationKey: 'competitions.items.asian.location',
    dateKey: 'competitions.items.asian.date',
    dateRangeKey: 'competitions.items.asian.dateRange',
    timeKey: 'competitions.shared.morningTime',
    dateNumber: '18',
    dateMonthKey: 'competitions.items.asian.month',
    aboutKey: 'competitions.items.asian.about',
    playerCount: 38,
    status: 'ongoing',
  },
  {
    id: 'world-cup-senior',
    titleKey: 'competitions.items.worldCup.title',
    nameKey: 'competitions.items.worldCup.name',
    categoryKey: 'competitions.category.senior',
    eventTypeKey: 'competitions.eventType.individualFoil',
    locationKey: 'competitions.items.worldCup.location',
    dateKey: 'competitions.shared.august25',
    dateRangeKey: 'competitions.shared.august25',
    timeKey: 'competitions.shared.morningTime',
    dateNumber: '25',
    dateMonthKey: 'competitions.shared.augustMonth',
    aboutKey: 'competitions.items.worldCup.about',
    playerCount: 38,
    status: 'upcoming',
  },
  {
    id: 'world-senior',
    titleKey: 'competitions.items.world.title',
    nameKey: 'competitions.items.world.name',
    categoryKey: 'competitions.category.senior',
    eventTypeKey: 'competitions.eventType.individualFoil',
    locationKey: 'competitions.items.world.location',
    dateKey: 'competitions.shared.august25',
    dateRangeKey: 'competitions.shared.august25',
    timeKey: 'competitions.shared.morningTime',
    dateNumber: '25',
    dateMonthKey: 'competitions.shared.augustMonth',
    aboutKey: 'competitions.items.world.about',
    playerCount: 38,
    status: 'ongoing',
  },
  {
    id: 'kingdom-ended',
    titleKey: 'competitions.items.kingdom.title',
    nameKey: 'competitions.items.kingdom.name',
    categoryKey: 'competitions.category.senior',
    eventTypeKey: 'competitions.eventType.individualFoil',
    locationKey: 'competitions.items.kingdom.location',
    dateKey: 'competitions.shared.august25',
    dateRangeKey: 'competitions.shared.august25',
    timeKey: 'competitions.shared.morningTime',
    dateNumber: '25',
    dateMonthKey: 'competitions.shared.augustMonth',
    aboutKey: 'competitions.items.kingdom.about',
    playerCount: 38,
    status: 'ended',
  },
  {
    id: 'kingdom-upcoming',
    titleKey: 'competitions.items.kingdom.title',
    nameKey: 'competitions.items.kingdom.name',
    categoryKey: 'competitions.category.senior',
    eventTypeKey: 'competitions.eventType.individualFoil',
    locationKey: 'competitions.items.kingdom.location',
    dateKey: 'competitions.shared.august25',
    dateRangeKey: 'competitions.shared.august25',
    timeKey: 'competitions.shared.morningTime',
    dateNumber: '25',
    dateMonthKey: 'competitions.shared.augustMonth',
    aboutKey: 'competitions.items.kingdom.about',
    playerCount: 38,
    status: 'upcoming',
  },
];

function participantsFor(competitionId: string): Participant[] {
  return BASE_PARTICIPANTS.map((participant, index) => ({
    ...participant,
    id: `${competitionId}-p${index + 1}`,
    competitionId,
  }));
}

function resultsFor(competitionId: string): MatchResult[] {
  return [
    {
      id: `${competitionId}-m1`,
      competitionId,
      startSide: {
        nameKey: 'competitions.people.ahmedKhaldi',
        nationality: 'sa',
        photoId: 1,
        score: 15,
      },
      endSide: {
        nameKey: 'competitions.people.mohammedOtaibi',
        nationality: 'qa',
        photoId: 2,
        score: 7,
      },
      roundKey: 'competitions.rounds.quarterFinal',
      dateKey: 'competitions.shared.august25',
      timeKey: 'competitions.shared.morningTime',
    },
    {
      id: `${competitionId}-m2`,
      competitionId,
      startSide: {
        nameKey: 'competitions.people.faisalQahtani',
        nationality: 'sa',
        photoId: 3,
        score: 3,
      },
      endSide: {
        nameKey: 'competitions.people.saadDosari',
        nationality: 'qa',
        photoId: 4,
        score: 8,
      },
      roundKey: 'competitions.rounds.roundOf16',
      dateKey: 'competitions.shared.august25',
      timeKey: 'competitions.shared.morningTime',
    },
    {
      id: `${competitionId}-m3`,
      competitionId,
      startSide: {
        nameKey: 'competitions.people.aliMalki',
        nationality: 'sa',
        photoId: 5,
        score: 15,
      },
      endSide: {
        nameKey: 'competitions.people.abdullahFaisal',
        nationality: 'qa',
        photoId: 1,
        score: 11,
      },
      roundKey: 'competitions.rounds.roundOf32',
      dateKey: 'competitions.shared.august25',
      timeKey: 'competitions.shared.morningTime',
    },
  ];
}

export const DUMMY_PARTICIPANTS: Participant[] = DUMMY_COMPETITIONS.flatMap((competition) =>
  participantsFor(competition.id),
);

export const DUMMY_RESULTS: MatchResult[] = DUMMY_COMPETITIONS.flatMap((competition) =>
  resultsFor(competition.id),
);

export const DUMMY_COMPETITIONS_STATE: CompetitionsState = {
  items: DUMMY_COMPETITIONS,
  participants: DUMMY_PARTICIPANTS,
  results: DUMMY_RESULTS,
  monthlyParticipantCount: 120,
};
