import { Text, View } from 'react-native';
import { useTranslation } from 'react-i18next';

import { RTL_CONTAINER_STYLE } from '@/localization/direction';
import { cairo } from '@/theme/typography';

import type { MemberMetaChip } from '../types';

type MemberMetaChipRowProps = {
  chips: MemberMetaChip[];
};

export default function MemberMetaChipRow({ chips }: MemberMetaChipRowProps) {
  const { t } = useTranslation();

  return (
    <View className="flex-row flex-wrap gap-1" style={RTL_CONTAINER_STYLE}>
      {chips.map((chip) => (
        <View
          key={`${chip.labelKey}-${chip.valueKey ?? chip.value}`}
          className="flex-row items-center gap-1 rounded border-[0.3px] border-slate-200 p-1"
          style={RTL_CONTAINER_STYLE}>
          <Text className="text-[10px] text-slate-500" style={{ fontFamily: cairo.regular }}>
            {t(chip.labelKey)}
          </Text>
          <View className="size-0.5 rounded-full bg-slate-400" />
          <Text
            className={`text-[10px] ${chip.emphasize ? 'text-primary' : 'text-accent'}`}
            style={{ fontFamily: cairo.medium }}>
            {chip.valueKey ? t(chip.valueKey) : chip.value}
          </Text>
        </View>
      ))}
    </View>
  );
}
