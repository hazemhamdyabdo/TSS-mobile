import { Image } from 'expo-image';
import { useState } from 'react';
import { Pressable, ScrollView, Text, useWindowDimensions, View } from 'react-native';
import { useTranslation } from 'react-i18next';

import { cairo } from '@/theme/typography';

import type { ChampionshipBanner as ChampionshipBannerType } from '../types';

const bannerImage = require('@/assets/images/home/banner-fencers.jpg');
const discoverArrow = require('@/assets/images/home/icons/discover-arrow.png');

const BANNER_HEIGHT = 132;

type ChampionshipBannerProps = {
  banners: ChampionshipBannerType[];
};

export default function ChampionshipBanner({ banners }: ChampionshipBannerProps) {
  const { t } = useTranslation();
  const { width: windowWidth } = useWindowDimensions();
  const bannerWidth = windowWidth - 40;
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <View className="overflow-hidden rounded-lg" style={{ height: BANNER_HEIGHT }}>
      <ScrollView
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onMomentumScrollEnd={(event) => {
          const index = Math.round(event.nativeEvent.contentOffset.x / bannerWidth);
          setActiveIndex(index);
        }}>
        {banners.map((banner) => (
          <View key={banner.id} className="overflow-hidden rounded-lg" style={{ width: bannerWidth, height: BANNER_HEIGHT }}>
            <Image
              source={bannerImage}
              style={{ width: bannerWidth, height: BANNER_HEIGHT }}
              contentFit="cover"
            />
            <View
              pointerEvents="none"
              className="absolute inset-0 rounded-lg"
              style={{ backgroundColor: 'rgba(0, 0, 0, 0.4)' }}
            />

            <View className="absolute inset-0 items-start p-3">
              <View className="rounded-3xl bg-primary/50 px-3 py-1.5">
                <Text className="text-[10px] text-slate-50" style={{ fontFamily: cairo.medium }}>
                  {t(banner.categoryKey)}
                </Text>
              </View>

              <View className="mt-3 items-start gap-3">
                <Text className="text-sm text-slate-50" style={{ fontFamily: cairo.bold }}>
                  {t(banner.titleKey)}
                </Text>
                <View className="items-start gap-2">
                  <Text className="text-[10px] text-slate-200" style={{ fontFamily: cairo.medium }}>
                    {t(banner.eventTypeKey)}
                  </Text>
                  <View className="flex-row items-center gap-1">
                    <Text
                      className="text-[10px] text-slate-200"
                      style={{ fontFamily: cairo.medium }}>
                      {t(banner.dateKey)}
                    </Text>
                    <View className="size-0.5 rounded-full bg-slate-200" />
                    <Text
                      className="text-[10px] text-slate-200"
                      style={{ fontFamily: cairo.medium }}>
                      {t(banner.timeKey)}
                    </Text>
                  </View>
                  <Text className="text-[10px] text-slate-200" style={{ fontFamily: cairo.medium }}>
                    {t(banner.locationKey)}
                  </Text>
                </View>
              </View>
            </View>

            <Pressable
              accessibilityRole="button"
              className="absolute bottom-3 left-3 flex-row items-center gap-1 rounded-full bg-primary px-2.5 py-2"
              style={{ direction: 'ltr' }}>
              <Image
                source={discoverArrow}
                style={{ width: 13, height: 13 }}
                contentFit="contain"
              />
              <Text className="text-[10px] text-white" style={{ fontFamily: cairo.medium }}>
                {t('home.banner.discoverMore')}
              </Text>
            </Pressable>
          </View>
        ))}
      </ScrollView>

      <View className="absolute bottom-3 right-3 flex-row gap-0.5">
        {banners.map((banner, index) => {
          const isActive = index === activeIndex;
          return (
            <View
              key={banner.id}
              className={`h-[5px] rounded ${isActive ? 'w-[15px] bg-primary' : 'w-[5px]'}`}
              style={isActive ? undefined : { backgroundColor: 'rgba(255, 255, 255, 0.5)' }}
            />
          );
        })}
      </View>
    </View>
  );
}
