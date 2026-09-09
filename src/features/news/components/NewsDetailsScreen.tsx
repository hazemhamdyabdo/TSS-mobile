import { Image } from "expo-image";
import { useLocalSearchParams } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { Pressable, ScrollView, Text, View } from "react-native";
import { SvgXml } from "react-native-svg";

import ScreenSafeAreaView from "@/components/ScreenSafeAreaView";
import CreateScreenHeader from "@/features/create/components/CreateScreenHeader";
import {
  CALENDAR_ICON_XML,
  FENCING_ICON_XML,
  GLOBE_ICON_XML,
  USERS_GROUP_ICON_XML,
} from "@/features/members/constants/iconXml";
import { RTL_CONTAINER_STYLE, RTL_TEXT_STYLE } from "@/localization/direction";
import { cairo } from "@/theme/typography";

import { getNewsById } from "../constants/dummy";
import {
  DATE_SLATE_ICON_XML,
  LOCATION_SLATE_ICON_XML,
} from "../constants/iconXml";
import { newsImageSource } from "../constants/images";

type StatCardProps = {
  label: string;
  value: string;
  iconXml: string;
  iconSize?: number;
};

function StatCard({ label, value, iconXml, iconSize = 14 }: StatCardProps) {
  return (
    <View className="h-11 min-w-0 flex-1 flex-row items-center justify-between rounded-lg bg-background px-3">
      <View className="flex-row items-center gap-2" style={RTL_CONTAINER_STYLE}>
        <View className="size-6 items-center justify-center rounded-[6px] bg-primary/10">
          <SvgXml xml={iconXml} width={iconSize} height={iconSize} />
        </View>
        <Text
          className="text-xs text-accent"
          style={{ fontFamily: cairo.medium, ...RTL_TEXT_STYLE }}
        >
          {label}
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

export default function NewsDetailsScreen() {
  const { t } = useTranslation();
  const rawId = useLocalSearchParams<{ id: string | string[] }>().id;
  const id = Array.isArray(rawId) ? rawId[0] : rawId;
  const item = useMemo(() => (id ? getNewsById(id) : undefined), [id]);
  const details = item?.details;
  const [activeDayId, setActiveDayId] = useState(
    details?.program[1]?.id ?? details?.program[0]?.id ?? "",
  );

  const activeDay = details?.program.find((day) => day.id === activeDayId);

  if (!item || !details) {
    return (
      <ScreenSafeAreaView
        className="flex-1 bg-background"
        edges={["top", "bottom"]}
        style={RTL_CONTAINER_STYLE}
      >
        <StatusBar style="auto" />
        <CreateScreenHeader title={t("news.title")} />
        <View className="flex-1 items-center justify-center px-5">
          <Text
            className="text-sm text-slate-400"
            style={{ fontFamily: cairo.medium, ...RTL_TEXT_STYLE }}
          >
            {t("news.notFound")}
          </Text>
        </View>
      </ScreenSafeAreaView>
    );
  }

  return (
    <ScreenSafeAreaView
      className="flex-1 bg-background"
      edges={["top", "bottom"]}
      style={RTL_CONTAINER_STYLE}
    >
      <StatusBar style="auto" />
      <CreateScreenHeader title={t(item.titleKey)} />
      <ScrollView
        className="flex-1"
        contentContainerClassName="px-5 pb-8"
        showsVerticalScrollIndicator={false}
      >
        <View className="gap-4 overflow-hidden border border-slate-100 bg-white p-3">
          <View className="h-[183px] w-full overflow-hidden rounded-lg">
            <Image
              source={newsImageSource(
                item.imageId === "national" ? "details" : item.imageId,
              )}
              style={{ width: "100%", height: "100%" }}
              contentFit="cover"
            />
          </View>

          <View className="w-full items-start gap-4">
            <View
              className="flex-row items-center gap-2"
              style={RTL_CONTAINER_STYLE}
            >
              <Text
                className="text-sm text-accent"
                style={{ fontFamily: cairo.bold, ...RTL_TEXT_STYLE }}
              >
                {t(item.titleKey)}
              </Text>
              <View className="h-5 items-center justify-center rounded-3xl bg-slate-200/20 px-1.5">
                <Text
                  className="text-[9px] text-slate-400"
                  style={{ fontFamily: cairo.medium }}
                >
                  {t(details.statusKey)}
                </Text>
              </View>
            </View>
            <Text
              className="text-[10px] text-slate-500"
              style={{ fontFamily: cairo.medium, ...RTL_TEXT_STYLE }}
            >
              {t(details.subtitleKey)}
            </Text>
          </View>

          <View className="w-full items-start gap-2">
            <View
              className="flex-row items-center gap-1"
              style={RTL_CONTAINER_STYLE}
            >
              <SvgXml xml={DATE_SLATE_ICON_XML} width={10} height={10} />
              <Text
                className="text-[10px] text-slate-500"
                style={{ fontFamily: cairo.medium }}
              >
                {t(details.dateRangeKey)}
              </Text>
            </View>
            <View
              className="w-full flex-row items-start gap-1"
              style={RTL_CONTAINER_STYLE}
            >
              <SvgXml xml={LOCATION_SLATE_ICON_XML} width={10} height={10} />
              <Text
                className="min-w-0 flex-1 text-[10px] text-slate-500"
                style={{ fontFamily: cairo.medium, ...RTL_TEXT_STYLE }}
              >
                {t(details.venueKey)}
              </Text>
            </View>
          </View>

          <View className="w-full gap-2">
            <View className="flex-row gap-2" style={RTL_CONTAINER_STYLE}>
              <StatCard
                label={t("news.details.stats.players")}
                value={String(details.playersCount)}
                iconXml={USERS_GROUP_ICON_XML}
              />
              <StatCard
                label={t("news.details.stats.countries")}
                value={String(details.countriesCount)}
                iconXml={GLOBE_ICON_XML}
              />
            </View>
            <View className="flex-row gap-2" style={RTL_CONTAINER_STYLE}>
              <StatCard
                label={t("news.details.stats.weapons")}
                value={t(details.weaponsKey)}
                iconXml={FENCING_ICON_XML}
                iconSize={16}
              />
              <StatCard
                label={t("news.details.stats.duration")}
                value={t(details.durationKey)}
                iconXml={CALENDAR_ICON_XML}
                iconSize={12}
              />
            </View>
          </View>

          <View className="w-full gap-4">
            <Text
              className="text-xs leading-[19px] text-slate-500"
              style={{ fontFamily: cairo.medium, ...RTL_TEXT_STYLE }}
            >
              {t(details.bodyKey)}
            </Text>
            <View
              className="w-full flex-row justify-between"
              style={RTL_CONTAINER_STYLE}
            >
              {[0, 1, 2].map((column) => (
                <View key={column} className="gap-1">
                  {details.countries
                    .slice(column * 3, column * 3 + 3)
                    .map((country) => (
                      <Text
                        key={country.nameKey}
                        className="text-xs text-slate-500"
                        style={{ fontFamily: cairo.medium, ...RTL_TEXT_STYLE }}
                      >
                        {country.flag} {t(country.nameKey)}
                      </Text>
                    ))}
                </View>
              ))}
            </View>
          </View>

          <View className="w-full gap-4">
            <Text
              className="text-sm text-accent"
              style={{ fontFamily: cairo.semiBold, ...RTL_TEXT_STYLE }}
            >
              {t("news.program.title")}
            </Text>
            <View className="w-full flex-row gap-2 rounded-[50px] border border-slate-100 bg-white p-1">
              {details.program.map((day) => {
                const selected = day.id === activeDayId;
                return (
                  <Pressable
                    key={day.id}
                    accessibilityRole="button"
                    onPress={() => setActiveDayId(day.id)}
                    className={`h-10 min-w-0 flex-1 items-center justify-center rounded-[20px] ${
                      selected ? "bg-primary/10" : "bg-transparent"
                    }`}
                  >
                    <Text
                      className={`text-xs ${
                        selected ? "text-primary" : "text-slate-400"
                      }`}
                      style={{
                        fontFamily: selected ? cairo.regular : cairo.semiBold,
                      }}
                    >
                      {t(day.labelKey)}
                    </Text>
                  </Pressable>
                );
              })}
            </View>

            {activeDay ? (
              <View className="w-full items-start gap-2">
                <View
                  className="flex-row items-center gap-1"
                  style={RTL_CONTAINER_STYLE}
                >
                  <SvgXml xml={DATE_SLATE_ICON_XML} width={10} height={10} />
                  <Text
                    className="text-[10px] text-slate-500"
                    style={{ fontFamily: cairo.medium }}
                  >
                    {t(activeDay.dateKey)}
                  </Text>
                </View>
                <View className="w-full items-center justify-center rounded-lg bg-background p-4">
                  <View
                    className="flex-row flex-wrap items-center justify-center gap-4"
                    style={RTL_CONTAINER_STYLE}
                  >
                    {activeDay.itemKeys.map((itemKey) => (
                      <Text
                        key={itemKey}
                        className="text-[10px] text-accent"
                        style={{ fontFamily: cairo.medium, ...RTL_TEXT_STYLE }}
                      >
                        • {t(itemKey)}
                      </Text>
                    ))}
                  </View>
                </View>
              </View>
            ) : null}
          </View>
        </View>
      </ScrollView>
    </ScreenSafeAreaView>
  );
}
