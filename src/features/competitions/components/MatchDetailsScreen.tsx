import { MaterialDesignIcons } from "@react-native-vector-icons/material-design-icons";
import { Image } from "expo-image";
import { useLocalSearchParams } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import { ScrollView, Text, View } from "react-native";

import ScreenSafeAreaView from "@/components/ScreenSafeAreaView";
import { useAuthState } from "@/features/auth/hooks/useAuthState";
import { getAuthRole } from "@/features/auth/utils/sessionRole";
import CreateScreenHeader from "@/features/create/components/CreateScreenHeader";
import { RTL_CONTAINER_STYLE, RTL_TEXT_STYLE } from "@/localization/direction";
import { colors } from "@/theme/colors";
import { cairo } from "@/theme/typography";

import { useCompetitionsState } from "../hooks/useCompetitionsState";
import type { MatchResult, MatchSide, MatchStat } from "../types";
import { CornerFlag, ScoreBox } from "./matchResultShared";
import NationalityFlag from "./NationalityFlag";

const heroImage = require("@/assets/images/home/banner-fencers.jpg");
const SELF_NAME_KEY = "competitions.people.ahmedKhaldi";

type InfoIcon = "fencing" | "stairs" | "clock-outline";

type InfoRow = {
  icon: InfoIcon;
  labelKey: string;
  value: string;
};

function sideDisplayName(side: MatchSide, showYouLabel: boolean) {
  return {
    nameKey: side.nameKey,
    showYou: showYouLabel && side.nameKey === SELF_NAME_KEY,
  };
}

function SideNameText({
  side,
  showYouLabel,
  nameSize = "text-sm",
}: {
  side: MatchSide;
  showYouLabel: boolean;
  nameSize?: string;
}) {
  const { t } = useTranslation();
  const { showYou } = sideDisplayName(side, showYouLabel);

  return (
    <Text
      className={`${nameSize} text-accent`}
      numberOfLines={1}
      style={{ fontFamily: cairo.medium, ...RTL_TEXT_STYLE }}
    >
      {t(side.nameKey)}
      {showYou ? (
        <Text
          className="text-[10px] text-primary"
          style={{ fontFamily: cairo.medium }}
        >
          {` ${t("competitions.user.youSuffix")}`}
        </Text>
      ) : null}
    </Text>
  );
}

function DetailRow({ icon, labelKey, value }: InfoRow) {
  const { t } = useTranslation();

  return (
    <View
      className="h-11 flex-row items-center justify-between rounded-lg bg-background px-3"
      style={RTL_CONTAINER_STYLE}
    >
      <View
        className="min-w-0 flex-1 flex-row items-center gap-2"
        style={RTL_CONTAINER_STYLE}
      >
        <View className="size-6 items-center justify-center rounded-md bg-primary/10">
          <MaterialDesignIcons name={icon} size={14} color={colors.primary} />
        </View>
        <Text
          className="text-xs text-accent"
          style={{ fontFamily: cairo.medium, ...RTL_TEXT_STYLE }}
        >
          {t(labelKey)}
        </Text>
      </View>
      <Text
        className="text-xs text-slate-500"
        style={{ fontFamily: cairo.regular, ...RTL_TEXT_STYLE }}
      >
        {value}
      </Text>
    </View>
  );
}

function PeriodCell({
  value,
  highlight,
}: {
  value: number;
  highlight: boolean;
}) {
  return (
    <View
      className={`size-7 items-center justify-center rounded-[5px] ${
        highlight ? "bg-primary/10" : "bg-slate-100"
      }`}
    >
      <Text
        className={`text-xs ${highlight ? "text-primary" : "text-slate-500"}`}
        style={{ fontFamily: cairo.medium }}
      >
        {value}
      </Text>
    </View>
  );
}

