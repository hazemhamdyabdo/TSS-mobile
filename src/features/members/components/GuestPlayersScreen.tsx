import { useRouter, type Href } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useMemo, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Pressable, ScrollView, Text, View } from 'react-native';
import { SvgXml } from 'react-native-svg';

import OptionPickerBottomSheet, { type OptionPickerBottomSheetRef } from '@/components/form/OptionPickerBottomSheet';
import type { SelectOption } from '@/components/form/types';
import ScreenSafeAreaView from '@/components/ScreenSafeAreaView';
import CreateScreenHeader from '@/features/create/components/CreateScreenHeader';
import { getMembers } from '@/features/members/api';
import { FILTER_ICON_XML } from '@/features/members/constants/iconXml';
import { useMembersState } from '@/features/members/hooks/useMembersState';
import type { MemberStatusFilter, PlayerMember } from '@/features/members/types';
import { getMemberName } from '@/features/members/utils/labels';
import { useMockListFetch } from '@/hooks/useMockListFetch';
import { RTL_CONTAINER_STYLE, RTL_TEXT_STYLE } from '@/localization/direction';
import { cairo } from '@/theme/typography';
import MemberSearchField from '@/features/members/components/MemberSearchField';
import PlayerCard from '@/features/members/components/PlayerCard';

const FILTER_OPTIONS: SelectOption[] = [
  { value: 'all', labelKey: 'members.filters.all' },
  { value: 'active', labelKey: 'members.filters.active' },
  { value: 'suspended', labelKey: 'members.filters.suspended' },
];
const WHITE_FILTER_ICON_XML = FILTER_ICON_XML.replaceAll('#018A43', '#FFFFFF');

export default function GuestPlayersScreen() {
  const { t } = useTranslation();
  const router = useRouter();
  const state = useMembersState();
  const isLoading = useMockListFetch(getMembers);
  const filterSheetRef = useRef<OptionPickerBottomSheetRef>(null);
  const [query, setQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<MemberStatusFilter>('all');
  const players = useMemo(() => {
    const normalized = query.trim().toLowerCase();
    return state.items.filter((member): member is PlayerMember =>
      member.category === 'player' &&
      (statusFilter === 'all' || member.status === statusFilter) &&
      getMemberName(member, t).toLowerCase().includes(normalized),
    );
  }, [query, state.items, statusFilter, t]);

  return (
    <ScreenSafeAreaView className="flex-1 bg-background" edges={['top', 'bottom']} style={RTL_CONTAINER_STYLE}>
      <StatusBar style="auto" />
      <CreateScreenHeader title={t('members.categories.player')} onBack={() => router.navigate('/(tabs)')} />
      <ScrollView className="flex-1" contentContainerClassName="gap-6 px-5 pb-4 pt-3" keyboardShouldPersistTaps="handled" showsVerticalScrollIndicator={false}>
        <View className="flex-row items-center gap-2" style={RTL_CONTAINER_STYLE}>
          <MemberSearchField value={query} placeholder={t('members.guest.search')} onChangeText={setQuery} />
          <Pressable accessibilityRole="button" accessibilityLabel={t('members.filter')} onPress={() => filterSheetRef.current?.open()} className="h-10 flex-row items-center gap-1 rounded-lg bg-primary px-3" style={RTL_CONTAINER_STYLE}>
            <SvgXml xml={WHITE_FILTER_ICON_XML} width={16} height={16} />
            <Text className="text-sm text-white" style={{ fontFamily: cairo.regular }}>{t('members.filter')}</Text>
          </Pressable>
        </View>
        <View className="gap-4">
          <Text className="text-sm text-accent" style={{ fontFamily: cairo.semiBold, ...RTL_TEXT_STYLE }}>{t('members.listTitle.player')}</Text>
          <View className="gap-2">
            {isLoading ? Array.from({ length: 6 }, (_, index) => <View key={index} className="h-[74px] rounded-lg bg-slate-100" />) : players.length === 0 ? (
              <Text className="py-8 text-center text-xs text-slate-400" style={{ fontFamily: cairo.medium }}>{t('members.guest.empty')}</Text>
            ) : players.map((member) => <PlayerCard key={member.id} member={member} onPress={() => router.push(`/member/${member.id}` as Href)} />)}
          </View>
        </View>
      </ScrollView>
      <OptionPickerBottomSheet ref={filterSheetRef} options={FILTER_OPTIONS} selectedValue={statusFilter} onSelect={(value) => setStatusFilter(value as MemberStatusFilter)} />
    </ScreenSafeAreaView>
  );
}
