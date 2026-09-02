import type { AddCompetitionFormValues } from '@/features/create/schemas/addCompetitionSchema';
import { createMockId, isFailTrigger, mockDelay, MockApiError } from '@/utils/mockApi';

import {
  addCompetitionToState,
  deleteCompetitionFromState,
  getCompetitionFromState,
  getCompetitionsState,
  updateCompetitionInState,
} from './store/competitionsState';
import type { Competition, CompetitionsState } from './types';
import { competitionFromValues } from './utils/fromCreate';

export async function getCompetitions(): Promise<CompetitionsState> {
  await mockDelay();
  return getCompetitionsState();
}

export async function getCompetitionById(id: string): Promise<Competition> {
  await mockDelay();
  const competition = getCompetitionFromState(id);
  if (!competition) {
    throw new MockApiError('competitions.notFound', 404);
  }

  return competition;
}

export async function createCompetitionRecord(values: AddCompetitionFormValues): Promise<Competition> {
  await mockDelay();
  if (isFailTrigger(values.eventName)) {
    throw new MockApiError('create.errors.failed', 400);
  }

  const competition = competitionFromValues(createMockId('competition'), values);
  addCompetitionToState(competition);
  return competition;
}

export async function updateCompetitionRecord(
  id: string,
  values: AddCompetitionFormValues,
): Promise<Competition> {
  await mockDelay();
  if (isFailTrigger(values.eventName)) {
    throw new MockApiError('create.errors.failed', 400);
  }

  const existing = getCompetitionFromState(id);
  if (!existing) {
    throw new MockApiError('competitions.notFound', 404);
  }

  const next = { ...competitionFromValues(id, values), id };
  updateCompetitionInState(id, next);
  return next;
}

export async function deleteCompetition(id: string) {
  await mockDelay();
  const existing = getCompetitionFromState(id);
  if (!existing) {
    throw new MockApiError('competitions.notFound', 404);
  }

  deleteCompetitionFromState(id);
}
