import { DUMMY_FEDERATION_STATE } from '../constants/dummy';
import type { FederationClub, FederationPunishment, FederationState } from '../types';

let federationState: FederationState = cloneState(DUMMY_FEDERATION_STATE);
const listeners = new Set<() => void>();

function cloneState(state: FederationState): FederationState {
  return {
    clubs: [...state.clubs],
    punishments: [...state.punishments],
    rankings: [...state.rankings],
    results: [...state.results],
    transfers: [...state.transfers],
  };
}

function notifyListeners() {
  listeners.forEach((listener) => listener());
}

export function getFederationState() {
  return federationState;
}

export function subscribeToFederation(listener: () => void) {
  listeners.add(listener);
  return () => {
    listeners.delete(listener);
  };
}

export function addClubToFederationState(club: FederationClub) {
  federationState = {
    ...federationState,
    clubs: [club, ...federationState.clubs],
  };
  notifyListeners();
}

export function addPunishmentToFederationState(punishment: FederationPunishment) {
  federationState = {
    ...federationState,
    punishments: [punishment, ...federationState.punishments],
  };
  notifyListeners();
}

export function resetFederationState() {
  federationState = cloneState(DUMMY_FEDERATION_STATE);
  notifyListeners();
}
