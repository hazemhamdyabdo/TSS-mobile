import { MaterialDesignIcons } from '@react-native-vector-icons/material-design-icons';
import { useMemo, useRef, useState } from 'react';
import { Pressable, Text, View } from 'react-native';
import { useTranslation } from 'react-i18next';

import OptionPickerBottomSheet, {
  type OptionPickerBottomSheetRef,
} from '@/components/form/OptionPickerBottomSheet';
import { RTL_CONTAINER_STYLE, RTL_TEXT_STYLE } from '@/localization/direction';
import { cairo } from '@/theme/typography';

import type { Participant } from '../types';
import CompetitionSearchField from './CompetitionSearchField';
import ParticipantCard from './ParticipantCard';

type ParticipantFilter = 'all' | 'active' | 'suspended' | 'nationalTeam';

const FILTER_OPTIONS = [
  { value: 'all', labelKey: 'competitions.participantFilters.all' },
  { value: 'active', labelKey: 'competitions.participantFilters.active' },
  { value: 'suspended', labelKey: 'competitions.participantFilters.suspended' },
  { value: 'nationalTeam', labelKey: 'competitions.participantFilters.nationalTeam' },
];

type CompetitionParticipantsTabProps = {
  participants: Participant[];
};

export default function CompetitionParticipantsTab({ participants }: CompetitionParticipantsTabProps) {
  const { t } = useTranslation();
  const filterSheetRef = useRef<OptionPickerBottomSheetRef>(null);
  const [query, setQuery] = useState('');
  const [filter, setFilter] = useState<ParticipantFilter>('all');

  const filtered = useMemo(() => {
    const normalized = query.trim().toLowerCase();

    return participants.filter((participant) => {
      if (filter === 'active' && participant.status !== 'active') {
        return false;
      }
      if (filter === 'suspended' && participant.status !== 'suspended') {
        return false;
      }
      if (filter === 'nationalTeam' && !participant.nationalTeam) {
        return false;
      }
      if (!normalized) {
        return true;
      }
      return t(participant.nameKey).toLowerCase().includes(normalized);
    });
  }, [filter, participants, query, t]);

  return (
    <View className="gap-3">
      <View className="flex-row items-center gap-2" style={RTL_CONTAINER_STYLE}>
        <CompetitionSearchField
          value={query}
          placeholder={t('competitions.searchParticipants')}
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
          {t('competitions.empty.participants')}
        </Text>
      ) : (
        filtered.map((participant) => <ParticipantCard key={participant.id} participant={participant} />)
      )}
      <OptionPickerBottomSheet
        ref={filterSheetRef}
        options={FILTER_OPTIONS}
        selectedValue={filter}
        onSelect={(value) => setFilter(value as ParticipantFilter)}
      />
    </View>
  );
}
