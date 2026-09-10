import { mockDelay, MockApiError } from '@/utils/mockApi';
import { getAuthState } from '@/features/auth/store/authState';
import { getAuthRole } from '@/features/auth/utils/sessionRole';

import {
  getNotificationsState,
  markAllNotificationsReadInState,
  markNotificationReadInState,
} from './store/notificationsState';

export async function getNotifications() {
  await mockDelay();
  return getNotificationsState(getAuthRole(getAuthState()));
}

export async function markNotificationRead(id: string) {
  const role = getAuthRole(getAuthState());
  await mockDelay(80, 160);
  const exists = getNotificationsState(role).items.some((item) => item.id === id);
  if (!exists) {
    throw new MockApiError('inbox.notFound', 404);
  }

  markNotificationReadInState(id, role);
}

export async function markAllNotificationsRead() {
  const role = getAuthRole(getAuthState());
  await mockDelay(80, 160);
  markAllNotificationsReadInState(role);
}