function PlayerIdentity({
  side,
  showYouLabel,
}: {
  side: MatchSide;
  showYouLabel: boolean;
}) {
  const { t } = useTranslation();

  return (
    <View className="flex-row items-center gap-2" style={RTL_CONTAINER_STYLE}>
      <NationalityFlag nationality={side.nationality} />
      <View className=" gap-0">
        <SideNameText side={side} showYouLabel={showYouLabel} nameSize="text-xs" />
        <Text
          className="text-xs text-slate-400"
          numberOfLines={1}
          style={{ fontFamily: cairo.regular, ...RTL_TEXT_STYLE }}
        >
          {t(`competitions.nationality.${side.nationality}`)}
        </Text>
      </View>
    </View>
  );
}

function PeriodsTable({
  result,
  startPeriods,
  endPeriods,
  showYouLabel,
}: {
  result: MatchResult;
  startPeriods: number[];
  endPeriods: number[];
  showYouLabel: boolean;
}) {
  const { t } = useTranslation();
  const startWins = result.startSide.score > result.endSide.score;
  const endWins = result.endSide.score > result.startSide.score;
  const periodCount = Math.min(startPeriods.length, endPeriods.length);

  const scoreColumns = [
    ...Array.from({ length: periodCount }, (_, index) => ({
      key: `period-${index}`,
      label: t("competitions.matchDetails.periods.round", {
        number: index + 1,
      }),
      startValue: startPeriods[index] ?? 0,
      endValue: endPeriods[index] ?? 0,
      startHighlight: (startPeriods[index] ?? 0) > (endPeriods[index] ?? 0),
      endHighlight: (endPeriods[index] ?? 0) > (startPeriods[index] ?? 0),
    })),
    {
      key: "result",
      label: t("competitions.matchDetails.periods.result"),
      startValue: result.startSide.score,
      endValue: result.endSide.score,
      startHighlight: startWins,
      endHighlight: endWins,
    },
  ];

  return (
    <View className="rounded-lg bg-white p-3">
      <View
        className="w-full flex-row items-start justify-between gap-4"
        style={RTL_CONTAINER_STYLE}
      >
        <View className=" gap-4">
          <Text
            className="text-xs text-slate-400"
            style={{ fontFamily: cairo.regular, ...RTL_TEXT_STYLE }}
          >
            {t("competitions.matchDetails.periods.name")}
          </Text>
          <PlayerIdentity side={result.startSide} showYouLabel={showYouLabel} />
          <PlayerIdentity side={result.endSide} showYouLabel={showYouLabel} />
        </View>

        <View
          className="flex-row items-start gap-[9px]"
          style={RTL_CONTAINER_STYLE}
        >
          {scoreColumns.map((column) => (
            <View key={column.key} className="items-center gap-4">
              <Text
                className="text-[10px] text-slate-400"
                style={{ fontFamily: cairo.regular, ...RTL_TEXT_STYLE }}
              >
                {column.label}
              </Text>
              <PeriodCell
                value={column.startValue}
                highlight={column.startHighlight}
              />
              <PeriodCell
                value={column.endValue}
                highlight={column.endHighlight}
              />
            </View>
          ))}
        </View>
      </View>
    </View>
  );
}

function StatBar({
  value,
  max,
  color,
}: {
  value: number;
  max: number;
  color: string;
}) {
  const width = max <= 0 ? 0 : Math.max(6, Math.round((value / max) * 90));

  return (
    <View className="h-1.5 w-[90px] overflow-hidden rounded-xl bg-slate-100">
      <View
        style={{
          height: 6,
          width,
          borderRadius: 12,
          backgroundColor: color,
        }}
      />
    </View>
  );
}

