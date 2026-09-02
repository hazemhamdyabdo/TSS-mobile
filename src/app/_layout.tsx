import '../../global.css';

import {
  Cairo_400Regular,
  Cairo_500Medium,
  Cairo_600SemiBold,
  Cairo_700Bold,
  useFonts,
} from '@expo-google-fonts/cairo';
import { BottomSheetModalProvider } from '@gorhom/bottom-sheet';
import { DarkTheme, DefaultTheme, ThemeProvider, Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect, useState } from 'react';
import { useColorScheme } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import SplashView from '@/features/auth/components/SplashScreen';
import { hydrateAuthState } from '@/features/auth/api';
import { initializeI18n } from '@/localization/i18n';

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [fontsLoaded, fontError] = useFonts({
    Cairo_400Regular,
    Cairo_500Medium,
    Cairo_600SemiBold,
    Cairo_700Bold,
  });
  const [appReady, setAppReady] = useState(false);

  useEffect(() => {
    let cancelled = false;

    async function boot() {
      await initializeI18n();
      await hydrateAuthState();
      if (!cancelled) {
        setAppReady(true);
      }
    }

    boot();
    return () => {
      cancelled = true;
    };
  }, []);

  const fontsReady = fontsLoaded || Boolean(fontError);

  useEffect(() => {
    if (fontsReady && appReady) {
      SplashScreen.hideAsync();
    }
  }, [fontsReady, appReady]);

  if (!fontsReady || !appReady) {
    return <SplashView />;
  }

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaProvider>
        <BottomSheetModalProvider>
          <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
            <Stack screenOptions={{ headerShown: false, animation: 'fade' }}>
              <Stack.Screen name="index" />
              <Stack.Screen name="(auth)" />
              <Stack.Screen name="(tabs)" />
            </Stack>
          </ThemeProvider>
        </BottomSheetModalProvider>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
}
