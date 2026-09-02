import { Text, View } from 'react-native';
import { useTranslation } from 'react-i18next';

import { RTL_CONTAINER_STYLE, RTL_TEXT_STYLE } from '@/localization/direction';
import { cairo } from '@/theme/typography';

import type { MemberOverviewRow } from '../types';
import MemberOverviewIconView from './MemberOverviewIconView';

type MemberOverviewRowViewProps = {
  row: MemberOverviewRow;
};

export default function MemberOverviewRowView({ row }: MemberOverviewRowViewProps) {
  const { t } = useTranslation();
  const value = row.valueKey ? t(row.valueKey) : (row.value ?? '');

  return (
    <View
      className="h-11 flex-row items-center justify-between rounded-lg bg-background px-3"
      style={RTL_CONTAINER_STYLE}>
      <View className="flex-row items-center gap-2" style={RTL_CONTAINER_STYLE}>
        <View className="size-6 items-center justify-center overflow-hidden rounded-[6px] bg-primary/10">
          <MemberOverviewIconView icon={row.icon} />
        </View>
        <Text className="text-xs text-accent" style={{ fontFamily: cairo.medium, ...RTL_TEXT_STYLE }}>
          {t(row.labelKey)}
        </Text>
      </View>
      <Text
        className={`text-xs ${row.emphasize ? 'text-primary' : 'text-slate-500'}`}
        style={{ fontFamily: row.emphasize ? cairo.bold : cairo.regular, ...RTL_TEXT_STYLE }}>
        {value}
      </Text>
    </View>
  );
}
