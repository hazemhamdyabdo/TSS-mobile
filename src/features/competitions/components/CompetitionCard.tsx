import { Image } from "expo-image";
import { useRouter, type Href } from "expo-router";
import { useTranslation } from "react-i18next";
import { Pressable, Text, View } from "react-native";

import { RTL_TEXT_STYLE } from "@/localization/direction";
import { cairo } from "@/theme/typography";

import type { Competition } from "../types";
import {
  getCompetitionDate,
  getCompetitionEventType,
  getCompetitionLocation,
  getCompetitionTitle,
} from "../utils/labels";
import CompetitionStatusBadge, {
  CompetitionMetaItem,
} from "./CompetitionStatusBadge";

const CARD_IMAGES = [
  require("@/assets/images/competation-1.jpg"),
  require("@/assets/images/competation-2.jpg"),
  require("@/assets/images/competation-3.jpg"),
  require("@/assets/images/competation-4.png"),
] as const;

function cardImageFor(id: string) {
  let hash = 0;
  for (let i = 0; i < id.length; i++) {
    hash = (hash * 31 + id.charCodeAt(i)) | 0;
  }
  return CARD_IMAGES[Math.abs(hash) % CARD_IMAGES.length];
}

type CompetitionCardProps = {
  competition: Competition;
};

export default function CompetitionCard({ competition }: CompetitionCardProps) {
  const { t } = useTranslation();
  const router = useRouter();

  return (
    <Pressable
      accessibilityRole="button"
      onPress={() => router.push(`/competition/${competition.id}` as Href)}
      className="overflow-hidden rounded-lg border border-slate-100 bg-white p-[13px]"
    >
      <View className="flex-row items-center gap-3">
        <View className="h-[77px] w-[124px] overflow-hidden rounded-lg">
          <Image
            source={cardImageFor(competition.id)}
            style={{ width: 124, height: 77 }}
            contentFit="cover"
          />
          <View className="absolute inset-0 bg-primary/40" />
          <View
            className="absolute bottom-1.5 items-center"
            style={{ right: 8 }}
          >
            <Text
              className="text-lg leading-5 text-white"
              style={{ fontFamily: cairo.bold }}
            >
              {competition.dateNumber}
            </Text>
          </View>
        </View>

        <View className="min-w-0 flex-1 gap-[6px]">
          <View className="flex-row items-center justify-between gap-2">
            <Text
              className="min-w-0 flex-1 text-xs text-accent"
              numberOfLines={1}
              style={{ fontFamily: cairo.semiBold, ...RTL_TEXT_STYLE }}
            >
              {getCompetitionTitle(competition, t)}
            </Text>
            <CompetitionStatusBadge status={competition.status} />
          </View>

          <View className="flex-row flex-wrap items-center justify-start gap-x-2 gap-y-1.5">
            <CompetitionMetaItem
              icon="map-marker-outline"
              label={getCompetitionLocation(competition, t)}
            />
            <CompetitionMetaItem
              icon="fencing"
              label={getCompetitionEventType(competition, t)}
            />
            <CompetitionMetaItem
              icon="calendar-month-outline"
              label={getCompetitionDate(competition, t)}
            />
            <CompetitionMetaItem
              icon="clock-outline"
              label={t(competition.timeKey)}
            />
            <CompetitionMetaItem
              icon="account-group-outline"
              label={t("competitions.playerCount", {
                count: competition.playerCount,
              })}
            />
          </View>
        </View>
      </View>
    </Pressable>
  );
}