function StatsSection({
  result,
  stats,
  showYouLabel,
}: {
  result: MatchResult;
  stats: MatchStat[];
  showYouLabel: boolean;
}) {
  const { t } = useTranslation();

  return (
    <View className="gap-3 rounded-lg bg-white p-3">
      <View
        className="flex-row items-center justify-between"
        style={RTL_CONTAINER_STYLE}
      >
        <View
          className="flex-row items-center gap-2"
          style={RTL_CONTAINER_STYLE}
        >
          <NationalityFlag nationality={result.startSide.nationality} />
          <SideNameText
            side={result.startSide}
            showYouLabel={showYouLabel}
            nameSize="text-xs"
          />
        </View>
        <View
          className="flex-row items-center gap-2"
          style={RTL_CONTAINER_STYLE}
        >
          <Text
            className="text-xs text-accent"
            numberOfLines={1}
            style={{ fontFamily: cairo.medium, ...RTL_TEXT_STYLE }}
          >
            {t(result.endSide.nameKey)}
          </Text>
          <NationalityFlag nationality={result.endSide.nationality} />
        </View>
      </View>

      {stats.map((stat) => {
        const max = Math.max(stat.startValue, stat.endValue, 1);
        return (
          <View
            key={stat.id}
            className="h-6 flex-row items-center justify-between"
            style={RTL_CONTAINER_STYLE}
          >
            <View
              className="flex-row items-center gap-[11px]"
              style={RTL_CONTAINER_STYLE}
            >
              <StatBar
                value={stat.startValue}
                max={max}
                color={colors.primary}
              />
              <Text
                className="text-xs text-primary"
                style={{ fontFamily: cairo.regular }}
              >
                {stat.startValue}
              </Text>
            </View>
            <Text
              className="text-[10px] text-accent"
              style={{ fontFamily: cairo.medium, ...RTL_TEXT_STYLE }}
            >
              {t(stat.labelKey)}
            </Text>
            <View
              className="flex-row items-center gap-[11px]"
              style={RTL_CONTAINER_STYLE}
            >
              <Text
                className="text-xs"
                style={{ fontFamily: cairo.regular, color: colors.opponent }}
              >
                {stat.endValue}
              </Text>
              <StatBar
                value={stat.endValue}
                max={max}
                color={colors.opponent}
              />
            </View>
          </View>
        );
      })}
    </View>
  );
}

function MatchHeroCard({
  result,
  boutStatusKey,
  showYouLabel,
}: {
  result: MatchResult;
  boutStatusKey: string;
  showYouLabel: boolean;
}) {
  const { t } = useTranslation();
  const startWins = result.startSide.score > result.endSide.score;
  const endWins = result.endSide.score > result.startSide.score;

  return (
    <View className="h-[209px] w-full">
      <View className="h-[156px] w-full overflow-hidden rounded-lg">
        <Image
          source={heroImage}
          style={{ width: "100%", height: 156 }}
          contentFit="cover"
        />
      </View>

      <View className="absolute left-0 right-0 top-[78px] overflow-hidden rounded-lg border border-slate-100 bg-white pb-2">
        <CornerFlag nationality={result.startSide.nationality} edge="right" />
        <CornerFlag nationality={result.endSide.nationality} edge="left" />

        <View
          className="z-10 flex-row items-center justify-center gap-4 px-4 py-2"
          style={RTL_CONTAINER_STYLE}
        >
          <View className="max-w-[110px] items-center gap-2">
            <SideNameText side={result.startSide} showYouLabel={showYouLabel} />
            <Text
              className="text-xs text-slate-400"
              numberOfLines={1}
              style={{ fontFamily: cairo.regular, ...RTL_TEXT_STYLE }}
            >
              {t(`competitions.nationality.${result.startSide.nationality}`)}
            </Text>
          </View>
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
          <View className="max-w-[110px] items-center gap-2">
            <SideNameText side={result.endSide} showYouLabel={showYouLabel} />
            <Text
              className="text-xs text-slate-400"
              numberOfLines={1}
              style={{ fontFamily: cairo.regular, ...RTL_TEXT_STYLE }}
            >
              {t(`competitions.nationality.${result.endSide.nationality}`)}
            </Text>
          </View>
        </View>

        <View className="z-10 items-center gap-2">
          <View className="h-5 items-center justify-center rounded-3xl bg-pending-50 px-1.5">
            <Text
              className="text-[9px] text-pending"
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
          <View className="h-5 items-center justify-center rounded-3xl bg-slate-300/20 px-1.5">
            <Text
              className="text-[9px] text-slate-400"
              style={{ fontFamily: cairo.medium }}
            >
              {t(boutStatusKey)}
            </Text>
          </View>
        </View>
      </View>
    </View>
  );
}

