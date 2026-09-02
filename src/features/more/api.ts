import { mockDelay } from '@/utils/mockApi';

import {
  getMoreState,
  setDarkModeInState,
  updateNotificationPrefsInState,
  updateProfileInState,
} from './store/moreState';
import type { NotificationPrefs, UserProfile } from './types';

export async function getMoreSettings() {
  await mockDelay();
  return getMoreState();
}

export async function updateProfile(profile: UserProfile) {
  await mockDelay();
  updateProfileInState(profile);
  return profile;
}

export async function updateNotificationPrefs(notifications: NotificationPrefs) {
  await mockDelay(80, 160);
  updateNotificationPrefsInState(notifications);
  return notifications;
}

export async function setDarkMode(darkMode: boolean) {
  await mockDelay(80, 160);
  setDarkModeInState(darkMode);
  return darkMode;
}
