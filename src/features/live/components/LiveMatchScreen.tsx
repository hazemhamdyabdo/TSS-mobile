import { MaterialDesignIcons } from '@react-native-vector-icons/material-design-icons';
import { useLocalSearchParams } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { ScrollView, Text, View } from 'react-native';

import ScreenSafeAreaView from '@/components/ScreenSafeAreaView';
import CreateBackButton from '@/features/create/components/CreateBackButton';
import NationalityFlag from '@/features/competitions/components/NationalityFlag';
import type { MatchSide, MatchStat } from '@/features/competitions/types';
import { RTL_CONTAINER_STYLE, RTL_TEXT_STYLE } from '@/localization/direction';
import { colors } from '@/theme/colors';
import { cairo } from '@/theme/typography';

import { getLiveMatchById } from '../constants/dummy';
import type { LiveMatch, LiveMatchTab } from '../types';
import LiveMatchCard from './LiveMatchCard';
import LiveSegmentedTabs from './LiveSegmentedTabs';
import LiveVideoPlayer from './LiveVideoPlayer';

type InfoIcon = 'fencing' | 'stairs' | 'clock-outline';

type InfoRow = {
  icon: InfoIcon;
  labelKey: string;
  value: string;
};

function LiveHeader({ title }: { title: string }) {
  const { t } = useTranslation();

  return (
    <View
      className="w-full flex-row items-center gap-4 px-5 py-3"
      style={RTL_CONTAINER_STYLE}
    >
      <CreateBackButton />
      <View
        className="min-w-0 flex-1 flex-row items-center gap-2"
        style={RTL_CONTAINER_STYLE}
      >
        <View
          className="h-5 flex-row items-center gap-1 rounded-3xl bg-primary/10 px-1.5"
          style={RTL_CONTAINER_STYLE}
        >
          <Text
            className="text-[9px] text-primary"
            style={{ fontFamily: cairo.medium }}
          >
            {t('live.badge')}
          </Text>
          <View className="size-1 rounded-full bg-rejected" />
        </View>
        <Text
          className="min-w-0 flex-1 capitalize leading-[1.6] text-accent"
          numberOfLines={1}
          style={{ fontFamily: cairo.semiBold, ...RTL_TEXT_STYLE }}
        >
          {title}
        </Text>
      </View>
    </View>
  );
}

function DetailRow({ icon, labelKey, value }: InfoRow) {
  const { t } = useTranslation();

  return (
    <View
      className="h-11 flex-row items-center justify-between rounded-lg bg-background px-3"
      style={RTL_CONTAINER_STYLE}
    >
      <View
        className="min-w-0 flex-1 flex-row items-center gap-2"
        style={RTL_CONTAINER_STYLE}
      >
        <View className="size-6 items-center justify-center rounded-md bg-primary/10">
          <MaterialDesignIcons name={icon} size={14} color={colors.primary} />
        </View>
        <Text
          className="text-xs text-accent"
          style={{ fontFamily: cairo.medium, ...RTL_TEXT_STYLE }}
        >
          {t(labelKey)}
        </Text>
      </View>
      <Text
        className="text-xs text-slate-500"
        style={{ fontFamily: cairo.regular, ...RTL_TEXT_STYLE }}
      >
        {value}
      </Text>
    </View>
  );
}

function PeriodCell({
  value,
  highlight,
}: {
  value: number;
  highlight: boolean;
}) {
  return (
    <View
      className={`size-7 items-center justify-center rounded-[5px] ${
        highlight ? 'bg-primary/10' : 'bg-slate-100'
      }`}
    >
      <Text
        className={`text-xs ${highlight ? 'text-primary' : 'text-slate-500'}`}
        style={{ fontFamily: cairo.medium }}
      >
        {value}
      </Text>
    </View>
  );
}

function PlayerIdentity({ side }: { side: MatchSide }) {
  const { t } = useTranslation();

  return (
    <View className="flex-row items-center gap-2" style={RTL_CONTAINER_STYLE}>
      <NationalityFlag nationality={side.nationality} />
      <View className="gap-0">
        <Text
          className="text-xs text-accent"
          numberOfLines={1}
          style={{ fontFamily: cairo.medium, ...RTL_TEXT_STYLE }}
        >
          {t(side.nameKey)}
        </Text>
        <Text
          className="text-xs text-slate-400"
          numberOfLines={1}
          style={{ fontFamily: cairo.regular, ...RTL_TEXT_STYLE }}
        >
          {t(`competitions.nationality.${side.nationality}`)}
        </Text>
      </View>
    </View>
  );
}

