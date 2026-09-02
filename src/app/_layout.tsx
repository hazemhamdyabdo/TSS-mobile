import "../../global.css";

import {
  Cairo_400Regular,
  Cairo_500Medium,
  Cairo_600SemiBold,
  Cairo_700Bold,
  useFonts,
} from "@expo-google-fonts/cairo";
import { BottomSheetModalProvider } from "@gorhom/bottom-sheet";
import { DarkTheme, DefaultTheme, Stack, ThemeProvider } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import type { ReactNode } from "react";
import { useEffect, useState } from "react";
import { useColorScheme, View } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { SafeAreaProvider } from "react-native-safe-area-context";

import { hydrateAuthState } from "@/features/auth/api";
import SplashView from "@/features/auth/components/SplashScreen";
import { RTL_CONTAINER_STYLE } from "@/localization/direction";
import { initializeI18n } from "@/localization/i18n";

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

  const isReady = fontsReady && appReady;

  useEffect(() => {
    if (isReady) {
      SplashScreen.hideAsync();
    }
  }, [isReady]);

  // Always mount <Stack> on the first frame. Returning splash instead of the
  // navigator lets expo-router's Android getInitialURL Promise call setState on
  // NavigationContainer before it has committed (LogBox: "component that hasn't
  // mounted yet"). Keep the native splash up and overlay a JS splash until boot.
  return (
    <RtlAppShell>
      <SafeAreaProvider>
        <BottomSheetModalProvider>
          <ThemeProvider
            value={colorScheme === "dark" ? DarkTheme : DefaultTheme}
          >
            <Stack screenOptions={{ headerShown: false, animation: "fade" }}>
              <Stack.Screen name="index" />
              <Stack.Screen name="(auth)" />
              <Stack.Screen name="(tabs)" />
              <Stack.Screen name="fast-management" />
              <Stack.Screen name="add-player" />
              <Stack.Screen name="add-coach" />
              <Stack.Screen name="add-referee" />
              <Stack.Screen name="add-competition" />
              <Stack.Screen name="add-club" />
              <Stack.Screen name="add-administrator" />
              <Stack.Screen name="add-punishment" />
              <Stack.Screen name="competition/[id]" />
              <Stack.Screen name="member/[id]" />
              <Stack.Screen name="settings" />
              <Stack.Screen name="profile" />
              <Stack.Screen name="language" />
              <Stack.Screen name="notifications" />
              <Stack.Screen name="privacy" />
              <Stack.Screen name="help" />
              <Stack.Screen name="clubs" />
              <Stack.Screen name="rankings" />
              <Stack.Screen name="results" />
              <Stack.Screen name="punishments" />
              <Stack.Screen name="transfers" />
            </Stack>
          </ThemeProvider>
        </BottomSheetModalProvider>
      </SafeAreaProvider>
      {isReady ? null : (
        <View style={{ position: "absolute", top: 0, right: 0, bottom: 0, left: 0 }}>
          <SplashView />
        </View>
      )}
    </RtlAppShell>
  );
}

function RtlAppShell({ children }: { children: ReactNode }) {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <View style={[{ flex: 1 }, RTL_CONTAINER_STYLE]}>{children}</View>
    </GestureHandlerRootView>
  );
}
