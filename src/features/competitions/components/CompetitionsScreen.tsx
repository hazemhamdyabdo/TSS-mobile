import { MaterialDesignIcons } from '@react-native-vector-icons/material-design-icons';
import { useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useMemo, useState } from 'react';
import { Pressable, ScrollView, Text, View } from 'react-native';
import { useTranslation } from 'react-i18next';

import ScreenSafeAreaView from '@/components/ScreenSafeAreaView';
import CreateBackButton from '@/features/create/components/CreateBackButton';
import { CREATE_ROUTES } from '@/features/create/constants/actions';
import { useMockListFetch } from '@/hooks/useMockListFetch';
import { RTL_CONTAINER_STYLE, RTL_TEXT_STYLE } from '@/localization/direction';
import { cairo } from '@/theme/typography';

import { getCompetitions } from '../api';
import { useCompetitionsState } from '../hooks/useCompetitionsState';
import type { CompetitionFilter, CompetitionStatus } from '../types';
import CompetitionCard from './CompetitionCard';
import CompetitionSearchField from './CompetitionSearchField';
import CompetitionsEmptyState from './CompetitionsEmptyState';
import CompetitionsSkeleton from './CompetitionsSkeleton';

const FILTERS: CompetitionFilter[] = ['all', 'ongoing', 'upcoming', 'ended'];

function countByStatus(status: CompetitionStatus, items: { status: CompetitionStatus }[]) {
  return items.filter((item) => item.status === status).length;
}

export default function CompetitionsScreen() {
  const { t } = useTranslation();
  const router = useRouter();
  const state = useCompetitionsState();
  const isLoading = useMockListFetch(getCompetitions);
  const [query, setQuery] = useState('');
  const [filter, setFilter] = useState<CompetitionFilter>('all');

  const filteredItems = useMemo(() => {
    const normalized = query.trim().toLowerCase();

    return state.items.filter((item) => {
      if (filter !== 'all' && item.status !== filter) {
        return false;
      }

      if (!normalized) {
        return true;
      }

      const haystack = `${t(item.titleKey)} ${t(item.locationKey)} ${t(item.eventTypeKey)}`.toLowerCase();
      return haystack.includes(normalized);
    });
  }, [filter, query, state.items, t]);

  const ongoingCount = countByStatus('ongoing', state.items);
  const upcomingCount = countByStatus('upcoming', state.items);
  const endedCount = countByStatus('ended', state.items);
  const filterCounts: Record<CompetitionFilter, number> = {
    all: state.items.length,
    ongoing: ongoingCount,
    upcoming: upcomingCount,
    ended: endedCount,
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
          <CompetitionsSkeleton />
        ) : (
          <>
            <View className="h-8 flex-row items-center gap-4" style={RTL_CONTAINER_STYLE}>
              <CreateBackButton onPress={() => router.navigate('/(tabs)')} />
              <Text className="text-base text-accent" style={{ fontFamily: cairo.semiBold, ...RTL_TEXT_STYLE }}>
                {t('competitions.title')}
              </Text>
            </View>

            <View className="flex-row items-center gap-2" style={RTL_CONTAINER_STYLE}>
              <CompetitionSearchField
                value={query}
                placeholder={t('competitions.search')}
                onChangeText={setQuery}
              />
              {state.items.length > 0 ? (
                <Pressable
                  accessibilityRole="button"
                  onPress={() => router.push(CREATE_ROUTES.addCompetition)}
                  className="h-[42px] flex-row items-center gap-2 rounded-[10px] bg-primary px-3"
                  style={RTL_CONTAINER_STYLE}>
                  <MaterialDesignIcons name="plus" size={16} color="#ffffff" />
                  <Text className="text-xs text-white" style={{ fontFamily: cairo.semiBold }}>
                    {t('competitions.add')}
                  </Text>
                </Pressable>
              ) : null}
            </View>

            <View className="flex-row gap-2" style={RTL_CONTAINER_STYLE}>
              <View
                className="h-[72px] flex-1 flex-row items-center gap-3 rounded-lg border border-slate-100 bg-white px-4"
                style={RTL_CONTAINER_STYLE}>
                <View className="size-9 items-center justify-center rounded-full bg-primary/10">
                  <MaterialDesignIcons name="clock-outline" size={16} color="#018A43" />
                </View>
                <View className="min-w-0 flex-1 items-start gap-1">
                  <Text className="text-[10px] text-slate-400" style={{ fontFamily: cairo.medium, ...RTL_TEXT_STYLE }}>
                    {t('competitions.stats.ongoing')}
                  </Text>
                  <Text className="text-sm text-primary" style={{ fontFamily: cairo.bold, ...RTL_TEXT_STYLE }}>
                    {ongoingCount}
                  </Text>
                </View>
              </View>
              <View
                className="h-[72px] flex-1 flex-row items-center gap-3 rounded-lg border border-slate-100 bg-white px-4"
                style={RTL_CONTAINER_STYLE}>
                <View className="size-9 items-center justify-center rounded-full bg-primary/10">
                  <MaterialDesignIcons name="account-group-outline" size={16} color="#018A43" />
                </View>
                <View className="min-w-0 flex-1 items-start gap-1">
                  <Text className="text-[10px] text-slate-400" style={{ fontFamily: cairo.medium, ...RTL_TEXT_STYLE }}>
                    {t('competitions.stats.monthlyParticipants')}
                  </Text>
                  <Text className="text-sm text-primary" style={{ fontFamily: cairo.bold, ...RTL_TEXT_STYLE }}>
                    {state.monthlyParticipantCount}
                  </Text>
                </View>
              </View>
            </View>

            <View className="flex-row gap-2" style={RTL_CONTAINER_STYLE}>
              {FILTERS.map((item) => {
                const selected = item === filter;

                return (
                  <Pressable
                    key={item}
                    accessibilityRole="button"
                    onPress={() => setFilter(item)}
                    className={`h-[41px] min-w-0 flex-1 flex-row items-center justify-center gap-1.5 rounded-lg px-1 ${
                      selected ? 'bg-primary/10' : 'bg-slate-50'
                    }`}
                    style={RTL_CONTAINER_STYLE}>
                    <Text
                      className={`text-[10px] ${selected ? 'text-primary' : 'text-slate-400'}`}
                      style={{ fontFamily: cairo.semiBold, ...RTL_TEXT_STYLE }}>
                      {t(`competitions.filters.${item}`)}
                    </Text>
                    <View
                      className={`h-[17px] min-w-[26px] items-center justify-center rounded-md px-1 ${
                        selected ? 'bg-primary' : 'bg-white'
                      }`}>
                      <Text
                        className={`text-[10px] ${selected ? 'text-white' : 'text-slate-400'}`}
                        style={{ fontFamily: cairo.medium }}>
                        {filterCounts[item]}
                      </Text>
                    </View>
                  </Pressable>
                );
              })}
            </View>

            {filteredItems.length === 0 ? (
              <CompetitionsEmptyState />
            ) : (
              <View className="gap-2">
                <Text className="text-xs text-accent" style={{ fontFamily: cairo.semiBold, ...RTL_TEXT_STYLE }}>
                  {t('competitions.latest')}
                </Text>
                {filteredItems.map((competition) => (
                  <CompetitionCard key={competition.id} competition={competition} />
                ))}
              </View>
            )}
          </>
        )}
      </ScrollView>
    </ScreenSafeAreaView>
  );
}