function PeriodsTable({ match }: { match: LiveMatch }) {
  const { t } = useTranslation();
  const startTotal = match.startPeriods.reduce((sum, value) => sum + value, 0);
  const endTotal = match.endPeriods.reduce((sum, value) => sum + value, 0);
  const startWins = startTotal > endTotal;
  const endWins = endTotal > startTotal;
  const periodCount = Math.min(
    match.startPeriods.length,
    match.endPeriods.length,
  );

  const scoreColumns = [
    ...Array.from({ length: periodCount }, (_, index) => ({
      key: `period-${index}`,
      label: t('competitions.matchDetails.periods.round', {
        number: index + 1,
      }),
      startValue: match.startPeriods[index] ?? 0,
      endValue: match.endPeriods[index] ?? 0,
      startHighlight:
        (match.startPeriods[index] ?? 0) > (match.endPeriods[index] ?? 0),
      endHighlight:
        (match.endPeriods[index] ?? 0) > (match.startPeriods[index] ?? 0),
    })),
    {
      key: 'result',
      label: t('competitions.matchDetails.periods.result'),
      startValue: startTotal,
      endValue: endTotal,
      startHighlight: startWins,
      endHighlight: endWins,
    },
  ];

  return (
    <View className="rounded-lg bg-white p-3">
      <View
        className="w-full flex-row items-start justify-between gap-4"
        style={RTL_CONTAINER_STYLE}
      >
        <View className="gap-4">
          <Text
            className="text-xs text-slate-400"
            style={{ fontFamily: cairo.regular, ...RTL_TEXT_STYLE }}
          >
            {t('competitions.matchDetails.periods.name')}
          </Text>
          <PlayerIdentity side={match.startSide} />
          <PlayerIdentity side={match.endSide} />
        </View>

        <View
          className="flex-row items-start gap-[9px]"
          style={RTL_CONTAINER_STYLE}
        >
          {scoreColumns.map((column) => (
            <View key={column.key} className="items-center gap-4">
              <Text
                className="text-[10px] text-slate-400"
                style={{ fontFamily: cairo.regular, ...RTL_TEXT_STYLE }}
              >
                {column.label}
              </Text>
              <PeriodCell
                value={column.startValue}
                highlight={column.startHighlight}
              />
              <PeriodCell
                value={column.endValue}
                highlight={column.endHighlight}
              />
            </View>
          ))}
        </View>
      </View>
    </View>
  );
}

function StatBar({
  value,
  max,
  color,
}: {
  value: number;
  max: number;
  color: string;
}) {
  const width = max <= 0 ? 0 : Math.max(6, Math.round((value / max) * 90));

  return (
    <View className="h-1.5 w-[90px] overflow-hidden rounded-xl bg-slate-100">
      <View
        style={{
          height: 6,
          width,
          borderRadius: 12,
          backgroundColor: color,
        }}
      />
    </View>
  );
}

