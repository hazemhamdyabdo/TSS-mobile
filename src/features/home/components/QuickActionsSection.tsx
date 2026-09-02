import { Pressable, Text, View } from 'react-native';
import { useTranslation } from 'react-i18next';

import { cairo } from '@/theme/typography';

import type { QuickAction } from '../types';
import QuickActionIcon from './QuickActionIcon';

type QuickActionsSectionProps = {
  actions: QuickAction[];
};

export default function QuickActionsSection({ actions }: QuickActionsSectionProps) {
  const { t } = useTranslation();

  return (
    <View className="w-full items-stretch gap-4">
      <View className="flex-row items-center justify-between">
        <Text className="text-sm text-label" style={{ fontFamily: cairo.semiBold }}>
          {t('home.quickActions.title')}
        </Text>
        <Pressable accessibilityRole="button">
          <Text className="text-[10px] text-primary" style={{ fontFamily: cairo.semiBold }}>
            {t('home.viewAll')}
          </Text>
        </Pressable>
      </View>

      <View className="flex-row gap-2">
        {actions.map((action) => (
          <Pressable
            key={action.id}
            accessibilityRole="button"
            className="h-[60px] flex-1 items-center justify-center gap-1 overflow-hidden rounded-lg border border-slate-100 bg-white p-2">
            <View className="size-6 items-center justify-center">
              <QuickActionIcon actionId={action.id} />
            </View>
            <Text
              className="text-center text-[10px] leading-[12px] text-slate-500"
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
