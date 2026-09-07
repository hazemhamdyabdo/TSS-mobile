import { Image } from "expo-image";
import { useTranslation } from "react-i18next";
import { Text, View } from "react-native";

import { RTL_TEXT_STYLE } from "@/localization/direction";
import { cairo } from "@/theme/typography";

import type { HomeRankingEntry } from "../types";

const avatarImage = require("@/assets/images/home/avatar.png");

type PodiumPlaceProps = {
  entry: HomeRankingEntry;
  size: number;
  borderColor: string;
  badgeColor: string;
};

function PodiumPlace({
  entry,
  size,
  borderColor,
  badgeColor,
}: PodiumPlaceProps) {
  const { t } = useTranslation();

  return (
    <View className="items-center gap-3" style={{ width: size }}>
      <View className="items-center">
        <View
          className="overflow-hidden rounded-full"
          style={{
            width: size,
            height: size,
            borderWidth: 3,
            borderColor,
          }}
        >
          <Image
            source={avatarImage}
            style={{ width: size, height: size }}
            contentFit="cover"
          />
        </View>
        <View
          className="-mt-3 size-7 items-center justify-center rounded-full"
          style={{ backgroundColor: badgeColor }}
        >
          <Text
            className="text-base leading-6 text-background"
            style={{ fontFamily: cairo.bold }}
          >
            {entry.rank}
          </Text>
        </View>
      </View>
      <View className="w-full items-center gap-[3px]">
        <Text
          className="w-full text-center text-[14.4px] leading-[21.6px] text-accent"
          style={{ fontFamily: cairo.regular, ...RTL_TEXT_STYLE }}
          numberOfLines={1}
        >
          {t(entry.nameKey)}
        </Text>
        <Text
          className="w-full text-center text-[14.4px] leading-[21.6px] text-primary"
          style={{ fontFamily: cairo.regular, ...RTL_TEXT_STYLE }}
        >
          {t("home.guest.ranking.points", { count: entry.points })}
        </Text>
      </View>
    </View>
  );
}

type LeaderboardPodiumProps = {
  podium: [HomeRankingEntry, HomeRankingEntry, HomeRankingEntry];
};

export default function LeaderboardPodium({ podium }: LeaderboardPodiumProps) {
  const [first, second, third] = podium;

  return (
    <View
      className="h-[199px] w-[299px] self-center"
      style={{ direction: "ltr" }}
    >
      <View className="absolute left-[107px] top-1.5">
        <PodiumPlace
          entry={first}
          size={84}
          borderColor="#018A43"
          badgeColor="#018A43"
        />
      </View>
      <View className="absolute left-0 top-[50px]">
        <PodiumPlace
          entry={second}
          size={74}
          borderColor="#BFBFBF"
          badgeColor="#BFBFBF"
        />
      </View>
      <View className="absolute left-[220px] top-[50px]">
        <PodiumPlace
          entry={third}
          size={74}
          borderColor="#AC5F02"
          badgeColor="#AC5F02"
        />
      </View>
    </View>
  );
}
