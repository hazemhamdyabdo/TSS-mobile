import { mockDelay, MockApiError } from '@/utils/mockApi';

import { getMemberFromState, getMembersState } from './store/membersState';
import type { Member, MembersState } from './types';

export async function getMembers(): Promise<MembersState> {
  await mockDelay();
  return getMembersState();
}

export async function getMemberById(id: string): Promise<Member> {
  await mockDelay();
  const member = getMemberFromState(id);
  if (!member) {
    throw new MockApiError('members.notFound', 404);
  }

  return member;
}
