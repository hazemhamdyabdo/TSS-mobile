import { useRouter, type Href } from 'expo-router';
import { useTranslation } from 'react-i18next';
import { Pressable, Text, View } from 'react-native';

import { RTL_CONTAINER_STYLE, RTL_TEXT_STYLE } from '@/localization/direction';
import { cairo } from '@/theme/typography';

import type { GuestQuickAction, GuestQuickActionId } from '../types';
import GuestQuickActionIcon from './GuestQuickActionIcon';

const GUEST_QUICK_ACTION_ROUTES: Record<GuestQuickActionId, Href> = {
  myCompetitions: '/(tabs)/competitions',
  rankings: '/rankings',
  penalties: '/punishments',
  profile: '/profile',
};

type GuestQuickActionsSectionProps = {
  actions: GuestQuickAction[];
};

export default function GuestQuickActionsSection({
  actions,
}: GuestQuickActionsSectionProps) {
  const { t } = useTranslation();
  const router = useRouter();

  return (
    <View className="w-full items-stretch gap-4" style={RTL_CONTAINER_STYLE}>
      <Text
        className="w-full text-sm capitalize text-label"
        style={{ fontFamily: cairo.semiBold, ...RTL_TEXT_STYLE }}>
        {t('home.guest.quickActions.title')}
      </Text>

      <View className="flex-row gap-2" style={RTL_CONTAINER_STYLE}>
        {actions.map((action) => (
          <Pressable
            key={action.id}
            accessibilityRole="button"
            onPress={() => router.push(GUEST_QUICK_ACTION_ROUTES[action.id])}
            className="h-[60px] flex-1 items-center justify-center gap-1 overflow-hidden rounded-lg border border-slate-100 bg-white p-2">
            <View className="size-6 items-center justify-center">
              <GuestQuickActionIcon actionId={action.id} />
            </View>
            <Text
              className="text-center text-[10px] leading-3 tracking-[0.086px] text-slate-500"
              style={{ fontFamily: cairo.regular }}
              numberOfLines={1}>
              {t(action.labelKey)}
            </Text>
          </Pressable>
        ))}
      </View>
    </View>
  );
}
