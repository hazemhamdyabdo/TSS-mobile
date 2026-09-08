import { Image } from 'expo-image';
import { Pressable, Text, View } from 'react-native';
import { useTranslation } from 'react-i18next';

import { cairo } from '@/theme/typography';

const headerLogo = require('@/assets/images/home/header-logo.png');
const avatarImage = require('@/assets/images/home/avatar.png');
const bellIcon = require('@/assets/images/home/icons/bell.png');

type HomeHeaderProps = {
  name: string;
  roleKey: string;
  avatarUri?: string;
  notificationCount: number;
  onNotificationsPress: () => void;
  onAvatarPress?: () => void;
  welcomeKey?: string;
};

export default function HomeHeader({
  name,
  roleKey,
  avatarUri,
  notificationCount,
  onNotificationsPress,
  onAvatarPress,
  welcomeKey = 'home.welcome',
}: HomeHeaderProps) {
  const { t } = useTranslation();
  const avatarSource = avatarUri ? { uri: avatarUri } : avatarImage;

  return (
    <View className="gap-4">
      <View className="flex-row items-center justify-between">
        <Pressable
          accessibilityRole="button"
          accessibilityLabel={t('more.profile.title')}
          onPress={onAvatarPress}
          disabled={!onAvatarPress}
          className="relative size-8 items-center justify-center overflow-hidden rounded-full"
        >
          <Image source={avatarSource} style={{ width: 32, height: 32 }} contentFit="cover" />
        </Pressable>

        <Image
          source={headerLogo}
          style={{ width: 121, height: 29 }}
          contentFit="contain"
          accessibilityLabel={t('home.logoLabel')}
        />

        <Pressable
          accessibilityRole="button"
          accessibilityLabel={t('home.notifications')}
          onPress={onNotificationsPress}
          className="relative size-8 items-center justify-center rounded-2xl border border-slate-100 bg-white">
          <Image source={bellIcon} style={{ width: 16, height: 16 }} contentFit="contain" />
          {notificationCount > 0 ? (
            <View className="absolute -right-0.5 -top-0.5 size-3.5 items-center justify-center overflow-hidden rounded-md bg-primary">
              <Text
                className="text-[7px] leading-[8px] text-white"
                style={{ fontFamily: cairo.bold }}>
                {notificationCount}
              </Text>
            </View>
          ) : null}
        </Pressable>
      </View>

      <View className="flex-row items-center justify-between">
        <View className="items-start gap-2">
          <View className="flex-row items-center gap-1">
            <Text className="text-base text-label" style={{ fontFamily: cairo.regular }}>
              {t(welcomeKey, { name })}
            </Text>
            <Text className="text-base">👋</Text>
          </View>
          <Text className="text-xs text-slate-400" style={{ fontFamily: cairo.medium }}>
            {t('home.welcomeSubtitle')}
          </Text>
        </View>

        <View className="rounded-3xl bg-primary/10 px-2 py-2">
          <Text className="text-xs text-primary" style={{ fontFamily: cairo.medium }}>
            {t(roleKey)}
          </Text>
        </View>
      </View>
    </View>
  );
}
