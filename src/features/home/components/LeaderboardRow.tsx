import { Image } from "expo-image";
import { useTranslation } from "react-i18next";
import { Text, View } from "react-native";

import { RTL_CONTAINER_STYLE, RTL_TEXT_STYLE } from "@/localization/direction";
import { cairo } from "@/theme/typography";

import { rankPlayerImageFor } from "../constants/rankPlayerAvatars";
import type { HomeRankingEntry } from "../types";

type LeaderboardRowVariant = "sticky" | "active" | "default";

type LeaderboardRowProps = {
  entry: HomeRankingEntry;
  variant?: LeaderboardRowVariant;
  /** Authenticated flow highlights the current user; guest flow turns this off. */
  highlightCurrentUser?: boolean;
};

function resolveVariant(
  entry: HomeRankingEntry,
  variant: LeaderboardRowVariant | undefined,
  highlightCurrentUser: boolean,
) {
  if (variant) {
    return variant;
  }
  if (highlightCurrentUser && entry.isCurrentUser) {
    return "active";
  }
  return "default";
}

export default function LeaderboardRow({
  entry,
  variant,
  highlightCurrentUser = true,
}: LeaderboardRowProps) {
  const { t } = useTranslation();
  const resolved = resolveVariant(entry, variant, highlightCurrentUser);
  const displayName =
    highlightCurrentUser && entry.isCurrentUser
      ? t("home.guest.ranking.youLabel", { name: t(entry.nameKey) })
      : t(entry.nameKey);

  const containerClass =
    resolved === "sticky"
      ? "bg-primary/10"
      : resolved === "active"
        ? "bg-primary"
        : "bg-background";

  const nameClass = resolved === "active" ? "text-background" : "text-accent";

  const pointsClass =
    resolved === "active"
      ? "text-background"
      : resolved === "sticky"
        ? "text-accent"
        : "text-slate-500";

  const rankClass =
    resolved === "active"
      ? "text-background"
      : resolved === "sticky"
        ? "text-accent"
        : "text-[#4f4f4f]";

  return (
    <View
      className={`w-full flex-row items-center justify-between overflow-hidden rounded-lg px-4 py-2 ${containerClass}`}
      style={RTL_CONTAINER_STYLE}
    >
      <View className="flex-row items-center gap-4" style={RTL_CONTAINER_STYLE}>
        <View
          className="flex-row items-center gap-3"
          style={RTL_CONTAINER_STYLE}
        >
          <Text
            className={`min-w-[11px] text-center text-[14.4px] leading-[21.6px] ${rankClass}`}
            style={{ fontFamily: cairo.bold }}
          >
            {entry.rank}
          </Text>
          <View className="size-8 overflow-hidden rounded-full">
            <Image
              source={rankPlayerImageFor(entry.id)}
              style={{ width: 32, height: 32 }}
              contentFit="cover"
            />
          </View>
          <Text
            className={`text-[14.4px] leading-[21.6px] ${nameClass}`}
            style={{ fontFamily: cairo.regular, ...RTL_TEXT_STYLE }}
            numberOfLines={1}
          >
            {displayName}
          </Text>
        </View>
      </View>

      <Text
        className={`text-[14.4px] leading-[21.6px] ${pointsClass}`}
        style={{ fontFamily: cairo.regular, ...RTL_TEXT_STYLE }}
      >
        {t("home.guest.ranking.points", { count: entry.points })}
      </Text>
    </View>
  );
}
