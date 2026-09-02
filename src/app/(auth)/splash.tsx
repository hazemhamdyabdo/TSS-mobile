import { useRouter } from 'expo-router';
import { useEffect } from 'react';

import SplashScreen from '@/features/auth/components/SplashScreen';

export default function SplashRoute() {
  const router = useRouter();

  useEffect(() => {
    const timeout = setTimeout(() => {
      router.replace('/(auth)/onboarding');
    }, 1200);

    return () => clearTimeout(timeout);
  }, [router]);

  return <SplashScreen />;
}
