import { Image } from "expo-image";
import { useTranslation } from "react-i18next";
import { Text, View } from "react-native";

import { RTL_CONTAINER_STYLE, RTL_TEXT_STYLE } from "@/localization/direction";
import { cairo } from "@/theme/typography";

import { COMPETITOR_PHOTOS } from "../constants/competitorPhotos";
import type { Participant } from "../types";

type ParticipantCardProps = {
  participant: Participant;
};

export default function ParticipantCard({ participant }: ParticipantCardProps) {
  const { t } = useTranslation();

  return (
    <View
      className="flex-row items-center gap-3 rounded-lg border border-slate-100 bg-white p-3"
      style={RTL_CONTAINER_STYLE}
    >
      <View className="size-10 overflow-hidden rounded-full bg-slate-100">
        <Image
          source={COMPETITOR_PHOTOS[participant.photoId]}
          style={{ width: 40, height: 40 }}
          contentFit="cover"
        />
      </View>
      <View className="min-w-0 flex-1 gap-1.5">
        <View
          className="flex-row flex-wrap items-center gap-1.5"
          style={RTL_CONTAINER_STYLE}
        >
          <Text
            className="text-xs text-accent"
            style={{ fontFamily: cairo.semiBold, ...RTL_TEXT_STYLE }}
          >
            {t(participant.nameKey)}
          </Text>
          <View
            className={`h-[13px] items-center justify-center rounded-3xl px-1.5 ${
              participant.status === "suspended"
                ? "bg-rejected/10"
                : "bg-primary/10"
            }`}
          >
            <Text
              className={`text-[8px] ${participant.status === "suspended" ? "text-rejected" : "text-primary"}`}
              style={{ fontFamily: cairo.medium }}
            >
              {t(`competitions.participantStatus.${participant.status}`)}
            </Text>
          </View>
          {participant.nationalTeam ? (
            <View className="h-[13px] items-center justify-center rounded-3xl bg-primary/10 px-1.5">
              <Text
                className="text-[8px] text-primary"
                style={{ fontFamily: cairo.medium }}
              >
                {t("competitions.nationalTeam")}
              </Text>
            </View>
          ) : null}
        </View>
        <View
          className="flex-row flex-wrap gap-1.5"
          style={RTL_CONTAINER_STYLE}
        >
          <MetaChip
            label={t("competitions.fields.rating")}
            value={String(participant.rating)}
          />
          <MetaChip
            label={t("competitions.fields.weapon")}
            value={t(participant.weaponKey)}
          />
          <MetaChip
            label={t("competitions.fields.level")}
            value={participant.level}
            isGreen
          />
        </View>
      </View>
    </View>
  );
}

function MetaChip({
  label,
  value,
  isGreen,
}: {
  label: string;
  value: string;
  isGreen?: boolean;
}) {
  return (
    <View
      className="flex-row items-center gap-1 rounded-md bg-white border border-slate-100 px-1.5 py-1"
      style={RTL_CONTAINER_STYLE}
    >
      <Text
        className="text-[10px] text-slate-400"
        style={{ fontFamily: cairo.regular }}
      >
        {label}
      </Text>
      <View className="size-0.5 rounded-full bg-slate-300" />
      <Text
        className={`text-[10px]  ${isGreen ? "text-green-500" : "text-label"}`}
        style={{ fontFamily: cairo.medium }}
      >
        {value}
      </Text>
    </View>
  );
}
