import type { GuestPunishment } from '../types';

export const DUMMY_GUEST_PUNISHMENTS: GuestPunishment[] = [
  {
    id: 'gp-1',
    kind: 'warning',
    titleKey: 'punishments.items.lateArrival.title',
    reasonKey: 'punishments.items.lateArrival.reason',
    relativeKey: 'punishments.relative.minutesAgo',
    relativeCount: 14,
  },
  {
    id: 'gp-2',
    kind: 'warning',
    titleKey: 'punishments.items.lateArrival.title',
    reasonKey: 'punishments.items.lateArrival.reason',
    relativeKey: 'punishments.relative.minutesAgo',
    relativeCount: 14,
  },
  {
    id: 'gp-3',
    kind: 'suspension',
    titleKey: 'punishments.items.fairPlay.title',
    reasonKey: 'punishments.items.fairPlay.reason',
    relativeKey: 'punishments.relative.hourAgo',
    relativeCount: 1,
  },
  {
    id: 'gp-4',
    kind: 'warning',
    titleKey: 'punishments.items.lateArrival.title',
    reasonKey: 'punishments.items.lateArrival.reason',
    relativeKey: 'punishments.relative.minutesAgo',
    relativeCount: 14,
  },
  {
    id: 'gp-5',
    kind: 'suspension',
    titleKey: 'punishments.items.fairPlay.title',
    reasonKey: 'punishments.items.fairPlay.reason',
    relativeKey: 'punishments.relative.hourAgo',
    relativeCount: 1,
  },
  {
    id: 'gp-6',
    kind: 'suspension',
    titleKey: 'punishments.items.fairPlay.title',
    reasonKey: 'punishments.items.fairPlay.reason',
    relativeKey: 'punishments.relative.hourAgo',
    relativeCount: 1,
  },
];
