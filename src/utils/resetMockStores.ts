import { resetAuthState } from '@/features/auth/store/authState';
import { resetCreateState } from '@/features/create/store/createState';
import { resetHomeState } from '@/features/home/store/homeState';

import { resetMockIdCounter } from './mockApi';

export function resetMockStores() {
  resetAuthState();
  resetHomeState();
  resetCreateState();
  resetMockIdCounter();
}
