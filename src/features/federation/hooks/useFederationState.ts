import { useEffect, useState } from 'react';

import { getFederationState, subscribeToFederation } from '../store/federationState';

export function useFederationState() {
  const [state, setState] = useState(getFederationState());

  useEffect(() => {
    return subscribeToFederation(() => setState(getFederationState()));
  }, []);

  return state;
}
