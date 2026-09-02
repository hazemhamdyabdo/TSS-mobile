import { resetAuthState } from '@/features/auth/store/authState';
import { resetHomeState } from '@/features/home/store/homeState';

import { resetMockIdCounter } from './mockApi';

export function resetMockStores() {
  resetAuthState();
  resetHomeState();
  resetMockIdCounter();
}
