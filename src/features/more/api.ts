import { MOCK_FAIL_PROFILE_EMAIL } from '@/features/auth/constants/dummy';
import { mockDelay, MockApiError } from '@/utils/mockApi';

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
  if (profile.email.trim().toLowerCase() === MOCK_FAIL_PROFILE_EMAIL) {
    throw new MockApiError('more.profile.saveFailed', 400);
  }

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
