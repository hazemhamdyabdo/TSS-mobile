import { useEffect, useReducer } from 'react';

import { useAuthState } from '@/features/auth/hooks/useAuthState';
import { getAuthRole } from '@/features/auth/utils/sessionRole';
import { getNotificationsState, subscribeToNotifications } from '../store/notificationsState';

export function useNotificationsState() {
  const { session } = useAuthState();
  const [, refresh] = useReducer((revision: number) => revision + 1, 0);

  useEffect(() => subscribeToNotifications(refresh), []);

  const { items } = getNotificationsState(getAuthRole(session));
  return { items, unreadCount: items.filter((item) => !item.read).length };
}
