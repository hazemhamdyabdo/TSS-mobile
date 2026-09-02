import type { AddAdministratorFormValues } from './schemas/addAdministratorSchema';
import type { AddClubFormValues } from './schemas/addClubSchema';
import type { AddCoachFormValues } from './schemas/addCoachSchema';
import type { AddCompetitionFormValues } from './schemas/addCompetitionSchema';
import type { AddPlayerFormValues } from './schemas/addPlayerSchema';
import type { AddPunishmentFormValues } from './schemas/addPunishmentSchema';
import type { AddRefereeFormValues } from './schemas/addRefereeSchema';
import {
  createCompetitionRecord,
  updateCompetitionRecord,
} from '@/features/competitions/api';
import {
  addClubToFederationState,
  addPunishmentToFederationState,
} from '@/features/federation/store/federationState';
import { addMemberToState } from '@/features/members/store/membersState';
import {
  memberFromAdministrator,
  memberFromCoach,
  memberFromPlayer,
  memberFromReferee,
} from '@/features/members/utils/fromCreate';
import { createMockId, isFailTrigger, mockDelay, MockApiError } from '@/utils/mockApi';

export async function createPlayer(values: AddPlayerFormValues) {
  await mockDelay();
  if (isFailTrigger(values.name)) {
    throw new MockApiError('create.errors.failed', 400);
  }

  const id = createMockId('player');
  addMemberToState(memberFromPlayer(id, values));
  return { id, ...values };
}

export async function createCoach(values: AddCoachFormValues) {
  await mockDelay();
  if (isFailTrigger(values.name)) {
    throw new MockApiError('create.errors.failed', 400);
  }

  const id = createMockId('coach');
  addMemberToState(memberFromCoach(id, values));
  return { id, ...values };
}

export async function createReferee(values: AddRefereeFormValues) {
  await mockDelay();
  if (isFailTrigger(values.name)) {
    throw new MockApiError('create.errors.failed', 400);
  }

  const id = createMockId('referee');
  addMemberToState(memberFromReferee(id, values));
  return { id, ...values };
}

export async function createCompetition(values: AddCompetitionFormValues) {
  return createCompetitionRecord(values);
}

export async function updateCompetition(id: string, values: AddCompetitionFormValues) {
  return updateCompetitionRecord(id, values);
}

export async function createClub(values: AddClubFormValues) {
  await mockDelay();
  if (isFailTrigger(values.clubName)) {
    throw new MockApiError('create.errors.failed', 400);
  }

  const club = {
    id: createMockId('club'),
    name: values.clubName,
    region: values.region,
    category: values.category,
    playerCount: values.playerCount,
    attachmentUri: values.attachmentUri,
  };
  addClubToFederationState(club);
  return club;
}

export async function createAdministrator(values: AddAdministratorFormValues) {
  await mockDelay();
  if (isFailTrigger(values.name)) {
    throw new MockApiError('create.errors.failed', 400);
  }

  const id = createMockId('administrator');
  addMemberToState(memberFromAdministrator(id, values));
  return { id, ...values };
}

export async function createPunishment(values: AddPunishmentFormValues) {
  await mockDelay();
  if (isFailTrigger(values.name) || isFailTrigger(values.reason)) {
    throw new MockApiError('create.errors.failed', 400);
  }

  const punishment = {
    id: createMockId('punishment'),
    offenderType: values.offenderType,
    name: values.name,
    penaltyType: values.penaltyType,
    reason: values.reason,
    startDate: values.startDate,
    endDate: values.endDate,
    issuedBy: values.issuedBy,
    attachmentUri: values.attachmentUri,
  };
  addPunishmentToFederationState(punishment);
  return punishment;
}
