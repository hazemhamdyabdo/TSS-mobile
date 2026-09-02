import { useEffect, useState } from 'react';

import { getCreateState, subscribeToCreate } from '../store/createState';

export function useCreateState() {
  const [state, setState] = useState(getCreateState());

  useEffect(() => {
    return subscribeToCreate(() => setState(getCreateState()));
  }, []);

  return state;
}
