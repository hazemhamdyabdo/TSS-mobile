import { mockDelay, MockApiError } from '@/utils/mockApi';

import {
  getNotificationsState,
  markAllNotificationsReadInState,
  markNotificationReadInState,
} from './store/notificationsState';

export async function getNotifications() {
  await mockDelay();
  return getNotificationsState();
}

export async function markNotificationRead(id: string) {
  await mockDelay(80, 160);
  const exists = getNotificationsState().items.some((item) => item.id === id);
  if (!exists) {
    throw new MockApiError('inbox.notFound', 404);
  }

  markNotificationReadInState(id);
}

export async function markAllNotificationsRead() {
  await mockDelay(80, 160);
  markAllNotificationsReadInState();
}
