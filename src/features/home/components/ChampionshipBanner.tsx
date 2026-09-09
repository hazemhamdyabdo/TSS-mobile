import { Image } from "expo-image";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import {
  Pressable,
  ScrollView,
  Text,
  useWindowDimensions,
  View,
  type NativeSyntheticEvent,
  type NativeScrollEvent,
} from "react-native";
import Svg, { Defs, LinearGradient, Rect, Stop } from "react-native-svg";

import {
  RTL_CONTAINER_STYLE,
  RTL_TEXT_STYLE,
} from "@/localization/direction";
import { cairo } from "@/theme/typography";

import type { ChampionshipBanner as ChampionshipBannerType } from "../types";

const bannerImage = require("@/assets/images/home/banner-fencers.jpg");
const discoverArrow = require("@/assets/images/home/icons/discover-arrow.png");

const BANNER_HEIGHT = 132;
const SCREEN_GUTTER = 40;

type ChampionshipBannerProps = {
  banners: ChampionshipBannerType[];
  onDiscoverPress: () => void;
  /** When set, tapping the banner surface (not only Discover) uses this. */
  onBannerPress?: () => void;
};

function BannerGradient({
  id,
  width,
  height,
}: {
  id: string;
  width: number;
  height: number;
}) {
  return (
    <Svg
      pointerEvents="none"
      width={width}
      height={height}
      style={{ position: "absolute", top: 0, left: 0 }}
    >
      <Defs>
        <LinearGradient id={id} x1="1" y1="0.5" x2="0" y2="0.5">
          <Stop offset="0.16" stopColor="#000000" stopOpacity={0.5} />
          <Stop offset="0.99" stopColor="#666666" stopOpacity={0} />
        </LinearGradient>
      </Defs>
      <Rect width={width} height={height} fill={`url(#${id})`} rx={8} />
    </Svg>
  );
}

export default function ChampionshipBanner({
  banners,
  onDiscoverPress,
  onBannerPress,
}: ChampionshipBannerProps) {
  const { t } = useTranslation();
  const { width: windowWidth } = useWindowDimensions();
  const [bannerWidth, setBannerWidth] = useState(windowWidth - SCREEN_GUTTER);
  const [activeIndex, setActiveIndex] = useState(0);
  const handleBannerPress = onBannerPress ?? onDiscoverPress;

  const syncActiveIndex = (
    event: NativeSyntheticEvent<NativeScrollEvent>,
  ) => {
    const pageWidth = event.nativeEvent.layoutMeasurement.width;
    if (pageWidth <= 0) {
      return;
    }

    const nextIndex = Math.round(
      event.nativeEvent.contentOffset.x / pageWidth,
    );
    const clamped = Math.min(Math.max(nextIndex, 0), banners.length - 1);
    setActiveIndex((current) => (current === clamped ? current : clamped));
  };

  return (
    <View
      className="overflow-hidden rounded-lg"
      style={{ height: BANNER_HEIGHT }}
      onLayout={(event) => {
        const width = Math.round(event.nativeEvent.layout.width);
        if (width > 0 && width !== bannerWidth) {
          setBannerWidth(width);
        }
      }}
    >
      <ScrollView
        horizontal
        nestedScrollEnabled
        directionalLockEnabled
        bounces={false}
        overScrollMode="never"
        showsHorizontalScrollIndicator={false}
        decelerationRate="fast"
        snapToInterval={bannerWidth}
        snapToAlignment="start"
        disableIntervalMomentum
        onMomentumScrollEnd={syncActiveIndex}
        onScrollEndDrag={syncActiveIndex}
      >
        {banners.map((banner) => (
          <Pressable
            key={banner.id}
            accessibilityRole="button"
            onPress={handleBannerPress}
            className="overflow-hidden rounded-lg"
            style={{ width: bannerWidth, height: BANNER_HEIGHT }}
          >
            <Image
              source={bannerImage}
              style={{ width: bannerWidth, height: BANNER_HEIGHT }}
              contentFit="cover"
            />
            <BannerGradient
              id={`banner-fade-${banner.id}`}
              width={bannerWidth}
              height={BANNER_HEIGHT}
            />

            <View
              className="absolute inset-0 items-start gap-3 p-3 pb-10"
              style={RTL_CONTAINER_STYLE}
              pointerEvents="box-none"
            >
              <View className="rounded-3xl bg-primary/50 px-3 py-1.5">
                <Text
                  className="text-[10px] text-slate-50"
                  style={{ fontFamily: cairo.medium, ...RTL_TEXT_STYLE }}
                >
                  {t(banner.categoryKey)}
                </Text>
              </View>

              <View className="items-start gap-3" style={RTL_CONTAINER_STYLE}>
                <Text
                  className="text-sm text-slate-50"
                  style={{ fontFamily: cairo.bold, ...RTL_TEXT_STYLE }}
                >
                  {t(banner.titleKey)}
                </Text>
                <View className="items-start gap-2" style={RTL_CONTAINER_STYLE}>
                  <Text
                    className="text-[10px] text-slate-200"
                    style={{ fontFamily: cairo.medium, ...RTL_TEXT_STYLE }}
                  >
                    {t(banner.eventTypeKey)}
                  </Text>
                  <View
                    className="flex-row items-center gap-1"
                    style={RTL_CONTAINER_STYLE}
                  >
                    <Text
                      className="text-[10px] text-slate-200"
                      style={{ fontFamily: cairo.medium, ...RTL_TEXT_STYLE }}
                    >
                      {t(banner.dateKey)}
                    </Text>
                    <View className="size-0.5 rounded-full bg-slate-200" />
                    <Text
                      className="text-[10px] text-slate-200"
                      style={{ fontFamily: cairo.medium, ...RTL_TEXT_STYLE }}
                    >
                      {t(banner.timeKey)}
                    </Text>
                  </View>
                  <Text
                    className="max-w-[70%] text-[10px] text-slate-200"
                    numberOfLines={1}
                    style={{ fontFamily: cairo.medium, ...RTL_TEXT_STYLE }}
                  >
                    {t(banner.locationKey)}
                  </Text>
                </View>
              </View>
            </View>

            <Pressable
              accessibilityRole="button"
              onPress={handleBannerPress}
              className="absolute bottom-3 left-3 flex-row items-center gap-1 rounded-full bg-primary px-2.5 py-2"
              style={{ direction: "ltr" }}
            >
              <Image
                source={discoverArrow}
                style={{ width: 13, height: 13 }}
                contentFit="contain"
              />
              <Text
                className="text-[10px] text-white"
                style={{ fontFamily: cairo.medium }}
              >
                {t("home.banner.discoverMore")}
              </Text>
            </Pressable>
          </Pressable>
        ))}
      </ScrollView>

      <View
        className="absolute bottom-3 right-3 flex-row gap-0.5"
        style={RTL_CONTAINER_STYLE}
      >
        {banners.map((banner, index) => {
          const isActive = index === activeIndex;
          return (
            <View
              key={banner.id}
              className={`h-[5px] rounded ${isActive ? "w-[15px] bg-primary" : "w-[5px]"}`}
              style={
                isActive
                  ? undefined
                  : { backgroundColor: "rgba(255, 255, 255, 0.5)" }
              }
            />
          );
        })}
      </View>
    </View>
  );
}
