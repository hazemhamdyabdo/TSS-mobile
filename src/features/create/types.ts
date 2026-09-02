import type { SelectOption as FormSelectOption } from '@/components/form/types';

export type SelectOption = FormSelectOption;

export type CreateActionId =
  | 'addPlayer'
  | 'addCoach'
  | 'addReferee'
  | 'addCompetition'
  | 'addClub'
  | 'addAdministrator'
  | 'addPunishment';

export type FormAttachment = {
  uri?: string;
  type?: string;
  size?: number;
};

export type FastManagementAction = {
  id: CreateActionId;
  titleKey: string;
  subtitleKey: string;
  href: CreateRouteHref;
};

export type CreateRouteHref =
  | '/add-player'
  | '/add-coach'
  | '/add-referee'
  | '/add-competition'
  | '/add-club'
  | '/add-administrator'
  | '/add-punishment';

export type CreatedPlayer = {
  id: string;
  name: string;
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
  attachmentUri?: string;
};

export type CreatedCoach = {
  id: string;
  name: string;
  club: string;
  role: string;
  level: string;
  weapon: string;
  championships: string;
  matches: string;
  attachmentUri?: string;
};

export type CreatedReferee = {
  id: string;
  name: string;
  category: string;
  weapon: string;
  region: string;
  entity: string;
  attachmentUri?: string;
};

export type CreatedCompetition = {
  id: string;
  eventName: string;
  hostLocation: string;
  registrationDeadline: string;
  startDate: string;
  endDate: string;
  weapon: string;
  gender: string;
  ageCategory: string;
  category: string;
  capacity: string;
  status: string;
  attachmentUri?: string;
};

export type CreatedClub = {
  id: string;
  clubName: string;
  region: string;
  category: string;
  playerCount: string;
  attachmentUri?: string;
};

export type CreatedAdministrator = {
  id: string;
  name: string;
  club: string;
  role: string;
  phone: string;
  email: string;
  status: string;
  attachmentUri?: string;
};

export type CreatedPunishment = {
  id: string;
  offenderType: string;
  name: string;
  penaltyType: string;
  reason: string;
  startDate: string;
  endDate: string;
  issuedBy: string;
  attachmentUri?: string;
};

export type CreateState = {
  players: CreatedPlayer[];
  coaches: CreatedCoach[];
  referees: CreatedReferee[];
  competitions: CreatedCompetition[];
  clubs: CreatedClub[];
  administrators: CreatedAdministrator[];
  punishments: CreatedPunishment[];
};
