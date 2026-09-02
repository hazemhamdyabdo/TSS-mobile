import { mockDelay } from '@/utils/mockApi';

import { getMemberFromState, getMembersState } from './store/membersState';
import type { Member, MembersState } from './types';

export async function getMembers(): Promise<MembersState> {
  await mockDelay();
  return getMembersState();
}

export async function getMemberById(id: string): Promise<Member | undefined> {
  await mockDelay();
  return getMemberFromState(id);
}
