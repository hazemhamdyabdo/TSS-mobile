import { useEffect, useState } from 'react';

import { getMembersState, subscribeToMembers } from '../store/membersState';

export function useMembersState() {
  const [state, setState] = useState(getMembersState());

  useEffect(() => {
    return subscribeToMembers(() => setState(getMembersState()));
  }, []);

  return state;
}
