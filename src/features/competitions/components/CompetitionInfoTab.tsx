import { MaterialDesignIcons } from "@react-native-vector-icons/material-design-icons";
import { useTranslation } from "react-i18next";
import { Text, View } from "react-native";

import { RTL_CONTAINER_STYLE, RTL_TEXT_STYLE } from "@/localization/direction";
import { colors } from "@/theme/colors";
import { cairo } from "@/theme/typography";

import type { Competition } from "../types";
import {
  getCompetitionAbout,
  getCompetitionCategory,
  getCompetitionDateRange,
  getCompetitionEventType,
  getCompetitionLocation,
  getCompetitionName,
} from "../utils/labels";

type InfoIcon =
  | "card-account-details-outline"
  | "shape-outline"
  | "fencing"
  | "account-group-outline"
  | "calendar-month-outline"
  | "clock-outline"
  | "map-marker-outline";

type InfoRow = {
  icon: InfoIcon;
  labelKey: string;
  value: string;
};

type CompetitionInfoTabProps = {
  competition: Competition;
};

function DetailRow({ icon, labelKey, value }: InfoRow) {
  const { t } = useTranslation();

  return (
    <View
      className="h-12 flex-row items-center justify-between rounded-lg bg-slate-50 px-3 "
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
          className="text-xs text-slate-500"
          style={{ fontFamily: cairo.medium, ...RTL_TEXT_STYLE }}
        >
          {t(labelKey)}
        </Text>
      </View>
      <Text
        className="text-xs text-label"
        style={{ fontFamily: cairo.semiBold, ...RTL_TEXT_STYLE }}
      >
        {value}
      </Text>
    </View>
  );
}

export default function CompetitionInfoTab({
  competition,
}: CompetitionInfoTabProps) {
  const { t } = useTranslation();

  const rows: InfoRow[] = [
    {
      icon: "card-account-details-outline",
      labelKey: "competitions.fields.name",
      value: getCompetitionName(competition, t),
    },
    {
      icon: "shape-outline",
      labelKey: "competitions.fields.category",
      value: getCompetitionCategory(competition, t),
    },
    {
      icon: "fencing",
      labelKey: "competitions.fields.type",
      value: getCompetitionEventType(competition, t),
    },
    {
      icon: "account-group-outline",
      labelKey: "competitions.fields.participants",
      value: t("competitions.playerCount", { count: competition.playerCount }),
    },
    {
      icon: "calendar-month-outline",
      labelKey: "competitions.fields.date",
      value: getCompetitionDateRange(competition, t),
    },
    {
      icon: "clock-outline",
      labelKey: "competitions.fields.time",
      value: t(competition.timeKey),
    },
    {
      icon: "map-marker-outline",
      labelKey: "competitions.fields.location",
      value: getCompetitionLocation(competition, t),
    },
  ];

  return (
    <View className="gap-3">
      <View className="gap-2 rounded-lg border border-slate-100 bg-white p-4">
        <Text
          className="text-xs text-accent"
          style={{ fontFamily: cairo.semiBold, ...RTL_TEXT_STYLE }}
        >
          {t("competitions.about")}
        </Text>
        <Text
          className="text-xs leading-5 text-slate-400"
          style={{ fontFamily: cairo.regular, ...RTL_TEXT_STYLE }}
        >
          {getCompetitionAbout(competition, t)}
        </Text>
      </View>
      <View className="gap-2 rounded-lg border border-slate-100 bg-white p-3">
        {rows.map((row) => (
          <DetailRow key={row.labelKey} {...row} />
        ))}
      </View>
    </View>
  );
}
