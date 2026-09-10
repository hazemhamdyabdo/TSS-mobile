import type { MoreHubAction, MoreHubHref, MoreHubId } from '../types';

export const MORE_HUB_ROUTES: Record<MoreHubId, MoreHubHref> = {
  clubs: '/clubs',
  rankings: '/(tabs)/rankings',
  results: '/results',
  punishments: '/(tabs)/punishments',
  transfers: '/transfers',
  settings: '/settings',
  policies: '/policies',
  laws: '/laws',
  regulations: '/regulations',
  contact: '/help',
};

const FEDERATION_MORE_HUB_ACTIONS: MoreHubAction[] = [
  {
    id: 'policies',
    titleKey: 'more.hub.items.policies.title',
    subtitleKey: 'more.hub.items.policies.subtitle',
    href: MORE_HUB_ROUTES.policies,
  },
  {
    id: 'laws',
    titleKey: 'more.hub.items.laws.title',
    subtitleKey: 'more.hub.items.laws.subtitle',
    href: MORE_HUB_ROUTES.laws,
  },
  {
    id: 'regulations',
    titleKey: 'more.hub.items.regulations.title',
    subtitleKey: 'more.hub.items.regulations.subtitle',
    href: MORE_HUB_ROUTES.regulations,
  },
];

export const MORE_HUB_ACTIONS: MoreHubAction[] = [
  {
    id: 'clubs',
    titleKey: 'more.hub.items.clubs.title',
    subtitleKey: 'more.hub.items.clubs.subtitle',
    href: MORE_HUB_ROUTES.clubs,
  },
  {
    id: 'rankings',
    titleKey: 'more.hub.items.rankings.title',
    subtitleKey: 'more.hub.items.rankings.subtitle',
    href: MORE_HUB_ROUTES.rankings,
  },
  {
    id: 'results',
    titleKey: 'more.hub.items.results.title',
    subtitleKey: 'more.hub.items.results.subtitle',
    href: MORE_HUB_ROUTES.results,
  },
  {
    id: 'punishments',
    titleKey: 'more.hub.items.punishments.title',
    subtitleKey: 'more.hub.items.punishments.subtitle',
    href: MORE_HUB_ROUTES.punishments,
  },
  {
    id: 'transfers',
    titleKey: 'more.hub.items.transfers.title',
    subtitleKey: 'more.hub.items.transfers.subtitle',
    href: MORE_HUB_ROUTES.transfers,
  },
  ...FEDERATION_MORE_HUB_ACTIONS,
  {
    id: 'settings',
    titleKey: 'more.hub.items.settings.title',
    subtitleKey: 'more.hub.items.settings.subtitle',
    href: MORE_HUB_ROUTES.settings,
  },
];

export const GUEST_MORE_HUB_ACTIONS: MoreHubAction[] = [
  ...FEDERATION_MORE_HUB_ACTIONS,
  {
    id: 'contact',
    titleKey: 'more.hub.items.contact.title',
    subtitleKey: 'more.hub.items.contact.subtitle',
    href: MORE_HUB_ROUTES.contact,
  },
  {
    id: 'settings',
    titleKey: 'more.hub.items.settings.title',
    subtitleKey: 'more.hub.items.settings.subtitle',
    href: MORE_HUB_ROUTES.settings,
  },
];

/** Authenticated player hub (no federation admin management). */
export const USER_MORE_HUB_ACTIONS: MoreHubAction[] = [
  {
    id: 'rankings',
    titleKey: 'more.hub.items.rankings.title',
    subtitleKey: 'more.hub.items.rankings.subtitle',
    href: MORE_HUB_ROUTES.rankings,
  },
  {
    id: 'results',
    titleKey: 'more.hub.items.results.title',
    subtitleKey: 'more.hub.items.results.subtitle',
    href: MORE_HUB_ROUTES.results,
  },
  {
    id: 'punishments',
    titleKey: 'more.hub.items.punishments.title',
    subtitleKey: 'more.hub.items.punishments.subtitle',
    href: MORE_HUB_ROUTES.punishments,
  },
  ...FEDERATION_MORE_HUB_ACTIONS,
  {
    id: 'contact',
    titleKey: 'more.hub.items.contact.title',
    subtitleKey: 'more.hub.items.contact.subtitle',
    href: MORE_HUB_ROUTES.contact,
  },
  {
    id: 'settings',
    titleKey: 'more.hub.items.settings.title',
    subtitleKey: 'more.hub.items.settings.subtitle',
    href: MORE_HUB_ROUTES.settings,
  },
];
