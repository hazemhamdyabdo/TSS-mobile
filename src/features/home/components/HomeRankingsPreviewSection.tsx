import { useRouter, type Href } from "expo-router";
import { useTranslation } from "react-i18next";
import { Pressable, Text, View } from "react-native";

import { RTL_CONTAINER_STYLE, RTL_TEXT_STYLE } from "@/localization/direction";
import { cairo } from "@/theme/typography";

import type { HomeRankingsPreview } from "../types";
import HomeRankingRow from "./HomeRankingRow";

type HomeRankingsPreviewSectionProps = {
  rankings: HomeRankingsPreview;
};

export default function HomeRankingsPreviewSection({
  rankings,
}: HomeRankingsPreviewSectionProps) {
  const { t } = useTranslation();
  const router = useRouter();

  return (
    <View className="w-full gap-4" style={RTL_CONTAINER_STYLE}>
      <View
        className="w-full flex-row items-center justify-between"
        style={RTL_CONTAINER_STYLE}
      >
        <Text
          className="text-sm capitalize text-label"
          style={{ fontFamily: cairo.semiBold, ...RTL_TEXT_STYLE }}
        >
          {t("home.guest.ranking.playersTitle")}
        </Text>
        <Pressable
          accessibilityRole="button"
          onPress={() => router.push("/(tabs)/rankings" as Href)}
        >
          <Text
            className="text-[10px] capitalize text-primary"
            style={{ fontFamily: cairo.semiBold }}
          >
            {t("home.viewAll")}
          </Text>
        </Pressable>
      </View>

      <View className="w-full overflow-hidden rounded-t-lg border border-slate-100 bg-white/80 p-3 opacity-80">
        <View className="w-full gap-2">
          {rankings.leaders.map((entry) => (
            <HomeRankingRow key={entry.id} entry={entry} />
          ))}
        </View>
      </View>
    </View>
  );
}
