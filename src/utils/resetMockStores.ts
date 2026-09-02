import { resetAuthState } from '@/features/auth/store/authState';

import { resetMockIdCounter } from './mockApi';

export function resetMockStores() {
  resetAuthState();
  resetMockIdCounter();
}
