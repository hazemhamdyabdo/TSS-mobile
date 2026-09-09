import type { MoreState, UserProfile } from '../types';

export const DUMMY_PROFILE: UserProfile = {
  name: 'عبدالله فيصل',
  email: 'Faisal@fencing_sa',
  phone: '123456789',
  roleKey: 'home.role.federationOfficial',
};

/** Authenticated player (user phone 507654321). */
export const DUMMY_USER_PROFILE: UserProfile = {
  name: 'احمد الخالدي',
  email: 'Ahmed@fencing_sa',
  phone: '507654321',
  roleKey: 'home.role.player',
  playerDetails: {
    club: 'نادي الاتحاد',
    birthDate: '14-06-2007',
    weapon: 'سيف مبارزة',
    gender: 'ذكر',
    ageCategory: 'تحت 21 عام',
    rating: '1500',
    nationality: 'سعودي',
    nationalTeam: 'مستدعي',
    contractStart: '29-06-2026',
    contractEnd: '29-06-2027',
  },
};

/** Guest display profile (settings card hidden; used on guest home/avatar). */
export const DUMMY_GUEST_PROFILE: UserProfile = {
  ...DUMMY_USER_PROFILE,
  phone: '123456789',
};

export const EMPTY_MORE_STATE: MoreState = {
  profile: { ...DUMMY_PROFILE },
  notifications: {
    enabled: true,
    transferRequests: false,
    featureUpdates: true,
  },
  darkMode: false,
};
