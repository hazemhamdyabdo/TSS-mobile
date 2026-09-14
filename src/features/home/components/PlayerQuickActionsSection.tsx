import { useRouter, type Href } from 'expo-router';
import { useTranslation } from 'react-i18next';
import { Pressable, Text, View } from 'react-native';

import { RTL_CONTAINER_STYLE, RTL_TEXT_STYLE } from '@/localization/direction';
import { cairo } from '@/theme/typography';

import type { PlayerQuickAction, PlayerQuickActionId } from '../types';
import PlayerQuickActionIcon from './PlayerQuickActionIcon';

function navigatePlayerQuickAction(
  router: ReturnType<typeof useRouter>,
  actionId: PlayerQuickActionId,
) {
  switch (actionId) {
    case 'myCompetitions':
      router.push('/(tabs)/competitions');
      return;
    case 'rankings':
      router.push('/(tabs)/rankings');
      return;
    case 'punishments':
      router.push('/(tabs)/punishments');
      return;
    case 'profile':
      router.push('/profile' as Href);
      return;
    default: {
      const exhaustive: never = actionId;
      throw new Error(`Unhandled player quick action: ${exhaustive}`);
    }
  }
}

type PlayerQuickActionsSectionProps = {
  actions: PlayerQuickAction[];
};

export default function PlayerQuickActionsSection({ actions }: PlayerQuickActionsSectionProps) {
  const { t } = useTranslation();
  const router = useRouter();

  return (
    <View className="w-full items-stretch gap-4" style={RTL_CONTAINER_STYLE}>
      <Text
        className="w-full text-sm capitalize text-label"
        style={{ fontFamily: cairo.semiBold, ...RTL_TEXT_STYLE }}>
        {t('home.player.quickActions.title')}
      </Text>

      <View className="flex-row gap-2" style={RTL_CONTAINER_STYLE}>
        {actions.map((action) => (
          <Pressable
            key={action.id}
            accessibilityRole="button"
            accessibilityLabel={t(action.labelKey)}
            onPress={() => navigatePlayerQuickAction(router, action.id)}
            className="h-[60px] flex-1 items-center justify-center gap-1 overflow-hidden rounded-lg border border-slate-100 bg-white px-1 py-2">
            <View className="size-6 items-center justify-center">
              <PlayerQuickActionIcon actionId={action.id} />
            </View>
            <Text
              className="text-center text-[10px] leading-[12px] text-slate-500"
              style={{ fontFamily: cairo.regular, ...RTL_TEXT_STYLE }}
              numberOfLines={1}>
              {t(action.labelKey)}
            </Text>
          </Pressable>
        ))}
      </View>
    </View>
  );
}
