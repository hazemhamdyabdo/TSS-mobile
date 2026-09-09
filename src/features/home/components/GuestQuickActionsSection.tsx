import { useRouter, type Href } from 'expo-router';
import { useTranslation } from 'react-i18next';
import { Pressable, Text, View } from 'react-native';

import { RTL_CONTAINER_STYLE, RTL_TEXT_STYLE } from '@/localization/direction';
import { cairo } from '@/theme/typography';

import type { GuestQuickAction, GuestQuickActionId } from '../types';
import { navigateToNews } from '../utils/navigateToNews';
import GuestQuickActionIcon from './GuestQuickActionIcon';

function navigateGuestQuickAction(
  router: ReturnType<typeof useRouter>,
  actionId: GuestQuickActionId,
) {
  switch (actionId) {
    case 'competitions':
      router.push('/(tabs)/competitions');
      return;
    case 'clubs':
      router.push('/clubs' as Href);
      return;
    case 'players':
      router.push('/(tabs)/members');
      return;
    case 'news':
      navigateToNews();
      return;
    default: {
      const exhaustive: never = actionId;
      throw new Error(`Unhandled guest quick action: ${exhaustive}`);
    }
  }
}

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
        style={{ fontFamily: cairo.semiBold, ...RTL_TEXT_STYLE }}
      >
        {t('home.guest.quickActions.title')}
      </Text>

      <View className="flex-row gap-2" style={RTL_CONTAINER_STYLE}>
        {actions.map((action) => (
          <Pressable
            key={action.id}
            accessibilityRole="button"
            onPress={() => navigateGuestQuickAction(router, action.id)}
            className="h-[60px] flex-1 items-center justify-center gap-1 overflow-hidden rounded-lg border border-slate-100 bg-white px-1 py-2"
          >
            <View className="size-6 items-center justify-center">
              <GuestQuickActionIcon actionId={action.id} />
            </View>
            <Text
              className="text-center text-[10px] leading-[12px] text-slate-500"
              style={{ fontFamily: cairo.regular, ...RTL_TEXT_STYLE }}
              numberOfLines={2}
            >
              {t(action.labelKey)}
            </Text>
          </Pressable>
        ))}
      </View>
    </View>
  );
}
