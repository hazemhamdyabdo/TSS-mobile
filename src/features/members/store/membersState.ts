import { DUMMY_MEMBERS_STATE } from '../constants/dummy';
import type { Member, MembersState } from '../types';

let membersState: MembersState = cloneState(DUMMY_MEMBERS_STATE);
const listeners = new Set<() => void>();

function cloneState(state: MembersState): MembersState {
  return {
    items: [...state.items],
    totalCount: state.totalCount,
    suspendedCount: state.suspendedCount,
  };
}

function notifyListeners() {
  listeners.forEach((listener) => listener());
}

export function getMembersState() {
  return membersState;
}

export function getMemberFromState(id: string) {
  return membersState.items.find((item) => item.id === id);
}

export function subscribeToMembers(listener: () => void) {
  listeners.add(listener);
  return () => {
    listeners.delete(listener);
  };
}

export function addMemberToState(member: Member) {
  const items = [member, ...membersState.items];
  membersState = {
    items,
    totalCount: membersState.totalCount + 1,
    suspendedCount:
      member.status === 'suspended'
        ? membersState.suspendedCount + 1
        : membersState.suspendedCount,
  };
  notifyListeners();
}

export function resetMembersState() {
  membersState = cloneState(DUMMY_MEMBERS_STATE);
  notifyListeners();
}
