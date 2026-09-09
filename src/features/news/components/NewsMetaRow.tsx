import { useTranslation } from "react-i18next";
import { Text, View } from "react-native";
import { SvgXml } from "react-native-svg";

import { RTL_CONTAINER_STYLE, RTL_TEXT_STYLE } from "@/localization/direction";
import { cairo } from "@/theme/typography";

import {
  DATE_META_ICON_XML,
  LOCATION_META_ICON_XML,
  TIME_META_ICON_XML,
  WEAPON_META_ICON_XML,
} from "../constants/iconXml";
import type { NewsMeta } from "../types";

type NewsMetaRowProps = {
  meta: NewsMeta;
};

export default function NewsMetaRow({ meta }: NewsMetaRowProps) {
  const { t } = useTranslation();

  const items = [
    { icon: WEAPON_META_ICON_XML, label: t(meta.eventTypeKey) },
    { icon: TIME_META_ICON_XML, label: t(meta.timeKey) },
    { icon: DATE_META_ICON_XML, label: t(meta.dateKey) },
    { icon: LOCATION_META_ICON_XML, label: t(meta.locationKey) },
  ];

  return (
    <View
      className="flex-row flex-wrap items-center gap-2"
      style={RTL_CONTAINER_STYLE}
    >
      {items.map((item) => (
        <View
          key={item.label}
          className="flex-row items-center gap-1"
          style={RTL_CONTAINER_STYLE}
        >
          <Text
            className="text-[10px] text-primary"
            style={{ fontFamily: cairo.medium, ...RTL_TEXT_STYLE }}
          >
            {item.label}
          </Text>
          <SvgXml xml={item.icon} width={10} height={10} />
        </View>
      ))}
    </View>
  );
}
