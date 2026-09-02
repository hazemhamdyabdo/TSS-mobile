import { useEffect, useState } from 'react';

import { getMoreState, subscribeToMore } from '../store/moreState';

export function useMoreState() {
  const [state, setState] = useState(getMoreState());

  useEffect(() => {
    return subscribeToMore(() => setState(getMoreState()));
  }, []);

  return state;
}
