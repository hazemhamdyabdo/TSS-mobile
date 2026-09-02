import { Stack } from 'expo-router';

export default function AuthLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="splash" options={{ animation: 'fade' }} />
      <Stack.Screen name="onboarding" options={{ animation: 'fade' }} />
      <Stack.Screen name="login" options={{ animation: 'slide_from_bottom' }} />
      <Stack.Screen name="otp" options={{ animation: 'slide_from_bottom' }} />
      <Stack.Screen name="contact" options={{ animation: 'slide_from_bottom' }} />
    </Stack>
  );
}
