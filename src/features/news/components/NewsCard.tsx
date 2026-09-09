import { Image } from "expo-image";
import { useTranslation } from "react-i18next";
import { Pressable, Text, View } from "react-native";
import { SvgXml } from "react-native-svg";

import { RTL_CONTAINER_STYLE, RTL_TEXT_STYLE } from "@/localization/direction";
import { cairo } from "@/theme/typography";

import { PLAY_ICON_XML } from "../constants/iconXml";
import { newsImageSource } from "../constants/images";
import type { NewsItem } from "../types";
import NewsMetaRow from "./NewsMetaRow";

type NewsCardProps = {
  item: NewsItem;
  onPress: () => void;
};

export default function NewsCard({ item, onPress }: NewsCardProps) {
  const { t } = useTranslation();

  return (
    <Pressable
      accessibilityRole="button"
      onPress={onPress}
      className="w-full gap-2.5 overflow-hidden border border-slate-100 bg-white p-3"
    >
      <View className="h-[132px] w-full items-center justify-center overflow-hidden rounded-lg">
        <Image
          source={newsImageSource(item.imageId)}
          style={{ width: "100%", height: "100%", position: "absolute" }}
          contentFit="cover"
        />
        <View className="absolute inset-0 bg-black/20" />
        {item.hasVideo ? (
          <SvgXml xml={PLAY_ICON_XML} width={46} height={47} />
        ) : null}
      </View>

      <View className="w-full items-start gap-3">
        <View className="rounded-3xl bg-primary/50 px-3 py-1.5">
          <Text
            className="text-[10px] text-slate-50"
            style={{ fontFamily: cairo.medium, ...RTL_TEXT_STYLE }}
          >
            {t(`news.categories.${item.category}`)}
          </Text>
        </View>
        <Text
          className="text-sm text-accent"
          style={{ fontFamily: cairo.bold, ...RTL_TEXT_STYLE }}
        >
          {t(item.titleKey)}
        </Text>
        <Text
          className="text-[10px] text-slate-500"
          style={{ fontFamily: cairo.medium, ...RTL_TEXT_STYLE }}
        >
          {t(item.summaryKey)}
        </Text>
        {item.meta ? (
          <View className="w-full" style={RTL_CONTAINER_STYLE}>
            <NewsMetaRow meta={item.meta} />
          </View>
        ) : null}
      </View>
    </Pressable>
  );
}
