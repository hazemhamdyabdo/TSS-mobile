import { DUMMY_HOME } from '../constants/dummy';
import type { HomeDashboard } from '../types';

let homeState: HomeDashboard = { ...DUMMY_HOME };
const listeners = new Set<() => void>();

function notifyListeners() {
  listeners.forEach((listener) => listener());
}

export function getHomeState() {
  return homeState;
}

export function subscribeToHome(listener: () => void) {
  listeners.add(listener);
  return () => {
    listeners.delete(listener);
  };
}

export function resetHomeState() {
  homeState = { ...DUMMY_HOME };
  notifyListeners();
}
