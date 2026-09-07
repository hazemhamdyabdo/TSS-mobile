import type { MoreState, UserProfile } from '../types';

export const DUMMY_PROFILE: UserProfile = {
  name: 'عبدالله فيصل',
  email: 'Faisal@fencing_sa',
  phone: '123456789',
  roleKey: 'home.role.federationOfficial',
};

export const DUMMY_GUEST_PROFILE: UserProfile = {
  name: 'احمد الخالدي',
  email: 'Ahmed@fencing_sa',
  phone: '123456789',
  roleKey: 'home.role.player',
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
