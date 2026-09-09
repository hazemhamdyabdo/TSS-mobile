import { Image } from 'expo-image';
import { Text, View } from 'react-native';
import { useTranslation } from 'react-i18next';

import { RTL_CONTAINER_STYLE, RTL_TEXT_STYLE } from '@/localization/direction';
import { cairo } from '@/theme/typography';

import { clubLogoSource } from '../constants/clubLogos';
import type { BrowseClub } from '../types';

type ClubHeroCardProps = {
  club: BrowseClub;
};

export default function ClubHeroCard({ club }: ClubHeroCardProps) {
  const { t } = useTranslation();

  return (
    <View className="overflow-hidden rounded-[8px] border border-slate-100 bg-white px-4 py-3">
      <View className="absolute -top-[39px] size-[118px] rounded-full bg-primary" style={{ right: -20 }} />
      <View className="absolute -top-[18px] size-[90px] rounded-full bg-[#002411]/40" style={{ right: -8 }} />
      <View className="flex-row items-center gap-2.5" style={RTL_CONTAINER_STYLE}>
        <View className="size-[68px] items-center justify-center overflow-hidden rounded-full border-2 border-white bg-white">
          <Image
            source={clubLogoSource(club.logoId)}
            style={{ width: 44, height: 52 }}
            contentFit="contain"
          />
        </View>
        <View className="min-w-0 flex-1 items-start gap-2">
          <Text
            className="text-lg text-accent"
            style={{ fontFamily: cairo.medium, ...RTL_TEXT_STYLE }}
            numberOfLines={1}
          >
            {t(club.nameKey)}
          </Text>
          <Text
            className="text-sm text-primary"
            style={{ fontFamily: cairo.semiBold, ...RTL_TEXT_STYLE }}
          >
            {club.federationId}
          </Text>
        </View>
      </View>
    </View>
  );
}
