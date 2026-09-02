import { Image } from 'expo-image';
import { useRouter } from 'expo-router';
import { Pressable, Text, View } from 'react-native';
import { useTranslation } from 'react-i18next';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import AuthHeroBackground from './AuthHeroBackground';
import { RTL_TEXT_STYLE } from '@/localization/direction';
import { cairo } from '@/theme/typography';

const startArrow = require('@/assets/images/auth/start-arrow.png');

export default function OnboardingScreen() {
  const { t } = useTranslation();
  const router = useRouter();
  const insets = useSafeAreaInsets();
  return (
    <AuthHeroBackground>
      <View
        className="flex-1 justify-end px-5"
        style={{
          paddingBottom: Math.max(insets.bottom, 32),
          paddingTop: insets.top,
        }}>
        <View className="w-[266px] items-start gap-6 self-start">
          <View className="w-full items-start gap-3">
            <Text
              className="w-full text-[60px] leading-[72px] text-slate-50"
              style={{ fontFamily: cairo.bold, ...RTL_TEXT_STYLE }}>
              {`${t('auth.onboardingTitleLine1')}\n${t('auth.onboardingTitleLine2')}`}
            </Text>
            <Text
              className="w-full text-[26px] leading-[26px] text-slate-200"
              style={{ fontFamily: cairo.medium, ...RTL_TEXT_STYLE }}>
              {t('auth.onboardingSubtitle')}
            </Text>
          </View>

          <Pressable
            accessibilityRole="button"
            onPress={() => router.push('/(auth)/login')}
            className="h-11 w-[116px] flex-row items-center justify-center gap-2 rounded-full bg-primary px-4"
            style={{ direction: 'ltr' }}>
            <View className="size-5 overflow-hidden">
              <Image source={startArrow} style={{ width: 20, height: 20 }} contentFit="contain" />
            </View>
            <Text className="text-base text-white" style={{ fontFamily: cairo.medium }}>
              {t('auth.start')}
            </Text>
          </Pressable>
        </View>
      </View>
    </AuthHeroBackground>
  );
}
