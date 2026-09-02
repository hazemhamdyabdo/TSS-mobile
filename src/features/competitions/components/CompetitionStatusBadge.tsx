import { MaterialDesignIcons } from '@react-native-vector-icons/material-design-icons';
import { Text, View } from 'react-native';
import { useTranslation } from 'react-i18next';

import { RTL_TEXT_STYLE } from '@/localization/direction';
import { cairo } from '@/theme/typography';

import type { CompetitionStatus } from '../types';

type CompetitionStatusBadgeProps = {
  status: CompetitionStatus;
};

export default function CompetitionStatusBadge({ status }: CompetitionStatusBadgeProps) {
  const { t } = useTranslation();

  switch (status) {
    case 'ongoing':
      return (
        <View className="h-[13px] items-center justify-center rounded-3xl bg-primary/10 px-1.5">
          <Text className="text-[8px] text-primary" style={{ fontFamily: cairo.medium, ...RTL_TEXT_STYLE }}>
            {t('competitions.status.ongoing')}
          </Text>
        </View>
      );
    case 'upcoming':
      return (
        <View className="h-[13px] items-center justify-center rounded-3xl bg-info/10 px-1.5">
          <Text className="text-[8px] text-info" style={{ fontFamily: cairo.medium, ...RTL_TEXT_STYLE }}>
            {t('competitions.status.upcoming')}
          </Text>
        </View>
      );
    case 'ended':
      return (
        <View className="h-[13px] items-center justify-center rounded-3xl bg-slate-100 px-1.5">
          <Text className="text-[8px] text-slate-500" style={{ fontFamily: cairo.medium, ...RTL_TEXT_STYLE }}>
            {t('competitions.status.ended')}
          </Text>
        </View>
      );
    default: {
      const exhaustive: never = status;
      throw new Error(`Unhandled competition status: ${exhaustive}`);
    }
  }
}

export function CompetitionMetaItem({
  icon,
  label,
}: {
  icon: 'map-marker-outline' | 'fencing' | 'clock-outline' | 'calendar-month-outline' | 'account-group-outline';
  label: string;
}) {
  return (
    <View className="flex-row items-center gap-1">
      <Text className="text-[10px] text-slate-400" style={{ fontFamily: cairo.medium, ...RTL_TEXT_STYLE }}>
        {label}
      </Text>
      <MaterialDesignIcons name={icon} size={10} color="#90A1B9" />
    </View>
  );
}
