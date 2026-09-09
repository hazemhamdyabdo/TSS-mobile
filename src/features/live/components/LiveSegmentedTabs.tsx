import { useTranslation } from 'react-i18next';
import { Pressable, Text, View } from 'react-native';

import { RTL_CONTAINER_STYLE, RTL_TEXT_STYLE } from '@/localization/direction';
import { colors } from '@/theme/colors';
import { cairo } from '@/theme/typography';

import type { LiveMatchTab } from '../types';

const TABS: LiveMatchTab[] = ['broadcast', 'details', 'stats'];

type LiveSegmentedTabsProps = {
  value: LiveMatchTab;
  onChange: (tab: LiveMatchTab) => void;
};

function tabLabelKey(tab: LiveMatchTab) {
  switch (tab) {
    case 'broadcast':
      return 'live.tabs.broadcast';
    case 'details':
      return 'live.tabs.details';
    case 'stats':
      return 'live.tabs.stats';
    default: {
      const exhaustive: never = tab;
      return exhaustive;
    }
  }
}

export default function LiveSegmentedTabs({
  value,
  onChange,
}: LiveSegmentedTabsProps) {
  const { t } = useTranslation();

  return (
    <View
      className="h-12 flex-row items-center gap-2 rounded-[50px] border border-slate-100 bg-white p-1"
      style={RTL_CONTAINER_STYLE}
    >
      {TABS.map((tab) => {
        const selected = tab === value;

        return (
          <Pressable
            key={tab}
            accessibilityRole="button"
            onPress={() => onChange(tab)}
            className={`h-10 min-w-0 flex-1 items-center justify-center rounded-[20px] ${
              selected ? 'bg-primary/10' : ''
            }`}
          >
            <Text
              className="text-xs"
              style={{
                color: selected ? colors.primary : colors.slate400,
                fontFamily: selected ? cairo.semiBold : cairo.regular,
                ...RTL_TEXT_STYLE,
              }}
            >
              {t(tabLabelKey(tab))}
            </Text>
          </Pressable>
        );
      })}
    </View>
  );
}
