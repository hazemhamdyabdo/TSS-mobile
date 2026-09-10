import type { AuthRole } from '@/features/auth/types';
import { DUMMY_NOTIFICATIONS_STATE } from '../constants/dummy';
import type { NotificationsState } from '../types';

let notificationsState: NotificationsState = cloneState(DUMMY_NOTIFICATIONS_STATE);
const listeners = new Set<() => void>();

function cloneState(state: NotificationsState): NotificationsState {
  return { items: state.items.map((item) => ({ ...item })) };
}

function notifyListeners() {
  listeners.forEach((listener) => listener());
}

export function getNotificationsState(role: AuthRole | null): NotificationsState {
  return { items: notificationsState.items.filter((item) => item.audience === role) };
}

export function getUnreadNotificationCount(role: AuthRole | null) {
  return getNotificationsState(role).items.filter((item) => !item.read).length;
}

export function subscribeToNotifications(listener: () => void) {
  listeners.add(listener);
  return () => { listeners.delete(listener); };
}

export function markNotificationReadInState(id: string, role: AuthRole | null) {
  notificationsState = {
    items: notificationsState.items.map((item) =>
      item.id === id && item.audience === role ? { ...item, read: true } : item,
    ),
  };
  notifyListeners();
}

export function markAllNotificationsReadInState(role: AuthRole | null) {
  notificationsState = {
    items: notificationsState.items.map((item) =>
      item.audience === role ? { ...item, read: true } : item,
    ),
  };
  notifyListeners();
}

export function resetNotificationsState() {
  notificationsState = cloneState(DUMMY_NOTIFICATIONS_STATE);
  notifyListeners();
}
