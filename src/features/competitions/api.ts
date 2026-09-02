import { mockDelay } from '@/utils/mockApi';

import {
  deleteCompetitionFromState,
  getCompetitionFromState,
  getCompetitionsState,
} from './store/competitionsState';
import type { Competition, CompetitionsState } from './types';

export async function getCompetitions(): Promise<CompetitionsState> {
  await mockDelay();
  return getCompetitionsState();
}

export async function getCompetitionById(id: string): Promise<Competition | undefined> {
  await mockDelay();
  return getCompetitionFromState(id);
}

export async function deleteCompetition(id: string) {
  await mockDelay();
  deleteCompetitionFromState(id);
}
