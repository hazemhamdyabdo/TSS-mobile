import { DUMMY_COMPETITIONS_STATE } from '../constants/dummy';
import type { Competition, CompetitionsState } from '../types';

let competitionsState: CompetitionsState = cloneState(DUMMY_COMPETITIONS_STATE);
const listeners = new Set<() => void>();

function cloneState(state: CompetitionsState): CompetitionsState {
  return {
    items: [...state.items],
    participants: [...state.participants],
    results: [...state.results],
    matchDetails: [...state.matchDetails],
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

export function getMatchResultFromState(id: string) {
  return competitionsState.results.find((item) => item.id === id);
}

export function getMatchDetailsFromState(matchId: string) {
  return competitionsState.matchDetails.find((item) => item.matchId === matchId);
}

export function subscribeToCompetitions(listener: () => void) {
  listeners.add(listener);
  return () => {
    listeners.delete(listener);
  };
}

export function addCompetitionToState(competition: Competition) {
  competitionsState = {
    ...competitionsState,
    items: [competition, ...competitionsState.items],
  };
  notifyListeners();
}

export function updateCompetitionInState(id: string, next: Competition) {
  const exists = competitionsState.items.some((item) => item.id === id);
  if (!exists) {
    return false;
  }

  competitionsState = {
    ...competitionsState,
    items: competitionsState.items.map((item) => (item.id === id ? next : item)),
  };
  notifyListeners();
  return true;
}

export function deleteCompetitionFromState(id: string) {
  const removedMatchIds = new Set(
    competitionsState.results
      .filter((item) => item.competitionId === id)
      .map((item) => item.id),
  );

  competitionsState = {
    ...competitionsState,
    items: competitionsState.items.filter((item) => item.id !== id),
    participants: competitionsState.participants.filter(
      (item) => item.competitionId !== id,
    ),
    results: competitionsState.results.filter((item) => item.competitionId !== id),
    matchDetails: competitionsState.matchDetails.filter(
      (item) => !removedMatchIds.has(item.matchId),
    ),
  };
  notifyListeners();
}

export function resetCompetitionsState() {
  competitionsState = cloneState(DUMMY_COMPETITIONS_STATE);
  notifyListeners();
}
