import type { AuthSession } from '../types';

let sessionState: AuthSession | null = null;
let isHydratedState = false;
const listeners = new Set<() => void>();

function notifyListeners() {
  listeners.forEach((listener) => listener());
}

export function getAuthState() {
  return sessionState;
}

export function isAuthHydrated() {
  return isHydratedState;
}

export function setAuthSessionInState(session: AuthSession | null) {
  sessionState = session;
  notifyListeners();
}

export function markAuthHydrated() {
  isHydratedState = true;
  notifyListeners();
}

export function subscribeToAuth(listener: () => void) {
  listeners.add(listener);
  return () => {
    listeners.delete(listener);
  };
}

export function resetAuthState() {
  sessionState = null;
  notifyListeners();
}
