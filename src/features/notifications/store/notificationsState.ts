import { DUMMY_NOTIFICATIONS_STATE } from '../constants/dummy';
import type { NotificationsState } from '../types';

let notificationsState: NotificationsState = cloneState(DUMMY_NOTIFICATIONS_STATE);
const listeners = new Set<() => void>();

function cloneState(state: NotificationsState): NotificationsState {
  return {
    items: state.items.map((item) => ({ ...item })),
  };
}

function notifyListeners() {
  listeners.forEach((listener) => listener());
}

export function getNotificationsState() {
  return notificationsState;
}

export function getUnreadNotificationCount() {
  return notificationsState.items.filter((item) => !item.read).length;
}

export function subscribeToNotifications(listener: () => void) {
  listeners.add(listener);
  return () => {
    listeners.delete(listener);
  };
}

export function markNotificationReadInState(id: string) {
  notificationsState = {
    items: notificationsState.items.map((item) =>
      item.id === id ? { ...item, read: true } : item,
    ),
  };
  notifyListeners();
}

export function markAllNotificationsReadInState() {
  notificationsState = {
    items: notificationsState.items.map((item) => ({ ...item, read: true })),
  };
  notifyListeners();
}

export function resetNotificationsState() {
  notificationsState = cloneState(DUMMY_NOTIFICATIONS_STATE);
  notifyListeners();
}
