import { MaterialDesignIcons } from '@react-native-vector-icons/material-design-icons';
import { Image } from 'expo-image';
import { useTranslation } from 'react-i18next';
import { Pressable, Text, View } from 'react-native';

import {
  CornerFlag,
  ScoreBox,
} from '@/features/competitions/components/matchResultShared';
import { RTL_CONTAINER_STYLE, RTL_TEXT_STYLE } from '@/localization/direction';
import { colors } from '@/theme/colors';
import { cairo } from '@/theme/typography';

import { LIVE_BANNER_IMAGE } from '../constants/dummy';
import type { LiveMatch } from '../types';

type LiveMatchCardProps = {
  match: LiveMatch;
  onPress?: () => void;
};

export default function LiveMatchCard({ match, onPress }: LiveMatchCardProps) {
  const { t } = useTranslation();
  const startWins = match.startSide.score > match.endSide.score;
  const endWins = match.endSide.score > match.startSide.score;

  const content = (
    <View className="h-[223px] w-full">
      <View className="h-[156px] w-full overflow-hidden rounded-lg">
        <Image
          source={LIVE_BANNER_IMAGE}
          style={{ width: '100%', height: 156 }}
          contentFit="cover"
        />
      </View>

      <View className="absolute left-0 right-0 top-[78px] overflow-hidden rounded-lg border border-slate-100 bg-white pb-2">
        <CornerFlag nationality={match.startSide.nationality} edge="right" />
        <CornerFlag nationality={match.endSide.nationality} edge="left" />

        <View
          className="z-10 flex-row items-center justify-center gap-4 px-4 py-2"
          style={RTL_CONTAINER_STYLE}
        >
          <View className="max-w-[110px] items-center gap-2">
            <Text
              className="text-sm text-accent"
              numberOfLines={1}
              style={{ fontFamily: cairo.medium, ...RTL_TEXT_STYLE }}
            >
              {t(match.startSide.nameKey)}
            </Text>
            <Text
              className="text-xs text-slate-400"
              numberOfLines={1}
              style={{ fontFamily: cairo.regular, ...RTL_TEXT_STYLE }}
            >
              {t(`competitions.nationality.${match.startSide.nationality}`)}
            </Text>
          </View>

          <View
            className="flex-row items-center gap-2"
            style={RTL_CONTAINER_STYLE}
          >
            <ScoreBox score={match.startSide.score} winner={startWins} />
            <MaterialDesignIcons
              name="fencing"
              size={22}
              color={colors.primary}
            />
            <ScoreBox score={match.endSide.score} winner={endWins} />
          </View>

          <View className="max-w-[110px] items-center gap-2">
            <Text
              className="text-sm text-accent"
              numberOfLines={1}
              style={{ fontFamily: cairo.medium, ...RTL_TEXT_STYLE }}
            >
              {t(match.endSide.nameKey)}
            </Text>
            <Text
              className="text-xs text-slate-400"
              numberOfLines={1}
              style={{ fontFamily: cairo.regular, ...RTL_TEXT_STYLE }}
            >
              {t(`competitions.nationality.${match.endSide.nationality}`)}
            </Text>
          </View>
        </View>

        <View className="z-10 items-center gap-2">
          <Text
            className="text-[9px] text-primary"
            style={{ fontFamily: cairo.medium, ...RTL_TEXT_STYLE }}
          >
            {t(match.tournamentKey)}
          </Text>
          <View
            className="flex-row items-center gap-1"
            style={RTL_CONTAINER_STYLE}
          >
            <MaterialDesignIcons
              name="calendar-month-outline"
              size={10}
              color={colors.slate400}
            />
            <Text
              className="text-[10px] text-slate-400"
              style={{ fontFamily: cairo.medium }}
            >
              {t(match.dateKey)}
            </Text>
          </View>
          <View className="h-5 items-center justify-center rounded-3xl bg-pending-50 px-1.5">
            <Text
              className="text-[9px] text-pending"
              style={{ fontFamily: cairo.medium }}
            >
              {t(match.roundKey)}
            </Text>
          </View>
          <View
            className="h-5 flex-row items-center gap-1 rounded-3xl bg-primary/10 px-1.5"
            style={RTL_CONTAINER_STYLE}
          >
            <Text
              className="text-[9px] text-primary"
              style={{ fontFamily: cairo.medium }}
            >
              {t('live.status.ongoing')}
            </Text>
            <View className="size-1 rounded-full bg-rejected" />
          </View>
        </View>
      </View>
    </View>
  );

  if (!onPress) {
    return content;
  }

  return (
    <Pressable accessibilityRole="button" onPress={onPress}>
      {content}
    </Pressable>
  );
}
