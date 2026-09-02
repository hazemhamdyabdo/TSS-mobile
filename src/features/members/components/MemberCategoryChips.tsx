import { Pressable, Text, View } from 'react-native';
import { useTranslation } from 'react-i18next';

import { RTL_CONTAINER_STYLE, RTL_TEXT_STYLE } from '@/localization/direction';
import { cairo } from '@/theme/typography';

import type { MemberCategory } from '../types';

const CATEGORIES: MemberCategory[] = ['player', 'coach', 'referee', 'administrator'];

type MemberCategoryChipsProps = {
  value: MemberCategory;
  onChange: (value: MemberCategory) => void;
};

export default function MemberCategoryChips({ value, onChange }: MemberCategoryChipsProps) {
  const { t } = useTranslation();

  return (
    <View
      className="h-12 flex-row items-center gap-2 rounded-[50px] border border-slate-100 bg-white p-1"
      style={RTL_CONTAINER_STYLE}>
      {CATEGORIES.map((category) => {
        const selected = category === value;

        return (
          <Pressable
            key={category}
            accessibilityRole="button"
            onPress={() => onChange(category)}
            className={`h-10 min-w-0 flex-1 items-center justify-center rounded-[20px] ${
              selected ? 'bg-primary/10' : ''
            }`}>
            <Text
              className={`text-xs ${selected ? 'text-primary' : 'text-slate-400'}`}
              style={{ fontFamily: selected ? cairo.semiBold : cairo.regular, ...RTL_TEXT_STYLE }}>
              {t(`members.categories.${category}`)}
            </Text>
          </Pressable>
        );
      })}
    </View>
  );
}
