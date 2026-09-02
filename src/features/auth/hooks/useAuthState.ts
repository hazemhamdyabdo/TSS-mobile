import { useEffect, useState } from 'react';

import {
  getAuthState,
  isAuthHydrated,
  subscribeToAuth,
} from '../store/authState';

export function useAuthState() {
  const [session, setSession] = useState(getAuthState());
  const [isHydrated, setIsHydrated] = useState(isAuthHydrated());

  useEffect(() => {
    return subscribeToAuth(() => {
      setSession(getAuthState());
      setIsHydrated(isAuthHydrated());
    });
  }, []);

  return { session, isHydrated };
}
