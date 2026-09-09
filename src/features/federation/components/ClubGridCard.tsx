import { Image } from 'expo-image';
import { Pressable, Text, View } from 'react-native';
import { useTranslation } from 'react-i18next';

import { RTL_TEXT_STYLE } from '@/localization/direction';
import { cairo } from '@/theme/typography';

import { clubLogoSource } from '../constants/clubLogos';
import type { BrowseClub } from '../types';

type ClubGridCardProps = {
  club: BrowseClub;
  onPress: () => void;
};

export default function ClubGridCard({ club, onPress }: ClubGridCardProps) {
  const { t } = useTranslation();

  return (
    <Pressable
      accessibilityRole="button"
      onPress={onPress}
      className="aspect-square flex-1 items-center justify-center gap-3 overflow-hidden rounded-[11px] border border-slate-100 bg-white px-3 py-5"
    >
      <View className="h-[54px] w-[48px] items-center justify-center">
        <Image
          source={clubLogoSource(club.logoId)}
          style={{ width: 48, height: 54 }}
          contentFit="contain"
        />
      </View>
      <Text
        className="text-center text-sm text-accent"
        style={{ fontFamily: cairo.semiBold, ...RTL_TEXT_STYLE }}
        numberOfLines={2}
      >
        {t(club.nameKey)}
      </Text>
    </Pressable>
  );
}
