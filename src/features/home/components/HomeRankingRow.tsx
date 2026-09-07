import { Image } from "expo-image";
import { useTranslation } from "react-i18next";
import { Text, View } from "react-native";

import { RTL_CONTAINER_STYLE, RTL_TEXT_STYLE } from "@/localization/direction";
import { cairo } from "@/theme/typography";

import type { HomeRankingEntry } from "../types";

const avatarImage = require("@/assets/images/home/avatar.png");

type HomeRankingRowProps = {
  entry: HomeRankingEntry;
  variant?: "current" | "leader";
};

function rankBadgeClass(rank: number) {
  switch (rank) {
    case 1:
      return "bg-primary/10";
    case 2:
      return "bg-slate-200";
    case 3:
      return "bg-pending/20";
    default:
      return "";
  }
}

function rankBadgeTextClass(rank: number) {
  switch (rank) {
    case 1:
      return "text-primary";
    case 2:
      return "text-slate-500";
    case 3:
      return "text-pending-700";
    default:
      return "text-accent";
  }
}

export default function HomeRankingRow({
  entry,
  variant = "leader",
}: HomeRankingRowProps) {
  const { t } = useTranslation();
  const isCurrent = variant === "current" || entry.isCurrentUser;
  const showMedal = !isCurrent && entry.rank <= 3;
  const displayName = entry.isCurrentUser
    ? t("home.guest.ranking.youLabel", { name: t(entry.nameKey) })
    : t(entry.nameKey);

  return (
    <View
      className={`w-full flex-row items-center justify-between overflow-hidden rounded-lg px-3 py-2 ${
        isCurrent ? "bg-primary/10 px-4" : "bg-background"
      }`}
      style={RTL_CONTAINER_STYLE}
    >
      <View className="flex-row items-center gap-4" style={RTL_CONTAINER_STYLE}>
        <View
          className="flex-row items-center gap-3"
          style={RTL_CONTAINER_STYLE}
        >
          {showMedal ? (
            <View
              className={`h-6.25 w-6.25 items-center justify-center overflow-hidden rounded-full ${rankBadgeClass(
                entry.rank,
              )}`}
            >
              <Text
                className={`text-[12px]  leading-[21.6px]  ${rankBadgeTextClass(entry.rank)}`}
                style={{ fontFamily: cairo.bold }}
              >
                {entry.rank}
              </Text>
            </View>
          ) : (
            <Text
              className="w-[11px] text-center text-[14px] leading-[21.6px] text-accent"
              style={{ fontFamily: cairo.bold }}
            >
              {entry.rank}
            </Text>
          )}
          <View className="size-8 overflow-hidden rounded-full">
            <Image
              source={avatarImage}
              style={{ width: 32, height: 32 }}
              contentFit="cover"
            />
          </View>
          <Text
            className="text-[14px] leading-[21.6px] text-accent"
            style={{ fontFamily: cairo.regular, ...RTL_TEXT_STYLE }}
            numberOfLines={1}
          >
            {displayName}
          </Text>
        </View>
      </View>

      <Text
        className={`text-[14px] leading-[21.6px] ${
          isCurrent ? "text-accent" : "text-primary"
        }`}
        style={{ fontFamily: cairo.regular, ...RTL_TEXT_STYLE }}
      >
        {t("home.guest.ranking.points", { count: entry.points })}
      </Text>
    </View>
  );
}
