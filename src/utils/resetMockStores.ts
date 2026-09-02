import { resetAuthState } from '@/features/auth/store/authState';
import { resetCompetitionsState } from '@/features/competitions/store/competitionsState';
import { resetCreateState } from '@/features/create/store/createState';
import { resetHomeState } from '@/features/home/store/homeState';
import { resetMembersState } from '@/features/members/store/membersState';
import { resetMoreState } from '@/features/more/store/moreState';

import { resetMockIdCounter } from './mockApi';

export function resetMockStores() {
  resetAuthState();
  resetHomeState();
  resetCreateState();
  resetCompetitionsState();
  resetMembersState();
  resetMoreState();
  resetMockIdCounter();
}
