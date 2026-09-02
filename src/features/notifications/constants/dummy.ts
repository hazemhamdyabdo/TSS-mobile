import type { NotificationsState } from '../types';

export const DUMMY_NOTIFICATIONS_STATE: NotificationsState = {
  items: [
    {
      id: 'notif-1',
      titleKey: 'inbox.items.transfer.title',
      bodyKey: 'inbox.items.transfer.body',
      createdAt: '2026-08-25T08:14:00.000Z',
      read: false,
      href: '/transfers',
    },
    {
      id: 'notif-2',
      titleKey: 'inbox.items.competition.title',
      bodyKey: 'inbox.items.competition.body',
      createdAt: '2026-08-25T07:00:00.000Z',
      read: false,
      href: '/(tabs)/competitions',
    },
    {
      id: 'notif-3',
      titleKey: 'inbox.items.member.title',
      bodyKey: 'inbox.items.member.body',
      createdAt: '2026-08-24T18:30:00.000Z',
      read: false,
      href: '/(tabs)/members',
    },
  ],
};
