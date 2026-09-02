import { Image } from 'expo-image';
import { Text, View } from 'react-native';
import { useTranslation } from 'react-i18next';

import { RTL_TEXT_STYLE } from '@/localization/direction';
import { cairo } from '@/theme/typography';

import type { Competition } from '../types';
import { getCompetitionCategory, getCompetitionMonth, getCompetitionName } from '../utils/labels';

const heroImage = require('@/assets/images/home/banner-fencers.jpg');

type CompetitionHeroProps = {
  competition: Competition;
};

export default function CompetitionHero({ competition }: CompetitionHeroProps) {
  const { t } = useTranslation();

  return (
    <View className="h-[156px] w-full overflow-hidden rounded-lg">
      <Image source={heroImage} style={{ width: '100%', height: 156 }} contentFit="cover" />
      <View className="absolute inset-0 bg-black/35" />
      <View className="absolute inset-0 items-start justify-between p-4">
        <View className="items-start gap-1">
          <Text className="text-lg text-white" style={{ fontFamily: cairo.bold, ...RTL_TEXT_STYLE }}>
            {getCompetitionName(competition, t)}
          </Text>
          <Text className="text-sm text-white" style={{ fontFamily: cairo.medium, ...RTL_TEXT_STYLE }}>
            {getCompetitionCategory(competition, t)}
          </Text>
        </View>
        <View className="items-center rounded-md bg-primary px-3 py-1.5">
          <Text className="text-xl leading-6 text-white" style={{ fontFamily: cairo.bold }}>
            {competition.dateNumber}
          </Text>
          <Text className="text-[10px] text-white" style={{ fontFamily: cairo.medium }}>
            {getCompetitionMonth(competition, t)}
          </Text>
        </View>
      </View>
    </View>
  );
}
