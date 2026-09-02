import type { AddAdministratorFormValues } from './schemas/addAdministratorSchema';
import type { AddClubFormValues } from './schemas/addClubSchema';
import type { AddCoachFormValues } from './schemas/addCoachSchema';
import type { AddCompetitionFormValues } from './schemas/addCompetitionSchema';
import type { AddPlayerFormValues } from './schemas/addPlayerSchema';
import type { AddPunishmentFormValues } from './schemas/addPunishmentSchema';
import type { AddRefereeFormValues } from './schemas/addRefereeSchema';
import {
  addAdministratorToState,
  addClubToState,
  addCoachToState,
  addCompetitionToState,
  addPlayerToState,
  addPunishmentToState,
  addRefereeToState,
  getCreateState,
} from './store/createState';
import { createMockId, mockDelay } from '@/utils/mockApi';

export async function getCreatedRecords() {
  await mockDelay();
  return getCreateState();
}

export async function createPlayer(values: AddPlayerFormValues) {
  await mockDelay();
  const player = { id: createMockId('player'), ...values };
  addPlayerToState(player);
  return player;
}

export async function createCoach(values: AddCoachFormValues) {
  await mockDelay();
  const coach = { id: createMockId('coach'), ...values };
  addCoachToState(coach);
  return coach;
}

export async function createReferee(values: AddRefereeFormValues) {
  await mockDelay();
  const referee = { id: createMockId('referee'), ...values };
  addRefereeToState(referee);
  return referee;
}

export async function createCompetition(values: AddCompetitionFormValues) {
  await mockDelay();
  const competition = { id: createMockId('competition'), ...values };
  addCompetitionToState(competition);
  return competition;
}

export async function createClub(values: AddClubFormValues) {
  await mockDelay();
  const club = { id: createMockId('club'), ...values };
  addClubToState(club);
  return club;
}

export async function createAdministrator(values: AddAdministratorFormValues) {
  await mockDelay();
  const administrator = { id: createMockId('administrator'), ...values };
  addAdministratorToState(administrator);
  return administrator;
}

export async function createPunishment(values: AddPunishmentFormValues) {
  await mockDelay();
  const punishment = { id: createMockId('punishment'), ...values };
  addPunishmentToState(punishment);
  return punishment;
}
