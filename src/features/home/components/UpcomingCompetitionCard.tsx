import { Image } from 'expo-image';
import { useTranslation } from 'react-i18next';
import { Pressable, Text, View } from 'react-native';
import { SvgXml } from 'react-native-svg';

import CompetitionStatusBadge from '@/features/competitions/components/CompetitionStatusBadge';
import { RTL_CONTAINER_STYLE, RTL_TEXT_STYLE } from '@/localization/direction';
import { cairo } from '@/theme/typography';

import {
  META_DATE_ICON_XML,
  META_LOCATION_ICON_XML,
  META_TIME_ICON_XML,
  META_WEAPON_ICON_XML,
} from '../constants/guestIcons';
import type { UpcomingCompetition } from '../types';

const CARD_IMAGE = require('@/assets/images/competation-1.jpg');

type UpcomingCompetitionCardProps = {
  competition: UpcomingCompetition;
  onPress?: () => void;
};

function MetaItem({
  label,
  iconXml,
  iconWidth = 10,
  iconHeight = 10,
}: {
  label: string;
  iconXml: string;
  iconWidth?: number;
  iconHeight?: number;
}) {
  return (
    <View className="flex-row items-center gap-1" style={RTL_CONTAINER_STYLE}>
      <Text
        className="text-[10px] capitalize text-slate-400"
        style={{ fontFamily: cairo.medium, ...RTL_TEXT_STYLE }}
        numberOfLines={1}>
        {label}
      </Text>
      <SvgXml xml={iconXml} width={iconWidth} height={iconHeight} />
    </View>
  );
}

export default function UpcomingCompetitionCard({
  competition,
  onPress,
}: UpcomingCompetitionCardProps) {
  const { t } = useTranslation();

  return (
    <Pressable
      accessibilityRole="button"
      onPress={onPress}
      className="w-full overflow-hidden rounded-lg border border-slate-100 bg-white p-2"
      style={RTL_CONTAINER_STYLE}>
      <View className="flex-row items-center gap-2" style={RTL_CONTAINER_STYLE}>
        <View className="h-[77px] w-[124px] overflow-hidden rounded-lg">
          <Image
            source={CARD_IMAGE}
            style={{ width: 124, height: 77 }}
            contentFit="cover"
          />
        </View>
        <View className="min-w-0 flex-1 gap-3">
          <View className="w-full flex-row items-center justify-between" style={RTL_CONTAINER_STYLE}>
            <Text
              className="min-w-0 flex-1 text-xs capitalize tracking-[0.1px] text-accent"
              style={{ fontFamily: cairo.medium, ...RTL_TEXT_STYLE }}
              numberOfLines={1}>
              {t(competition.titleKey)}
            </Text>
            <CompetitionStatusBadge status={competition.status} />
          </View>
          <View className="flex-row flex-wrap gap-x-2 gap-y-3" style={RTL_CONTAINER_STYLE}>
            <MetaItem label={t(competition.eventTypeKey)} iconXml={META_WEAPON_ICON_XML} />
            <MetaItem label={t(competition.locationKey)} iconXml={META_LOCATION_ICON_XML} />
            <MetaItem
              label={t(competition.timeKey)}
              iconXml={META_TIME_ICON_XML}
              iconHeight={9}
            />
            <MetaItem label={t(competition.dateKey)} iconXml={META_DATE_ICON_XML} />
          </View>
        </View>
      </View>
    </Pressable>
  );
}
