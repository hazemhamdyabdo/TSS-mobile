import { useEffect, useState } from 'react';

import {
  getNotificationsState,
  getUnreadNotificationCount,
  subscribeToNotifications,
} from '../store/notificationsState';

export function useNotificationsState() {
  const [state, setState] = useState(getNotificationsState());
  const [unreadCount, setUnreadCount] = useState(getUnreadNotificationCount());

  useEffect(() => {
    return subscribeToNotifications(() => {
      setState(getNotificationsState());
      setUnreadCount(getUnreadNotificationCount());
    });
  }, []);

  return { items: state.items, unreadCount };
}
