import { Image } from "expo-image";
import { useRouter, type Href } from "expo-router";
import { useTranslation } from "react-i18next";
import { Pressable, Text, View } from "react-native";
import { SvgXml } from "react-native-svg";

import {
  META_DATE_ICON_XML,
  META_LOCATION_ICON_XML,
  META_TIME_ICON_XML,
  META_WEAPON_ICON_XML,
} from "@/features/home/constants/guestIcons";
import { RTL_CONTAINER_STYLE, RTL_TEXT_STYLE } from "@/localization/direction";
import { cairo } from "@/theme/typography";

import type { Competition } from "../types";
import {
  getCompetitionDate,
  getCompetitionEventType,
  getCompetitionLocation,
  getCompetitionTitle,
} from "../utils/labels";
import CompetitionStatusBadge from "./CompetitionStatusBadge";

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

function MetaItem({
  label,
  iconXml,
  iconWidth = 10,
  iconHeight = 10,
}: {
  label: string;
  iconXml: string;
  iconWidth?: number;
  iconHeight?: number;
}) {
  return (
    <View className="flex-row items-center gap-1" style={RTL_CONTAINER_STYLE}>
      <Text
        className="text-[10px] capitalize text-slate-400"
        style={{ fontFamily: cairo.medium, ...RTL_TEXT_STYLE }}
        numberOfLines={1}
      >
        {label}
      </Text>
      <SvgXml xml={iconXml} width={iconWidth} height={iconHeight} />
    </View>
  );
}

type GuestCompetitionCardProps = {
  competition: Competition;
};

export default function GuestCompetitionCard({
  competition,
}: GuestCompetitionCardProps) {
  const { t } = useTranslation();
  const router = useRouter();

  return (
    <Pressable
      accessibilityRole="button"
      onPress={() => router.push(`/competition/${competition.id}` as Href)}
      className="w-full overflow-hidden rounded-lg border border-slate-100 bg-white p-2"
      style={RTL_CONTAINER_STYLE}
    >
      <View className="flex-row items-center gap-2" style={RTL_CONTAINER_STYLE}>
        <View className="h-[77px] w-[124px] overflow-hidden rounded-lg">
          <Image
            source={cardImageFor(competition.id)}
            style={{ width: 124, height: 77 }}
            contentFit="cover"
          />
        </View>
        <View className="min-w-0 flex-1 gap-2">
          <View
            className="flex-row items-center justify-between gap-2"
            style={RTL_CONTAINER_STYLE}
          >
            <Text
              className="min-w-0 flex-1 text-xs capitalize tracking-[0.1px] text-accent"
              numberOfLines={1}
              style={{ fontFamily: cairo.medium, ...RTL_TEXT_STYLE }}
            >
              {getCompetitionTitle(competition, t)}
            </Text>
            <CompetitionStatusBadge status={competition.status} />
          </View>
          <View
            className="flex-row flex-wrap gap-x-2 gap-y-1.5"
            style={RTL_CONTAINER_STYLE}
          >
            <MetaItem
              label={getCompetitionEventType(competition, t)}
              iconXml={META_WEAPON_ICON_XML}
            />
            <MetaItem
              label={getCompetitionLocation(competition, t)}
              iconXml={META_LOCATION_ICON_XML}
            />
            <MetaItem
              label={t(competition.timeKey)}
              iconXml={META_TIME_ICON_XML}
              iconHeight={9}
            />
            <MetaItem
              label={getCompetitionDate(competition, t)}
              iconXml={META_DATE_ICON_XML}
            />
          </View>
        </View>
      </View>
    </Pressable>
  );
}
