import { Image } from 'expo-image';
import { useRouter, type Href } from 'expo-router';
import { Pressable, Text, View } from 'react-native';
import { useTranslation } from 'react-i18next';

import { RTL_CONTAINER_STYLE, RTL_TEXT_STYLE } from '@/localization/direction';
import { cairo } from '@/theme/typography';

import type { Competition } from '../types';
import CompetitionStatusBadge, { CompetitionMetaItem } from './CompetitionStatusBadge';

const cardImage = require('@/assets/images/home/banner-fencers.jpg');

type CompetitionCardProps = {
  competition: Competition;
};

export default function CompetitionCard({ competition }: CompetitionCardProps) {
  const { t } = useTranslation();
  const router = useRouter();

  return (
    <Pressable
      accessibilityRole="button"
      onPress={() => router.push(`/competition/${competition.id}` as Href)}
      className="overflow-hidden rounded-lg border border-slate-100 bg-white p-[13px]"
      style={RTL_CONTAINER_STYLE}>
      <View className="flex-row items-center gap-3" style={RTL_CONTAINER_STYLE}>
        <View className="h-[77px] w-[124px] overflow-hidden rounded-lg">
          <Image source={cardImage} style={{ width: 124, height: 77 }} contentFit="cover" />
          <View className="absolute inset-0 bg-primary/40" />
          <View className="absolute bottom-1.5 items-center" style={{ right: 8 }}>
            <Text className="text-lg leading-5 text-white" style={{ fontFamily: cairo.bold }}>
              {competition.dateNumber}
            </Text>
          </View>
        </View>

        <View className="min-w-0 flex-1 gap-[6px]">
          <View className="flex-row items-center justify-between gap-2" style={RTL_CONTAINER_STYLE}>
            <Text
              className="min-w-0 flex-1 text-xs text-accent"
              numberOfLines={1}
              style={{ fontFamily: cairo.semiBold, ...RTL_TEXT_STYLE }}>
              {t(competition.titleKey)}
            </Text>
            <CompetitionStatusBadge status={competition.status} />
          </View>

          <View className="flex-row flex-wrap items-center justify-end gap-x-2 gap-y-1.5">
            <CompetitionMetaItem icon="map-marker-outline" label={t(competition.locationKey)} />
            <CompetitionMetaItem icon="fencing" label={t(competition.eventTypeKey)} />
            <CompetitionMetaItem icon="calendar-month-outline" label={t(competition.dateKey)} />
            <CompetitionMetaItem icon="clock-outline" label={t(competition.timeKey)} />
            <CompetitionMetaItem
              icon="account-group-outline"
              label={t('competitions.playerCount', { count: competition.playerCount })}
            />
          </View>
        </View>
      </View>
    </Pressable>
  );
}
