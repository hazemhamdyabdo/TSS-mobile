import { MaterialDesignIcons } from '@react-native-vector-icons/material-design-icons';
import { Image } from 'expo-image';
import { Text, View } from 'react-native';
import { useTranslation } from 'react-i18next';

import { RTL_CONTAINER_STYLE, RTL_TEXT_STYLE } from '@/localization/direction';
import { colors } from '@/theme/colors';
import { cairo } from '@/theme/typography';

import { COMPETITOR_PHOTOS } from '../constants/competitorPhotos';
import type { MatchResult, MatchSide, NationalityCode } from '../types';

const saFlag = require('@/assets/images/ksa-flag.png');
const qaFlag = require('@/assets/images/qatr-flag.png');

type MatchResultCardProps = {
  result: MatchResult;
};

function flagFor(code: NationalityCode) {
  switch (code) {
    case 'sa':
      return saFlag;
    case 'qa':
      return qaFlag;
    default: {
      const exhaustive: never = code;
      throw new Error(`Unhandled nationality: ${exhaustive}`);
    }
  }
}

function SideBlock({ side, align }: { side: MatchSide; align: 'start' | 'end' }) {
  const { t } = useTranslation();
  const isStart = align === 'start';

  return (
    <View className={`min-w-0 flex-1 ${isStart ? 'items-start' : 'items-end'}`}>
      <View className="flex-row items-center gap-1.5" style={isStart ? RTL_CONTAINER_STYLE : undefined}>
        <View className="size-10 overflow-hidden rounded-full bg-slate-100">
          <Image
            source={COMPETITOR_PHOTOS[side.photoId]}
            style={{ width: 40, height: 40 }}
            contentFit="cover"
          />
        </View>
        <View className={isStart ? 'items-start' : 'items-end'}>
          <Text className="text-xs text-accent" style={{ fontFamily: cairo.semiBold, ...RTL_TEXT_STYLE }}>
            {t(side.nameKey)}
          </Text>
          <View className="flex-row items-center gap-1" style={isStart ? RTL_CONTAINER_STYLE : undefined}>
            <View className="size-3.5 overflow-hidden rounded-sm">
              <Image source={flagFor(side.nationality)} style={{ width: 14, height: 14 }} contentFit="cover" />
            </View>
            <Text className="text-[10px] text-slate-400" style={{ fontFamily: cairo.regular, ...RTL_TEXT_STYLE }}>
              {t(`competitions.nationality.${side.nationality}`)}
            </Text>
          </View>
        </View>
      </View>
    </View>
  );
}

function ScoreBox({ score, winner }: { score: number; winner: boolean }) {
  return (
    <View className={`h-8 w-8 items-center justify-center rounded-md ${winner ? 'bg-primary' : 'bg-slate-100'}`}>
      <Text className={`text-xs ${winner ? 'text-white' : 'text-label'}`} style={{ fontFamily: cairo.semiBold }}>
        {score}
      </Text>
    </View>
  );
}

export default function MatchResultCard({ result }: MatchResultCardProps) {
  const { t } = useTranslation();
  const startWins = result.startSide.score > result.endSide.score;

  return (
    <View className="overflow-hidden rounded-lg border border-slate-100 bg-white p-3">
      <View className="flex-row items-center gap-2" style={RTL_CONTAINER_STYLE}>
        <SideBlock side={result.startSide} align="start" />
        <View className="flex-row items-center gap-1.5" style={RTL_CONTAINER_STYLE}>
          <ScoreBox score={result.startSide.score} winner={startWins} />
          <MaterialDesignIcons name="fencing" size={18} color={colors.secText} />
          <ScoreBox score={result.endSide.score} winner={!startWins} />
        </View>
        <SideBlock side={result.endSide} align="end" />
      </View>
      <View className="mt-3 items-center gap-1.5">
        <View className="rounded-3xl bg-slate-50 px-2 py-1">
          <Text className="text-[10px] text-slate-400" style={{ fontFamily: cairo.medium }}>
            {t(result.roundKey)}
          </Text>
        </View>
        <View className="flex-row items-center gap-3">
          <View className="flex-row items-center gap-1">
            <Text className="text-[10px] text-slate-400" style={{ fontFamily: cairo.medium }}>
              {t(result.dateKey)}
            </Text>
            <MaterialDesignIcons name="calendar-month-outline" size={10} color={colors.secText} />
          </View>
          <View className="flex-row items-center gap-1">
            <Text className="text-[10px] text-slate-400" style={{ fontFamily: cairo.medium }}>
              {t(result.timeKey)}
            </Text>
            <MaterialDesignIcons name="clock-outline" size={10} color={colors.secText} />
          </View>
        </View>
      </View>
    </View>
  );
}
