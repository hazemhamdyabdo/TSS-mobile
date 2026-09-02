import { EMPTY_MORE_STATE } from '../constants/dummy';
import type { MoreState, NotificationPrefs, UserProfile } from '../types';

let moreState: MoreState = {
  profile: { ...EMPTY_MORE_STATE.profile },
  notifications: { ...EMPTY_MORE_STATE.notifications },
  darkMode: EMPTY_MORE_STATE.darkMode,
};

const listeners = new Set<() => void>();

function notifyListeners() {
  listeners.forEach((listener) => listener());
}

export function getMoreState() {
  return moreState;
}

export function subscribeToMore(listener: () => void) {
  listeners.add(listener);
  return () => {
    listeners.delete(listener);
  };
}

export function updateProfileInState(profile: UserProfile) {
  moreState = { ...moreState, profile };
  notifyListeners();
}

export function updateNotificationPrefsInState(notifications: NotificationPrefs) {
  moreState = { ...moreState, notifications };
  notifyListeners();
}

export function setDarkModeInState(darkMode: boolean) {
  moreState = { ...moreState, darkMode };
  notifyListeners();
}

export function resetMoreState() {
  moreState = {
    profile: { ...EMPTY_MORE_STATE.profile },
    notifications: { ...EMPTY_MORE_STATE.notifications },
    darkMode: EMPTY_MORE_STATE.darkMode,
  };
  notifyListeners();
}
