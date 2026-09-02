import { DUMMY_COMPETITIONS_STATE } from '../constants/dummy';
import type { CompetitionsState } from '../types';

let competitionsState: CompetitionsState = cloneState(DUMMY_COMPETITIONS_STATE);
const listeners = new Set<() => void>();

function cloneState(state: CompetitionsState): CompetitionsState {
  return {
    items: [...state.items],
    participants: [...state.participants],
    results: [...state.results],
    monthlyParticipantCount: state.monthlyParticipantCount,
  };
}

function notifyListeners() {
  listeners.forEach((listener) => listener());
}

export function getCompetitionsState() {
  return competitionsState;
}

export function getCompetitionFromState(id: string) {
  return competitionsState.items.find((item) => item.id === id);
}

export function subscribeToCompetitions(listener: () => void) {
  listeners.add(listener);
  return () => {
    listeners.delete(listener);
  };
}

export function deleteCompetitionFromState(id: string) {
  competitionsState = {
    ...competitionsState,
    items: competitionsState.items.filter((item) => item.id !== id),
    participants: competitionsState.participants.filter((item) => item.competitionId !== id),
    results: competitionsState.results.filter((item) => item.competitionId !== id),
  };
  notifyListeners();
}

export function resetCompetitionsState() {
  competitionsState = cloneState(DUMMY_COMPETITIONS_STATE);
  notifyListeners();
}
