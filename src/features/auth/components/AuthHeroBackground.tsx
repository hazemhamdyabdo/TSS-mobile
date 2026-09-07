import { Image } from 'expo-image';
import type { ReactNode } from 'react';
import { KeyboardAvoidingView, Platform, View } from 'react-native';

const welcomeBackground = require('@/assets/images/welcome-background.jpg');

type AuthHeroBackgroundProps = {
  children: ReactNode;
};

export default function AuthHeroBackground({ children }: AuthHeroBackgroundProps) {
  return (
    <View className="flex-1 bg-black">
      <Image
        source={welcomeBackground}
        contentFit="cover"
        style={{ position: 'absolute', top: 0, right: 0, bottom: 0, left: 0 }}
      />
      <View className="absolute inset-0 bg-black/25" />
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        className="flex-1 justify-end"
        style={{ flex: 1 }}
      >
        {children}
      </KeyboardAvoidingView>
    </View>
  );
}
