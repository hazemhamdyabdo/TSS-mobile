import { Image } from 'expo-image';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import {
  Pressable,
  ScrollView,
  Text,
  View,
  type NativeScrollEvent,
  type NativeSyntheticEvent,
} from 'react-native';
import Svg, { Defs, LinearGradient, Rect, Stop } from 'react-native-svg';

import { RTL_CONTAINER_STYLE, RTL_TEXT_STYLE } from '@/localization/direction';
import { cairo } from '@/theme/typography';

import { newsImageSource } from '../constants/images';
import type { NewsHeroSlide } from '../types';

const HERO_HEIGHT = 132;

type NewsHeroCarouselProps = {
  slides: NewsHeroSlide[];
  onPressSlide: (slide: NewsHeroSlide) => void;
};

export default function NewsHeroCarousel({
  slides,
  onPressSlide,
}: NewsHeroCarouselProps) {
  const { t } = useTranslation();
  const [width, setWidth] = useState(0);
  const [activeIndex, setActiveIndex] = useState(0);

  const syncActiveIndex = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const pageWidth = event.nativeEvent.layoutMeasurement.width;
    if (pageWidth <= 0) {
      return;
    }
    const nextIndex = Math.round(event.nativeEvent.contentOffset.x / pageWidth);
    const clamped = Math.min(Math.max(nextIndex, 0), slides.length - 1);
    setActiveIndex((current) => (current === clamped ? current : clamped));
  };

  return (
    <View
      className="w-full overflow-hidden rounded-lg"
      style={{ height: HERO_HEIGHT }}
      onLayout={(event) => {
        const nextWidth = Math.round(event.nativeEvent.layout.width);
        if (nextWidth > 0 && nextWidth !== width) {
          setWidth(nextWidth);
        }
      }}
    >
      <ScrollView
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onMomentumScrollEnd={syncActiveIndex}
        onScrollEndDrag={syncActiveIndex}
      >
        {slides.map((slide) => (
          <Pressable
            key={slide.id}
            accessibilityRole="button"
            onPress={() => onPressSlide(slide)}
            style={{ width: width || 1, height: HERO_HEIGHT }}
            className="overflow-hidden rounded-lg p-3"
          >
            <Image
              source={newsImageSource(slide.imageId)}
              style={{
                position: 'absolute',
                top: 0,
                right: 0,
                bottom: 0,
                left: 0,
              }}
              contentFit="cover"
            />
            {width > 0 ? (
              <Svg
                pointerEvents="none"
                width={width}
                height={HERO_HEIGHT}
                style={{ position: 'absolute', top: 0, left: 0 }}
              >
                <Defs>
                  <LinearGradient
                    id={`news-hero-${slide.id}`}
                    x1="1"
                    y1="0.5"
                    x2="0"
                    y2="0.5"
                  >
                    <Stop offset="0.16" stopColor="#000000" stopOpacity={0.5} />
                    <Stop offset="0.99" stopColor="#666666" stopOpacity={0} />
                  </LinearGradient>
                </Defs>
                <Rect
                  width={width}
                  height={HERO_HEIGHT}
                  fill={`url(#news-hero-${slide.id})`}
                  rx={8}
                />
              </Svg>
            ) : null}
            <View className="flex-1 items-start justify-between">
              <View className="rounded-3xl bg-primary/50 px-3 py-1.5">
                <Text
                  className="text-[10px] text-slate-50"
                  style={{ fontFamily: cairo.medium, ...RTL_TEXT_STYLE }}
                >
                  {t(`news.categories.${slide.category}`)}
                </Text>
              </View>
              <View className="items-start gap-2">
                <Text
                  className="text-sm text-slate-50"
                  style={{ fontFamily: cairo.bold, ...RTL_TEXT_STYLE }}
                >
                  {t(slide.titleKey)}
                </Text>
                <Text
                  className="text-[10px] text-slate-200"
                  style={{ fontFamily: cairo.medium, ...RTL_TEXT_STYLE }}
                >
                  {t(slide.eventTypeKey)}
                </Text>
                <View
                  className="flex-row items-center gap-1"
                  style={RTL_CONTAINER_STYLE}
                >
                  <Text
                    className="text-[10px] text-slate-200"
                    style={{ fontFamily: cairo.medium }}
                  >
                    {t(slide.timeKey)}
                  </Text>
                  <View className="size-0.5 rounded-full bg-slate-200" />
                  <Text
                    className="text-[10px] text-slate-200"
                    style={{ fontFamily: cairo.medium }}
                  >
                    {t(slide.dateKey)}
                  </Text>
                </View>
                <Text
                  className="text-[10px] text-slate-200"
                  style={{ fontFamily: cairo.medium, ...RTL_TEXT_STYLE }}
                >
                  {t(slide.locationKey)}
                </Text>
              </View>
            </View>
          </Pressable>
        ))}
      </ScrollView>

      <View
        className="absolute bottom-3 flex-row items-center gap-0.5"
        style={{ left: 12, ...RTL_CONTAINER_STYLE }}
      >
        {slides.map((slide, index) => {
          const active = index === activeIndex;
          return (
            <View
              key={slide.id}
              className={`h-[5px] rounded ${
                active ? 'w-[15px] bg-primary' : 'w-[5px] bg-white/50'
              }`}
            />
          );
        })}
      </View>
    </View>
  );
}
