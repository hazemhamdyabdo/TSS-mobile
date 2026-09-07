import { useRouter } from 'expo-router';
import { useTranslation } from 'react-i18next';
import { Pressable, Text, View } from 'react-native';

import { RTL_CONTAINER_STYLE, RTL_TEXT_STYLE } from '@/localization/direction';
import { cairo } from '@/theme/typography';

import type { UpcomingCompetition } from '../types';
import UpcomingCompetitionCard from './UpcomingCompetitionCard';

type UpcomingCompetitionsSectionProps = {
  competitions: UpcomingCompetition[];
};

export default function UpcomingCompetitionsSection({
  competitions,
}: UpcomingCompetitionsSectionProps) {
  const { t } = useTranslation();
  const router = useRouter();

  return (
    <View className="w-full gap-4" style={RTL_CONTAINER_STYLE}>
      <View className="w-full flex-row items-center justify-between" style={RTL_CONTAINER_STYLE}>
        <Text
          className="text-sm capitalize text-label"
          style={{ fontFamily: cairo.semiBold, ...RTL_TEXT_STYLE }}>
          {t('home.guest.upcoming.title')}
        </Text>
        <Pressable
          accessibilityRole="button"
          onPress={() => router.push('/(tabs)/competitions')}>
          <Text
            className="text-[10px] capitalize text-primary"
            style={{ fontFamily: cairo.semiBold }}>
            {t('home.viewAll')}
          </Text>
        </Pressable>
      </View>

      <View className="w-full gap-2">
        {competitions.map((competition) => (
          <UpcomingCompetitionCard
            key={competition.id}
            competition={competition}
            onPress={() => router.push('/(tabs)/competitions')}
          />
        ))}
      </View>
    </View>
  );
}