export default function MatchDetailsScreen() {
  const { t } = useTranslation();
  const { session } = useAuthState();
  const showYouLabel = getAuthRole(session) === "user";
  const rawId = useLocalSearchParams<{ id: string | string[] }>().id;
  const id = Array.isArray(rawId) ? rawId[0] : rawId;
  const state = useCompetitionsState();

  const result = useMemo(
    () => state.results.find((item) => item.id === id),
    [id, state.results],
  );
  const details = useMemo(
    () => state.matchDetails.find((item) => item.matchId === id),
    [id, state.matchDetails],
  );

  if (!result || !details) {
    return (
      <ScreenSafeAreaView
        className="flex-1 bg-background"
        edges={["top", "bottom"]}
        style={RTL_CONTAINER_STYLE}
      >
        <StatusBar style="auto" />
        <CreateScreenHeader title={t("competitions.matchDetails.title")} />
        <View className="flex-1 items-center justify-center px-5">
          <Text
            className="text-sm text-slate-400"
            style={{ fontFamily: cairo.medium, ...RTL_TEXT_STYLE }}
          >
            {t("competitions.matchDetails.notFound")}
          </Text>
        </View>
      </ScreenSafeAreaView>
    );
  }

  const infoRows: InfoRow[] = [
    {
      icon: "fencing",
      labelKey: "competitions.matchDetails.fields.weapon",
      value: t(details.weaponKey),
    },
    {
      icon: "stairs",
      labelKey: "competitions.matchDetails.fields.round",
      value: t(result.roundKey),
    },
    {
      icon: "clock-outline",
      labelKey: "competitions.matchDetails.fields.duration",
      value: t("competitions.matchDetails.durationMinutes", {
        count: details.durationMinutes,
      }),
    },
  ];

  return (
    <ScreenSafeAreaView
      className="flex-1 bg-background"
      edges={["top", "bottom"]}
      style={RTL_CONTAINER_STYLE}
    >
      <StatusBar style="auto" />
      <CreateScreenHeader title={t("competitions.matchDetails.title")} />
      <ScrollView
        className="flex-1"
        contentContainerClassName="gap-4 px-5 pb-8"
        showsVerticalScrollIndicator={false}
      >
        <MatchHeroCard
          result={result}
          boutStatusKey={`competitions.matchDetails.status.${details.boutStatus}`}
          showYouLabel={showYouLabel}
        />

        <Text
          className="text-sm text-accent"
          style={{ fontFamily: cairo.semiBold, ...RTL_TEXT_STYLE }}
        >
          {t("competitions.matchDetails.sections.details")}
        </Text>
        <View className="gap-2 rounded-lg border border-slate-100 bg-white p-3">
          {infoRows.map((row) => (
            <DetailRow key={row.labelKey} {...row} />
          ))}
        </View>

        <Text
          className="text-sm text-accent"
          style={{ fontFamily: cairo.semiBold, ...RTL_TEXT_STYLE }}
        >
          {t("competitions.matchDetails.sections.periods")}
        </Text>
        <PeriodsTable
          result={result}
          startPeriods={details.startPeriods}
          endPeriods={details.endPeriods}
          showYouLabel={showYouLabel}
        />

        <Text
          className="text-sm text-accent"
          style={{ fontFamily: cairo.semiBold, ...RTL_TEXT_STYLE }}
        >
          {t("competitions.matchDetails.sections.stats")}
        </Text>
        <StatsSection
          result={result}
          stats={details.stats}
          showYouLabel={showYouLabel}
        />
      </ScrollView>
    </ScreenSafeAreaView>
  );
}
