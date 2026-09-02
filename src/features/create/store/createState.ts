import { EMPTY_CREATE_STATE } from '../constants/dummy';
import type {
  CreateState,
  CreatedAdministrator,
  CreatedClub,
  CreatedCoach,
  CreatedCompetition,
  CreatedPlayer,
  CreatedPunishment,
  CreatedReferee,
} from '../types';

let createState: CreateState = {
  players: [...EMPTY_CREATE_STATE.players],
  coaches: [...EMPTY_CREATE_STATE.coaches],
  referees: [...EMPTY_CREATE_STATE.referees],
  competitions: [...EMPTY_CREATE_STATE.competitions],
  clubs: [...EMPTY_CREATE_STATE.clubs],
  administrators: [...EMPTY_CREATE_STATE.administrators],
  punishments: [...EMPTY_CREATE_STATE.punishments],
};

const listeners = new Set<() => void>();

function notifyListeners() {
  listeners.forEach((listener) => listener());
}

export function getCreateState() {
  return createState;
}

export function subscribeToCreate(listener: () => void) {
  listeners.add(listener);
  return () => {
    listeners.delete(listener);
  };
}

export function addPlayerToState(player: CreatedPlayer) {
  createState = { ...createState, players: [player, ...createState.players] };
  notifyListeners();
}

export function addCoachToState(coach: CreatedCoach) {
  createState = { ...createState, coaches: [coach, ...createState.coaches] };
  notifyListeners();
}

export function addRefereeToState(referee: CreatedReferee) {
  createState = { ...createState, referees: [referee, ...createState.referees] };
  notifyListeners();
}

export function addCompetitionToState(competition: CreatedCompetition) {
  createState = { ...createState, competitions: [competition, ...createState.competitions] };
  notifyListeners();
}

export function addClubToState(club: CreatedClub) {
  createState = { ...createState, clubs: [club, ...createState.clubs] };
  notifyListeners();
}

export function addAdministratorToState(administrator: CreatedAdministrator) {
  createState = {
    ...createState,
    administrators: [administrator, ...createState.administrators],
  };
  notifyListeners();
}

export function addPunishmentToState(punishment: CreatedPunishment) {
  createState = { ...createState, punishments: [punishment, ...createState.punishments] };
  notifyListeners();
}

export function resetCreateState() {
  createState = {
    players: [...EMPTY_CREATE_STATE.players],
    coaches: [...EMPTY_CREATE_STATE.coaches],
    referees: [...EMPTY_CREATE_STATE.referees],
    competitions: [...EMPTY_CREATE_STATE.competitions],
    clubs: [...EMPTY_CREATE_STATE.clubs],
    administrators: [...EMPTY_CREATE_STATE.administrators],
    punishments: [...EMPTY_CREATE_STATE.punishments],
  };
  notifyListeners();
}