function StatsSection({
  match,
  stats,
}: {
  match: LiveMatch;
  stats: MatchStat[];
}) {
  const { t } = useTranslation();

  return (
    <View className="gap-3 rounded-lg bg-white p-3">
      <View
        className="flex-row items-center justify-between"
        style={RTL_CONTAINER_STYLE}
      >
        <View
          className="flex-row items-center gap-2"
          style={RTL_CONTAINER_STYLE}
        >
          <NationalityFlag nationality={match.startSide.nationality} />
          <Text
            className="text-xs text-accent"
            numberOfLines={1}
            style={{ fontFamily: cairo.medium, ...RTL_TEXT_STYLE }}
          >
            {t(match.startSide.nameKey)}
          </Text>
        </View>
        <View
          className="flex-row items-center gap-2"
          style={RTL_CONTAINER_STYLE}
        >
          <Text
            className="text-xs text-accent"
            numberOfLines={1}
            style={{ fontFamily: cairo.medium, ...RTL_TEXT_STYLE }}
          >
            {t(match.endSide.nameKey)}
          </Text>
          <NationalityFlag nationality={match.endSide.nationality} />
        </View>
      </View>

      {stats.map((stat) => {
        const max = Math.max(stat.startValue, stat.endValue, 1);
        return (
          <View
            key={stat.id}
            className="h-6 flex-row items-center justify-between"
            style={RTL_CONTAINER_STYLE}
          >
            <View
              className="flex-row items-center gap-[11px]"
              style={RTL_CONTAINER_STYLE}
            >
              <StatBar
                value={stat.startValue}
                max={max}
                color={colors.primary}
              />
              <Text
                className="text-xs text-primary"
                style={{ fontFamily: cairo.regular }}
              >
                {stat.startValue}
              </Text>
            </View>
            <Text
              className="text-[10px] text-accent"
              style={{ fontFamily: cairo.medium, ...RTL_TEXT_STYLE }}
            >
              {t(stat.labelKey)}
            </Text>
            <View
              className="flex-row items-center gap-[11px]"
              style={RTL_CONTAINER_STYLE}
            >
              <Text
                className="text-xs"
                style={{ fontFamily: cairo.regular, color: colors.opponent }}
              >
                {stat.endValue}
              </Text>
              <StatBar
                value={stat.endValue}
                max={max}
                color={colors.opponent}
              />
            </View>
          </View>
        );
      })}
    </View>
  );
}

function DetailsTab({ match }: { match: LiveMatch }) {
  const { t } = useTranslation();

  const infoRows: InfoRow[] = [
    {
      icon: 'fencing',
      labelKey: 'competitions.matchDetails.fields.weapon',
      value: t(match.weaponKey),
    },
    {
      icon: 'stairs',
      labelKey: 'competitions.matchDetails.fields.round',
      value: t(match.roundKey),
    },
    {
      icon: 'clock-outline',
      labelKey: 'competitions.matchDetails.fields.duration',
      value: t('competitions.matchDetails.durationMinutes', {
        count: match.durationMinutes,
      }),
    },
  ];

  return (
    <View className="gap-4">
      <View className="gap-2 rounded-lg border border-slate-100 bg-white p-3">
        {infoRows.map((row) => (
          <DetailRow key={row.labelKey} {...row} />
        ))}
      </View>
      <PeriodsTable match={match} />
    </View>
  );
}

function tabContent(tab: LiveMatchTab, match: LiveMatch) {
  switch (tab) {
    case 'broadcast':
      return <LiveVideoPlayer viewerCount={match.viewerCount} />;
    case 'details':
      return <DetailsTab match={match} />;
    case 'stats':
      return <StatsSection match={match} stats={match.stats} />;
    default: {
      const exhaustive: never = tab;
      return exhaustive;
    }
  }
}

export default function LiveMatchScreen() {
  const { t } = useTranslation();
  const rawId = useLocalSearchParams<{ id: string | string[] }>().id;
  const id = Array.isArray(rawId) ? rawId[0] : rawId;
  const [tab, setTab] = useState<LiveMatchTab>('broadcast');

  const match = useMemo(
    () => (id ? getLiveMatchById(id) : undefined),
    [id],
  );

  if (!match) {
    return (
      <ScreenSafeAreaView
        className="flex-1 bg-background"
        edges={['top', 'bottom']}
        style={RTL_CONTAINER_STYLE}
      >
        <StatusBar style="auto" />
        <LiveHeader title={t('live.title')} />
        <View className="flex-1 items-center justify-center px-5">
          <Text
            className="text-sm text-slate-400"
            style={{ fontFamily: cairo.medium, ...RTL_TEXT_STYLE }}
          >
            {t('live.notFound')}
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
      <LiveHeader title={t(match.tournamentKey)} />
      <ScrollView
        className="flex-1"
        contentContainerClassName="gap-4 px-5 pb-8"
        showsVerticalScrollIndicator={false}
      >
        <LiveMatchCard match={match} />
        <LiveSegmentedTabs value={tab} onChange={setTab} />
        {tabContent(tab, match)}
      </ScrollView>
    </ScreenSafeAreaView>
  );
}
