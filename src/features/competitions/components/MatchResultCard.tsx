import { MaterialDesignIcons } from "@react-native-vector-icons/material-design-icons";
import { useRouter, type Href } from "expo-router";
import { useTranslation } from "react-i18next";
import { Pressable, Text, View } from "react-native";

import { useAuthState } from "@/features/auth/hooks/useAuthState";
import { RTL_CONTAINER_STYLE, RTL_TEXT_STYLE } from "@/localization/direction";
import { colors } from "@/theme/colors";
import { cairo } from "@/theme/typography";

import type { MatchResult, MatchSide } from "../types";
import { CornerFlag, ScoreBox } from "./matchResultShared";

const GUEST_SELF_NAME_KEY = "competitions.people.ahmedKhaldi";

type MatchResultCardProps = {
  result: MatchResult;
};

function NameBlock({ side, isGuest }: { side: MatchSide; isGuest: boolean }) {
  const { t } = useTranslation();
  const name = t(side.nameKey);
  const showYou = isGuest && side.nameKey === GUEST_SELF_NAME_KEY;

  return (
    <View className="max-w-[110px] items-center gap-2">
      <Text
        className="text-sm text-accent"
        numberOfLines={1}
        style={{ fontFamily: cairo.medium, ...RTL_TEXT_STYLE }}
      >
        {name}
        {showYou ? (
          <Text
            className="text-[10px] text-primary"
            style={{ fontFamily: cairo.medium }}
          >
            {` ${t("competitions.guest.youSuffix")}`}
          </Text>
        ) : null}
      </Text>
      <Text
        className="text-xs text-slate-400"
        numberOfLines={1}
        style={{ fontFamily: cairo.regular, ...RTL_TEXT_STYLE }}
      >
        {t(`competitions.nationality.${side.nationality}`)}
      </Text>
    </View>
  );
}

export default function MatchResultCard({ result }: MatchResultCardProps) {
  const { t } = useTranslation();
  const router = useRouter();
  const { session } = useAuthState();
  const isGuest = Boolean(session?.isGuest);
  const startWins = result.startSide.score > result.endSide.score;
  const endWins = result.endSide.score > result.startSide.score;

  const content = (
    <>
      <CornerFlag nationality={result.startSide.nationality} edge="right" />
      <CornerFlag nationality={result.endSide.nationality} edge="left" />

      <View
        className="z-10 flex-row items-center justify-center gap-4 px-4 py-2"
        style={RTL_CONTAINER_STYLE}
      >
        <NameBlock side={result.startSide} isGuest={isGuest} />
        <View
          className="flex-row items-center gap-2"
          style={RTL_CONTAINER_STYLE}
        >
          <ScoreBox score={result.startSide.score} winner={startWins} />
          <MaterialDesignIcons
            name="fencing"
            size={22}
            color={colors.primary}
          />
          <ScoreBox score={result.endSide.score} winner={endWins} />
        </View>
        <NameBlock side={result.endSide} isGuest={isGuest} />
      </View>

      <View className="z-10 items-center gap-2">
        <View className="rounded-3xl bg-slate-300/20 px-1.5 py-1">
          <Text
            className="text-[9px] text-slate-400"
            style={{ fontFamily: cairo.medium }}
          >
            {t(result.roundKey)}
          </Text>
        </View>
        <View
          className="flex-row items-center gap-1"
          style={RTL_CONTAINER_STYLE}
        >
          <MaterialDesignIcons
            name="calendar-month-outline"
            size={10}
            color={colors.slate400}
          />
          <Text
            className="text-[10px] text-slate-400"
            style={{ fontFamily: cairo.medium }}
          >
            {t(result.dateKey)}
          </Text>
        </View>
        <View
          className="flex-row items-center gap-1"
          style={RTL_CONTAINER_STYLE}
        >
          <MaterialDesignIcons
            name="clock-outline"
            size={10}
            color={colors.slate400}
          />
          <Text
            className="text-[10px] text-slate-400"
            style={{ fontFamily: cairo.medium }}
          >
            {t(result.timeKey)}
          </Text>
        </View>
      </View>
    </>
  );

  if (!isGuest) {
    return (
      <View className="overflow-hidden rounded-lg border border-slate-100 bg-white pb-2">
        {content}
      </View>
    );
  }

  return (
    <Pressable
      accessibilityRole="button"
      onPress={() => router.push(`/match/${result.id}` as Href)}
      className="overflow-hidden rounded-lg border border-slate-100 bg-white pb-2"
    >
      {content}
    </Pressable>
  );
}
