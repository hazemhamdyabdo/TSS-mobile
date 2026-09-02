import { Pressable, Text, View } from 'react-native';
import { useTranslation } from 'react-i18next';

import { RTL_CONTAINER_STYLE, RTL_TEXT_STYLE } from '@/localization/direction';
import { cairo } from '@/theme/typography';

import type { CompetitionDetailTab } from '../types';

const TABS: CompetitionDetailTab[] = ['info', 'participants', 'results'];

type CompetitionSegmentedTabsProps = {
  value: CompetitionDetailTab;
  onChange: (tab: CompetitionDetailTab) => void;
};

export default function CompetitionSegmentedTabs({ value, onChange }: CompetitionSegmentedTabsProps) {
  const { t } = useTranslation();

  return (
    <View className="h-12 flex-row rounded-xl bg-slate-100 p-1" style={RTL_CONTAINER_STYLE}>
      {TABS.map((tab) => {
        const selected = tab === value;

        return (
          <Pressable
            key={tab}
            accessibilityRole="button"
            onPress={() => onChange(tab)}
            className={`h-full flex-1 items-center justify-center rounded-lg ${selected ? 'bg-primary/10' : ''}`}>
            <Text
              className={`text-xs ${selected ? 'text-primary' : 'text-slate-400'}`}
              style={{ fontFamily: selected ? cairo.semiBold : cairo.medium, ...RTL_TEXT_STYLE }}>
              {t(`competitions.tabs.${tab}`)}
            </Text>
          </Pressable>
        );
      })}
    </View>
  );
}
