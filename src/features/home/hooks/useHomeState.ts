import { useEffect, useState } from 'react';

import { getHomeState, subscribeToHome } from '../store/homeState';

export function useHomeState() {
  const [home, setHome] = useState(getHomeState());

  useEffect(() => {
    return subscribeToHome(() => setHome(getHomeState()));
  }, []);

  return home;
}
