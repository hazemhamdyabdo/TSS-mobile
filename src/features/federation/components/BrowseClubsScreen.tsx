import { useRouter, type Href } from 'expo-router';
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
import MemberSearchField from '@/features/members/components/MemberSearchField';
import { FILTER_ICON_XML } from '@/features/members/constants/iconXml';
import { RTL_CONTAINER_STYLE, RTL_TEXT_STYLE } from '@/localization/direction';
import { cairo } from '@/theme/typography';

import {
  BROWSE_CLUBS,
  CLUB_REGION_FILTERS,
} from '../constants/browseClubs';
import type { BrowseClub, ClubRegionFilter } from '../types';
import ClubGridCard from './ClubGridCard';

const REGION_FILTER_OPTIONS: SelectOption[] = CLUB_REGION_FILTERS.map((value) => ({
  value,
  labelKey:
    value === 'all'
      ? 'federation.browse.filters.all'
      : `create.options.region.${value}`,
}));

function chunkClubs(clubs: BrowseClub[], size: number) {
  const rows: BrowseClub[][] = [];
  for (let index = 0; index < clubs.length; index += size) {
    rows.push(clubs.slice(index, index + size));
  }
  return rows;
}

export default function BrowseClubsScreen() {
  const { t } = useTranslation();
  const router = useRouter();
  const filterSheetRef = useRef<OptionPickerBottomSheetRef>(null);
  const [query, setQuery] = useState('');
  const [regionFilter, setRegionFilter] = useState<ClubRegionFilter>('all');

  const clubs = useMemo(() => {
    const normalized = query.trim().toLowerCase();

    return BROWSE_CLUBS.filter((club) => {
      if (regionFilter !== 'all' && club.region !== regionFilter) {
        return false;
      }

      if (!normalized) {
        return true;
      }

      return t(club.nameKey).toLowerCase().includes(normalized);
    });
  }, [query, regionFilter, t]);

  return (
    <ScreenSafeAreaView
      className="flex-1 bg-background"
      edges={['top', 'bottom']}
      style={RTL_CONTAINER_STYLE}
    >
      <StatusBar style="auto" />
      <CreateScreenHeader title={t('federation.browse.title')} />
      <ScrollView
        className="flex-1"
        contentContainerClassName="gap-4 px-5 pb-8 pt-2"
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        <View className="flex-row items-center gap-2" style={RTL_CONTAINER_STYLE}>
          <MemberSearchField
            value={query}
            placeholder={t('federation.browse.search')}
            onChangeText={setQuery}
          />
          <Pressable
            accessibilityRole="button"
            onPress={() => filterSheetRef.current?.open()}
            className="h-[42px] flex-row items-center gap-2 rounded-[10px] border border-slate-100 bg-white px-3"
            style={RTL_CONTAINER_STYLE}
          >
            <Text
              className="text-xs text-primary"
              style={{ fontFamily: cairo.semiBold }}
            >
              {t('federation.browse.filter')}
            </Text>
            <SvgXml xml={FILTER_ICON_XML} width={16} height={16} />
          </Pressable>
        </View>

        <Text
          className="text-sm text-accent"
          style={{ fontFamily: cairo.semiBold, ...RTL_TEXT_STYLE }}
        >
          {t('federation.browse.allClubs')}
        </Text>

        {clubs.length === 0 ? (
          <Text
            className="py-8 text-center text-xs text-slate-400"
            style={{ fontFamily: cairo.medium }}
          >
            {t('federation.empty.clubs')}
          </Text>
        ) : (
          <View className="gap-3">
            {chunkClubs(clubs, 3).map((row, rowIndex) => (
              <View
                key={`club-row-${rowIndex}`}
                className="flex-row gap-3"
                style={RTL_CONTAINER_STYLE}
              >
                {row.map((club) => (
                  <View key={club.id} className="min-w-0 flex-1">
                    <ClubGridCard
                      club={club}
                      onPress={() => router.push(`/clubs/${club.id}` as Href)}
                    />
                  </View>
                ))}
                {row.length < 3
                  ? Array.from({ length: 3 - row.length }).map((_, index) => (
                      <View key={`spacer-${rowIndex}-${index}`} className="min-w-0 flex-1" />
                    ))
                  : null}
              </View>
            ))}
          </View>
        )}
      </ScrollView>
      <OptionPickerBottomSheet
        ref={filterSheetRef}
        options={REGION_FILTER_OPTIONS}
        selectedValue={regionFilter}
        onSelect={(value) => setRegionFilter(value as ClubRegionFilter)}
      />
    </ScreenSafeAreaView>
  );
}
