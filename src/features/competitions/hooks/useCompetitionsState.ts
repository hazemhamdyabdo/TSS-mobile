import { useEffect, useState } from 'react';

import { getCompetitionsState, subscribeToCompetitions } from '../store/competitionsState';

export function useCompetitionsState() {
  const [state, setState] = useState(getCompetitionsState());

  useEffect(() => {
    return subscribeToCompetitions(() => setState(getCompetitionsState()));
  }, []);

  return state;
}
