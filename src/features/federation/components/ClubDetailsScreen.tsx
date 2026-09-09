import { useLocalSearchParams, useRouter, type Href } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useMemo, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Pressable, ScrollView, Text, View } from 'react-native';
import { SvgXml } from 'react-native-svg';

import OptionPickerBottomSheet, {
  type OptionPickerBottomSheetRef,
} from '@/components/form/OptionPickerBottomSheet';
import type { SelectOption } from '@/components/form/types';
import ScreenSafeAreaView from '@/components/ScreenSafeAreaView';
import CreateScreenHeader from '@/features/create/components/CreateScreenHeader';
import MemberOverviewRowView from '@/features/members/components/MemberOverviewRowView';
import PlayerCard from '@/features/members/components/PlayerCard';
import { FILTER_ICON_XML } from '@/features/members/constants/iconXml';
import { useMembersState } from '@/features/members/hooks/useMembersState';
import type { MemberStatusFilter, PlayerMember } from '@/features/members/types';
import { RTL_CONTAINER_STYLE, RTL_TEXT_STYLE } from '@/localization/direction';
import { cairo } from '@/theme/typography';

import { getBrowseClubById } from '../constants/browseClubs';
import ClubHeroCard from './ClubHeroCard';

const PLAYER_FILTER_OPTIONS: SelectOption[] = [
  { value: 'all', labelKey: 'members.filters.all' },
  { value: 'active', labelKey: 'members.filters.active' },
  { value: 'suspended', labelKey: 'members.filters.suspended' },
];

export default function ClubDetailsScreen() {
  const { t } = useTranslation();
  const router = useRouter();
  const rawId = useLocalSearchParams<{ id: string | string[] }>().id;
  const id = Array.isArray(rawId) ? rawId[0] : rawId;
  const membersState = useMembersState();
  const filterSheetRef = useRef<OptionPickerBottomSheetRef>(null);
  const [statusFilter, setStatusFilter] = useState<MemberStatusFilter>('all');

  const club = useMemo(() => (id ? getBrowseClubById(id) : undefined), [id]);

  const players = useMemo(() => {
    if (!club) {
      return [] as PlayerMember[];
    }

    const clubPlayers = club.playerIds
      .map((playerId) => membersState.items.find((item) => item.id === playerId))
      .filter((item): item is PlayerMember => item?.category === 'player');

    if (statusFilter === 'all') {
      return clubPlayers;
    }

    return clubPlayers.filter((player) => player.status === statusFilter);
  }, [club, membersState.items, statusFilter]);

  const overviewRows = useMemo(() => {
    if (!club) {
      return [];
    }

    return [
      {
        labelKey: 'federation.browse.fields.name',
        valueKey: club.nameKey,
        icon: 'club' as const,
      },
      {
        labelKey: 'federation.browse.fields.region',
        valueKey: `create.options.region.${club.region}`,
        icon: 'globe' as const,
      },
      {
        labelKey: 'federation.browse.fields.category',
        valueKey: `create.options.clubCategory.${club.category}`,
        icon: 'category' as const,
      },
      {
        labelKey: 'federation.browse.fields.playerCount',
        value: String(club.playerCount),
        icon: 'usersGroup' as const,
      },
    ];
  }, [club]);

  if (!club) {
    return (
      <ScreenSafeAreaView
        className="flex-1 bg-background"
        edges={['top', 'bottom']}
        style={RTL_CONTAINER_STYLE}
      >
        <StatusBar style="auto" />
        <CreateScreenHeader title={t('federation.browse.detailsTitle')} />
        <View className="flex-1 items-center justify-center px-5">
          <Text
            className="text-sm text-slate-400"
            style={{ fontFamily: cairo.medium, ...RTL_TEXT_STYLE }}
          >
            {t('federation.browse.notFound')}
          </Text>
        </View>
      </ScreenSafeAreaView>
    );
  }

  return (
    <ScreenSafeAreaView
      className="flex-1 bg-background"
      edges={['top', 'bottom']}
      style={RTL_CONTAINER_STYLE}
    >
      <StatusBar style="auto" />
      <CreateScreenHeader title={t('federation.browse.detailsTitle')} />
      <ScrollView
        className="flex-1"
        contentContainerClassName="gap-4 px-5 pb-8"
        showsVerticalScrollIndicator={false}
      >
        <ClubHeroCard club={club} />

        <View className="gap-4">
          <Text
            className="text-sm text-accent"
            style={{ fontFamily: cairo.semiBold, ...RTL_TEXT_STYLE }}
          >
            {t('federation.browse.overview')}
          </Text>
          <View className="gap-2 rounded-[8px] border border-slate-100 bg-white p-3">
            {overviewRows.map((row) => (
              <MemberOverviewRowView
                key={`${row.labelKey}-${row.valueKey ?? row.value}`}
                row={row}
              />
            ))}
          </View>
        </View>

        <View className="gap-3">
          <View
            className="flex-row items-center justify-between"
            style={RTL_CONTAINER_STYLE}
          >
            <Text
              className="text-sm text-accent"
              style={{ fontFamily: cairo.semiBold, ...RTL_TEXT_STYLE }}
            >
              {t('federation.browse.players')}
            </Text>
            <Pressable
              accessibilityRole="button"
              onPress={() => filterSheetRef.current?.open()}
              className="flex-row items-center gap-1"
              style={RTL_CONTAINER_STYLE}
            >
              <Text
                className="text-sm text-primary"
                style={{ fontFamily: cairo.semiBold }}
              >
                {t('federation.browse.filter')}
              </Text>
              <SvgXml xml={FILTER_ICON_XML} width={16} height={16} />
            </Pressable>
          </View>

          {players.length === 0 ? (
            <Text
              className="py-6 text-center text-xs text-slate-400"
              style={{ fontFamily: cairo.medium }}
            >
              {t('federation.browse.emptyPlayers')}
            </Text>
          ) : (
            <View className="gap-2">
              {players.map((player) => (
                <PlayerCard
                  key={player.id}
                  member={player}
                  onPress={() => router.push(`/member/${player.id}` as Href)}
                />
              ))}
            </View>
          )}
        </View>
      </ScrollView>
      <OptionPickerBottomSheet
        ref={filterSheetRef}
        options={PLAYER_FILTER_OPTIONS}
        selectedValue={statusFilter}
        onSelect={(value) => setStatusFilter(value as MemberStatusFilter)}
      />
    </ScreenSafeAreaView>
  );
}
