import { useRouter, type Href } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useMemo, useRef, useState } from 'react';
import { Pressable, ScrollView, Text, View } from 'react-native';
import { SvgXml } from 'react-native-svg';
import { useTranslation } from 'react-i18next';

import OptionPickerBottomSheet, {
  type OptionPickerBottomSheetRef,
} from '@/components/form/OptionPickerBottomSheet';
import type { SelectOption } from '@/components/form/types';
import ScreenSafeAreaView from '@/components/ScreenSafeAreaView';
import CreateBackButton from '@/features/create/components/CreateBackButton';
import { CREATE_ROUTES } from '@/features/create/constants/actions';
import { useMockListFetch } from '@/hooks/useMockListFetch';
import { RTL_CONTAINER_STYLE, RTL_TEXT_STYLE } from '@/localization/direction';
import { cairo } from '@/theme/typography';

import { getMembers } from '../api';
import { FILTER_ICON_XML, PLUS_ICON_XML } from '../constants/iconXml';
import { useMembersState } from '../hooks/useMembersState';
import type { AddMemberActionId, Member, MemberCategory, MemberStatusFilter } from '../types';
import AdministratorCard from './AdministratorCard';
import CoachCard from './CoachCard';
import MemberCategoryChips from './MemberCategoryChips';
import MemberSearchField from './MemberSearchField';
import MemberStatCards from './MemberStatCards';
import MembersSkeleton from './MembersSkeleton';
import PlayerCard from './PlayerCard';
import RefereeCard from './RefereeCard';

const ADD_OPTIONS: SelectOption[] = [
  { value: 'addPlayer', labelKey: 'members.addTypes.player' },
  { value: 'addCoach', labelKey: 'members.addTypes.coach' },
  { value: 'addReferee', labelKey: 'members.addTypes.referee' },
  { value: 'addAdministrator', labelKey: 'members.addTypes.administrator' },
];

const FILTER_OPTIONS: SelectOption[] = [
  { value: 'all', labelKey: 'members.filters.all' },
  { value: 'active', labelKey: 'members.filters.active' },
  { value: 'suspended', labelKey: 'members.filters.suspended' },
  { value: 'onLeave', labelKey: 'members.filters.onLeave' },
];

export default function MembersScreen() {
  const { t } = useTranslation();
  const router = useRouter();
  const state = useMembersState();
  const isLoading = useMockListFetch(getMembers);
  const addSheetRef = useRef<OptionPickerBottomSheetRef>(null);
  const filterSheetRef = useRef<OptionPickerBottomSheetRef>(null);
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState<MemberCategory>('player');
  const [statusFilter, setStatusFilter] = useState<MemberStatusFilter>('all');

  const filteredItems = useMemo(() => {
    const normalized = query.trim().toLowerCase();

    return state.items.filter((item) => {
      if (item.category !== category) {
        return false;
      }

      if (statusFilter !== 'all' && item.status !== statusFilter) {
        return false;
      }

      if (!normalized) {
        return true;
      }

      return t(item.nameKey).toLowerCase().includes(normalized);
    });
  }, [category, query, state.items, statusFilter, t]);

  const handleAddSelect = (value: string) => {
    const actionId = value as AddMemberActionId;

    switch (actionId) {
      case 'addPlayer':
        router.push(CREATE_ROUTES.addPlayer);
        return;
      case 'addCoach':
        router.push(CREATE_ROUTES.addCoach);
        return;
      case 'addReferee':
        router.push(CREATE_ROUTES.addReferee);
        return;
      case 'addAdministrator':
        router.push(CREATE_ROUTES.addAdministrator);
        return;
      default: {
        const exhaustive: never = actionId;
        throw new Error(`Unhandled add member action: ${exhaustive}`);
      }
    }
  };

  const openDetails = (member: Member) => {
    if (member.category === 'administrator') {
      return;
    }

    router.push(`/member/${member.id}` as Href);
  };

  return (
    <ScreenSafeAreaView className="flex-1 bg-background" edges={['top']} style={RTL_CONTAINER_STYLE}>
      <StatusBar style="dark" />
      <ScrollView
        className="flex-1"
        contentContainerClassName="gap-4 px-5 pb-28 pt-2"
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}>
        {isLoading ? (
          <MembersSkeleton />
        ) : (
          <>
            <View className="h-8 flex-row items-center gap-4" style={RTL_CONTAINER_STYLE}>
              <CreateBackButton onPress={() => router.navigate('/(tabs)')} />
              <Text className="text-base text-accent" style={{ fontFamily: cairo.semiBold, ...RTL_TEXT_STYLE }}>
                {t('members.title')}
              </Text>
            </View>

            <View className="flex-row items-center gap-2" style={RTL_CONTAINER_STYLE}>
              <MemberSearchField
                value={query}
                placeholder={t('members.search')}
                onChangeText={setQuery}
              />
              <Pressable
                accessibilityRole="button"
                onPress={() => addSheetRef.current?.open()}
                className="h-[42px] flex-row items-center gap-2 rounded-[10px] bg-primary px-3"
                style={RTL_CONTAINER_STYLE}>
                <SvgXml xml={PLUS_ICON_XML} width={16} height={16} />
                <Text className="text-xs text-white" style={{ fontFamily: cairo.semiBold }}>
                  {t('members.add')}
                </Text>
              </Pressable>
            </View>

            <MemberStatCards totalCount={state.totalCount} suspendedCount={state.suspendedCount} />
            <MemberCategoryChips value={category} onChange={setCategory} />

            <View className="flex-row items-center justify-between" style={RTL_CONTAINER_STYLE}>
              <Text className="text-xs text-accent" style={{ fontFamily: cairo.semiBold, ...RTL_TEXT_STYLE }}>
                {t(`members.listTitle.${category}`)}
              </Text>
              <Pressable
                accessibilityRole="button"
                onPress={() => filterSheetRef.current?.open()}
                className="flex-row items-center gap-1"
                style={RTL_CONTAINER_STYLE}>
                <Text className="text-xs text-primary" style={{ fontFamily: cairo.medium }}>
                  {t('members.filter')}
                </Text>
                <SvgXml xml={FILTER_ICON_XML} width={16} height={16} />
              </Pressable>
            </View>

            {filteredItems.length === 0 ? (
              <Text className="py-8 text-center text-xs text-slate-400" style={{ fontFamily: cairo.medium }}>
                {t('members.empty')}
              </Text>
            ) : (
              <View className="gap-2">
                {filteredItems.map((member) => (
                  <MemberListCard key={member.id} member={member} onPress={() => openDetails(member)} />
                ))}
              </View>
            )}
          </>
        )}
      </ScrollView>
      <OptionPickerBottomSheet ref={addSheetRef} options={ADD_OPTIONS} onSelect={handleAddSelect} />
      <OptionPickerBottomSheet
        ref={filterSheetRef}
        options={FILTER_OPTIONS}
        selectedValue={statusFilter}
        onSelect={(value) => setStatusFilter(value as MemberStatusFilter)}
      />
    </ScreenSafeAreaView>
  );
}

function MemberListCard({ member, onPress }: { member: Member; onPress: () => void }) {
  switch (member.category) {
    case 'player':
      return <PlayerCard member={member} onPress={onPress} />;
    case 'coach':
      return <CoachCard member={member} onPress={onPress} />;
    case 'referee':
      return <RefereeCard member={member} onPress={onPress} />;
    case 'administrator':
      return <AdministratorCard member={member} />;
    default: {
      const exhaustive: never = member;
      throw new Error(`Unhandled member card: ${exhaustive}`);
    }
  }
}
