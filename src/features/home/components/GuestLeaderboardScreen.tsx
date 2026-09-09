import { MaterialDesignIcons } from "@react-native-vector-icons/material-design-icons";
import { StatusBar } from "expo-status-bar";
import { useMemo, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { Pressable, ScrollView, Text, TextInput, View } from "react-native";

import OptionPickerBottomSheet, {
  type OptionPickerBottomSheetRef,
} from "@/components/form/OptionPickerBottomSheet";
import ScreenSafeAreaView from "@/components/ScreenSafeAreaView";
import CreateScreenHeader from "@/features/create/components/CreateScreenHeader";
import { useMockListFetch } from "@/hooks/useMockListFetch";
import {
  RTL_CONTAINER_STYLE,
  RTL_TEXT_STYLE,
  TEXT_INPUT_START_ALIGN,
} from "@/localization/direction";
import { colors } from "@/theme/colors";
import { cairo } from "@/theme/typography";

import { getHome } from "../api";
import { useHomeState } from "../hooks/useHomeState";
import LeaderboardPodium from "./LeaderboardPodium";
import LeaderboardRow from "./LeaderboardRow";

type RankingFilter = "all" | "topThree" | "myPosition";

const FILTER_OPTIONS = [
  { value: "all", labelKey: "home.guest.ranking.filters.all" },
  { value: "topThree", labelKey: "home.guest.ranking.filters.topThree" },
  { value: "myPosition", labelKey: "home.guest.ranking.filters.myPosition" },
];

type GuestLeaderboardScreenProps = {
  highlightCurrentUser?: boolean;
};

export default function GuestLeaderboardScreen({
  highlightCurrentUser = false,
}: GuestLeaderboardScreenProps) {
  const { t } = useTranslation();
  const home = useHomeState();
  const isLoading = useMockListFetch(getHome);
  const { podium, list } = home.leaderboard;
  const filterSheetRef = useRef<OptionPickerBottomSheetRef>(null);
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState<RankingFilter>("all");
  const isFiltering = query.trim().length > 0 || filter !== "all";

  const filteredEntries = useMemo(() => {
    const normalized = query.trim().toLowerCase();
    const entries = [...podium, ...list];

    return entries.filter((entry) => {
      if (filter === "topThree" && entry.rank > 3) {
        return false;
      }
      if (filter === "myPosition" && !entry.isCurrentUser) {
        return false;
      }
      if (!normalized) {
        return true;
      }

      const haystack =
        `${t(entry.nameKey)} ${entry.rank} ${entry.points}`.toLowerCase();
      return haystack.includes(normalized);
    });
  }, [filter, list, podium, query, t]);

  return (
    <ScreenSafeAreaView
      className="flex-1 bg-background"
      edges={["top"]}
      style={RTL_CONTAINER_STYLE}
    >
      <StatusBar style="auto" />
      <CreateScreenHeader
        title={t("home.guest.ranking.title")}
        showBack={false}
      />

      {isLoading ? (
        <View className="flex-1 gap-4 px-5 pt-4 pb-28">
          <View className="h-[42px] w-full rounded-lg bg-slate-100" />
          <View className="h-[199px] w-[299px] self-center rounded-full bg-slate-100" />
          <View className="h-12 w-full rounded-lg bg-slate-100" />
          <View className="flex-1 rounded-t-[32px] bg-white p-5">
            <View className="gap-2">
              {Array.from({ length: 6 }).map((_, index) => (
                <View key={index} className="h-12 rounded-lg bg-slate-100" />
              ))}
            </View>
          </View>
        </View>
      ) : (
        <ScrollView
          className="flex-1"
          contentContainerClassName="gap-4 pb-28"
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          <View
            className="flex-row items-center gap-2 px-5 pt-4"
            style={RTL_CONTAINER_STYLE}
          >
            <View
              className="h-[42px] min-w-0 flex-1 flex-row items-center gap-2 rounded-lg border border-slate-100 bg-white px-4"
              style={RTL_CONTAINER_STYLE}
            >
              <MaterialDesignIcons
                name="magnify"
                size={20}
                color={colors.primary}
              />
              <TextInput
                value={query}
                onChangeText={setQuery}
                placeholder={t("home.guest.ranking.search")}
                placeholderTextColor={colors.slate300}
                textAlign={TEXT_INPUT_START_ALIGN}
                returnKeyType="search"
                className="min-w-0 flex-1 text-xs tracking-[0.1px] text-label"
                style={{ fontFamily: cairo.regular }}
              />
            </View>
            <Pressable
              accessibilityRole="button"
              accessibilityLabel={t("home.guest.ranking.filter")}
              onPress={() => filterSheetRef.current?.open()}
              className="h-10 flex-row items-center gap-1 rounded-lg bg-primary px-3"
              style={RTL_CONTAINER_STYLE}
            >
              <MaterialDesignIcons
                name="filter-outline"
                size={16}
                color={colors.background}
              />
              <Text
                className="text-sm leading-[17px] tracking-[0.1px] text-background"
                style={{ fontFamily: cairo.regular }}
              >
                {t("home.guest.ranking.filter")}
              </Text>
            </Pressable>
          </View>

          {isFiltering ? (
            <View className="mx-5 rounded-[24px] bg-white p-5">
              {filteredEntries.length === 0 ? (
                <Text
                  className="py-8 text-center text-xs text-slate-400"
                  style={{ fontFamily: cairo.regular, ...RTL_TEXT_STYLE }}
                >
                  {t("home.guest.ranking.empty")}
                </Text>
              ) : (
                <View className="w-full gap-2">
                  {filteredEntries.map((entry) => (
                    <LeaderboardRow
                      key={entry.id}
                      entry={entry}
                      highlightCurrentUser={highlightCurrentUser}
                    />
                  ))}
                </View>
              )}
            </View>
          ) : (
            <>
              <LeaderboardPodium podium={podium} />

              <View className="w-full rounded-t-[32px] border border-slate-100 bg-white p-5">
                <View className="w-full gap-2">
                  {list.map((entry) => (
                    <LeaderboardRow
                      key={entry.id}
                      entry={entry}
                      highlightCurrentUser={highlightCurrentUser}
                    />
                  ))}
                </View>
              </View>
            </>
          )}
        </ScrollView>
      )}

      <OptionPickerBottomSheet
        ref={filterSheetRef}
        options={FILTER_OPTIONS}
        selectedValue={filter}
        onSelect={(value) => setFilter(value as RankingFilter)}
      />
    </ScreenSafeAreaView>
  );
}
