import { MaterialDesignIcons } from "@react-native-vector-icons/material-design-icons";
import { Image } from "expo-image";
import { useTranslation } from "react-i18next";
import { Text, View } from "react-native";

import { useAuthState } from "@/features/auth/hooks/useAuthState";
import { RTL_CONTAINER_STYLE, RTL_TEXT_STYLE } from "@/localization/direction";
import { colors } from "@/theme/colors";
import { cairo } from "@/theme/typography";

import type { MatchResult, MatchSide, NationalityCode } from "../types";

const saFlag = require("@/assets/images/ksa-rotate-flag.png");
const qaFlag = require("@/assets/images/qatr-flag.png");
const GUEST_SELF_NAME_KEY = "competitions.people.ahmedKhaldi";

const FLAG_WIDTH = 41;
const FLAG_HEIGHT = 65;

type MatchResultCardProps = {
  result: MatchResult;
};

function flagFor(code: NationalityCode) {
  switch (code) {
    case "sa":
      return saFlag;
    case "qa":
      return qaFlag;
    default: {
      const exhaustive: never = code;
      throw new Error(`Unhandled nationality: ${exhaustive}`);
    }
  }
}

function CornerFlag({
  nationality,
  edge,
}: {
  nationality: NationalityCode;
  edge: "left" | "right";
}) {
  const isLeft = edge === "left";
  const designedForLeft = nationality === "qa";
  const shouldFlip = designedForLeft !== isLeft;

  return (
    <Image
      pointerEvents="none"
      source={flagFor(nationality)}
      contentFit="contain"
      style={{
        position: "absolute",
        top: isLeft ? -7 : -4,
        left: isLeft ? -13 : undefined,
        right: isLeft ? undefined : -8,
        width: FLAG_WIDTH,
        height: FLAG_HEIGHT,
        transform: shouldFlip ? [{ scaleX: -1 }] : undefined,
      }}
    />
  );
}

function NameBlock({ side, isGuest }: { side: MatchSide; isGuest: boolean }) {
  const { t } = useTranslation();
  const name =
    isGuest && side.nameKey === GUEST_SELF_NAME_KEY
      ? t("competitions.guest.youLabel", { name: t(side.nameKey) })
      : t(side.nameKey);

  return (
    <View className="max-w-[110px] items-center gap-2">
      <Text
        className="text-sm text-accent"
        numberOfLines={1}
        style={{ fontFamily: cairo.medium, ...RTL_TEXT_STYLE }}
      >
        {name}
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

function ScoreBox({ score, winner }: { score: number; winner: boolean }) {
  return (
    <View
      className={`h-8 w-8 items-center justify-center rounded-md ${
        winner ? "bg-primary/10" : "bg-slate-100"
      }`}
    >
      <Text
        className={`text-sm ${winner ? "text-primary" : "text-slate-500"}`}
        style={{ fontFamily: cairo.medium }}
      >
        {score}
      </Text>
    </View>
  );
}

export default function MatchResultCard({ result }: MatchResultCardProps) {
  const { t } = useTranslation();
  const { session } = useAuthState();
  const isGuest = Boolean(session?.isGuest);
  const startWins = result.startSide.score > result.endSide.score;
  const endWins = result.endSide.score > result.startSide.score;

  return (
    <View className="overflow-hidden rounded-lg border border-slate-100 bg-white pb-2">
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
    </View>
  );
}
