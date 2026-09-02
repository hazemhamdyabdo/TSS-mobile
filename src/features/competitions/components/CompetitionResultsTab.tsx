import { MaterialDesignIcons } from '@react-native-vector-icons/material-design-icons';
import { useMemo, useRef, useState } from 'react';
import { Pressable, Text, View } from 'react-native';
import { useTranslation } from 'react-i18next';

import OptionPickerBottomSheet, {
  type OptionPickerBottomSheetRef,
} from '@/components/form/OptionPickerBottomSheet';
import { RTL_CONTAINER_STYLE, RTL_TEXT_STYLE } from '@/localization/direction';
import { cairo } from '@/theme/typography';

import type { MatchResult } from '../types';
import CompetitionSearchField from './CompetitionSearchField';
import MatchResultCard from './MatchResultCard';

const FILTER_OPTIONS = [
  { value: 'all', labelKey: 'competitions.resultFilters.all' },
  { value: 'competitions.rounds.quarterFinal', labelKey: 'competitions.rounds.quarterFinal' },
  { value: 'competitions.rounds.roundOf16', labelKey: 'competitions.rounds.roundOf16' },
  { value: 'competitions.rounds.roundOf32', labelKey: 'competitions.rounds.roundOf32' },
];

type CompetitionResultsTabProps = {
  results: MatchResult[];
};

export default function CompetitionResultsTab({ results }: CompetitionResultsTabProps) {
  const { t } = useTranslation();
  const filterSheetRef = useRef<OptionPickerBottomSheetRef>(null);
  const [query, setQuery] = useState('');
  const [roundKey, setRoundKey] = useState('all');

  const filtered = useMemo(() => {
    const normalized = query.trim().toLowerCase();

    return results.filter((result) => {
      if (roundKey !== 'all' && result.roundKey !== roundKey) {
        return false;
      }
      if (!normalized) {
        return true;
      }
      const haystack = `${t(result.startSide.nameKey)} ${t(result.endSide.nameKey)} ${t(result.roundKey)}`.toLowerCase();
      return haystack.includes(normalized);
    });
  }, [query, results, roundKey, t]);

  return (
    <View className="gap-3">
      <View className="flex-row items-center gap-2" style={RTL_CONTAINER_STYLE}>
        <CompetitionSearchField
          value={query}
          placeholder={t('competitions.searchResults')}
          onChangeText={setQuery}
        />
        <Pressable
          accessibilityRole="button"
          onPress={() => filterSheetRef.current?.open()}
          className="h-[42px] flex-row items-center gap-1.5 rounded-[10px] bg-primary px-3"
          style={RTL_CONTAINER_STYLE}>
          <MaterialDesignIcons name="filter-variant" size={16} color="#ffffff" />
          <Text className="text-xs text-white" style={{ fontFamily: cairo.semiBold }}>
            {t('competitions.filter')}
          </Text>
        </Pressable>
      </View>
      {filtered.length === 0 ? (
        <Text className="py-8 text-center text-xs text-slate-400" style={{ fontFamily: cairo.regular, ...RTL_TEXT_STYLE }}>
          {t('competitions.empty.results')}
        </Text>
      ) : (
        filtered.map((result) => <MatchResultCard key={result.id} result={result} />)
      )}
      <OptionPickerBottomSheet
        ref={filterSheetRef}
        options={FILTER_OPTIONS}
        selectedValue={roundKey}
        onSelect={setRoundKey}
      />
    </View>
  );
}
