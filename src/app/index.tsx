import { Redirect } from 'expo-router';

import SplashScreen from '@/features/auth/components/SplashScreen';
import { useAuthState } from '@/features/auth/hooks/useAuthState';

export default function IndexRoute() {
  const { session, isHydrated } = useAuthState();

  if (!isHydrated) {
    return <SplashScreen />;
  }

  if (session) {
    return <Redirect href="/(tabs)" />;
  }

  return <Redirect href="/(auth)/splash" />;
}
