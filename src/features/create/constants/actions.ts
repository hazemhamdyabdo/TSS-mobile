import type { CreateActionId, CreateRouteHref, FastManagementAction } from '../types';

export const CREATE_ROUTES: Record<CreateActionId, CreateRouteHref> = {
  addPlayer: '/add-player',
  addCoach: '/add-coach',
  addReferee: '/add-referee',
  addCompetition: '/add-competition',
  addClub: '/add-club',
  addAdministrator: '/add-administrator',
  addPunishment: '/add-punishment',
};

export const FAST_MANAGEMENT_ACTIONS: FastManagementAction[] = [
  {
    id: 'addPlayer',
    titleKey: 'create.hub.items.addPlayer.title',
    subtitleKey: 'create.hub.items.addPlayer.subtitle',
    href: CREATE_ROUTES.addPlayer,
  },
  {
    id: 'addCoach',
    titleKey: 'create.hub.items.addCoach.title',
    subtitleKey: 'create.hub.items.addCoach.subtitle',
    href: CREATE_ROUTES.addCoach,
  },
  {
    id: 'addReferee',
    titleKey: 'create.hub.items.addReferee.title',
    subtitleKey: 'create.hub.items.addReferee.subtitle',
    href: CREATE_ROUTES.addReferee,
  },
  {
    id: 'addCompetition',
    titleKey: 'create.hub.items.addCompetition.title',
    subtitleKey: 'create.hub.items.addCompetition.subtitle',
    href: CREATE_ROUTES.addCompetition,
  },
  {
    id: 'addClub',
    titleKey: 'create.hub.items.addClub.title',
    subtitleKey: 'create.hub.items.addClub.subtitle',
    href: CREATE_ROUTES.addClub,
  },
  {
    id: 'addAdministrator',
    titleKey: 'create.hub.items.addAdministrator.title',
    subtitleKey: 'create.hub.items.addAdministrator.subtitle',
    href: CREATE_ROUTES.addAdministrator,
  },
  {
    id: 'addPunishment',
    titleKey: 'create.hub.items.addPunishment.title',
    subtitleKey: 'create.hub.items.addPunishment.subtitle',
    href: CREATE_ROUTES.addPunishment,
  },
];
