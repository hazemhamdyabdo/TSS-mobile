import { useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { Pressable, ScrollView, Text, View } from "react-native";

import ScreenSafeAreaView from "@/components/ScreenSafeAreaView";
import CreateBackButton from "@/features/create/components/CreateBackButton";
import { useMockListFetch } from "@/hooks/useMockListFetch";
import { RTL_CONTAINER_STYLE, RTL_TEXT_STYLE } from "@/localization/direction";
import { cairo } from "@/theme/typography";

import { getCompetitions } from "../api";
import { useCompetitionsState } from "../hooks/useCompetitionsState";
import type { CompetitionFilter, CompetitionStatus } from "../types";
import {
  getCompetitionEventType,
  getCompetitionLocation,
  getCompetitionTitle,
} from "../utils/labels";
import CompetitionSearchField from "./CompetitionSearchField";
import CompetitionsSkeleton from "./CompetitionsSkeleton";
import GuestCompetitionCard from "./GuestCompetitionCard";
import GuestCompetitionsEmptyState from "./GuestCompetitionsEmptyState";

const FILTERS: CompetitionFilter[] = ["all", "ongoing", "upcoming", "ended"];

function countByStatus(
  status: CompetitionStatus,
  items: { status: CompetitionStatus }[],
) {
  return items.filter((item) => item.status === status).length;
}

export default function GuestCompetitionsScreen() {
  const { t } = useTranslation();
  const router = useRouter();
  const state = useCompetitionsState();
  const isLoading = useMockListFetch(getCompetitions);
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState<CompetitionFilter>("all");

  const filteredItems = useMemo(() => {
    const normalized = query.trim().toLowerCase();

    return state.items.filter((item) => {
      if (filter !== "all" && item.status !== filter) {
        return false;
      }

      if (!normalized) {
        return true;
      }

      const haystack =
        `${getCompetitionTitle(item, t)} ${getCompetitionLocation(item, t)} ${getCompetitionEventType(item, t)}`.toLowerCase();
      return haystack.includes(normalized);
    });
  }, [filter, query, state.items, t]);

  const filterCounts: Record<CompetitionFilter, number> = {
    all: state.items.length,
    ongoing: countByStatus("ongoing", state.items),
    upcoming: countByStatus("upcoming", state.items),
    ended: countByStatus("ended", state.items),
  };

  return (
    <ScreenSafeAreaView
      className="flex-1 bg-background"
      edges={["top"]}
      style={RTL_CONTAINER_STYLE}
    >
      <StatusBar style="auto" />
      <ScrollView
        className="flex-1"
        contentContainerClassName="gap-4 px-5 pb-28 pt-2"
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        {isLoading ? (
          <CompetitionsSkeleton guest />
        ) : (
          <>
            <View
              className="h-8 flex-row items-center gap-4"
              style={RTL_CONTAINER_STYLE}
            >
              <CreateBackButton onPress={() => router.navigate("/(tabs)")} />
              <Text
                className="text-base text-accent"
                style={{ fontFamily: cairo.semiBold, ...RTL_TEXT_STYLE }}
              >
                {t("competitions.guest.title")}
              </Text>
            </View>

            <CompetitionSearchField
              value={query}
              placeholder={t("competitions.guest.search")}
              onChangeText={setQuery}
            />

            <View className="flex-row gap-2" style={RTL_CONTAINER_STYLE}>
              {FILTERS.map((item) => {
                const selected = item === filter;

                return (
                  <Pressable
                    key={item}
                    accessibilityRole="button"
                    onPress={() => setFilter(item)}
                    className={`h-[38px] min-w-0 flex-1 flex-row items-center justify-center gap-1.5 rounded-2xl ${
                      selected ? "bg-primary/10" : "bg-slate-50"
                    }`}
                    style={RTL_CONTAINER_STYLE}
                  >
                    <Text
                      className={`text-[10px] ${selected ? "text-primary" : "text-slate-400"}`}
                      style={{
                        fontFamily: cairo.semiBold,
                        ...RTL_TEXT_STYLE,
                      }}
                    >
                      {t(`competitions.filters.${item}`)}
                    </Text>
                    <View
                      className={`h-[17px] min-w-[26px] items-center justify-center rounded-md px-1 ${
                        selected ? "bg-primary" : "bg-white"
                      }`}
                    >
                      <Text
                        className={`text-[10px] ${selected ? "text-white" : "text-slate-400"}`}
                        style={{ fontFamily: cairo.medium }}
                      >
                        {filterCounts[item]}
                      </Text>
                    </View>
                  </Pressable>
                );
              })}
            </View>

            {filteredItems.length === 0 ? (
              <GuestCompetitionsEmptyState />
            ) : (
              <View className="gap-2">
                <Text
                  className="text-xs text-accent"
                  style={{ fontFamily: cairo.semiBold, ...RTL_TEXT_STYLE }}
                >
                  {t("competitions.guest.latest")}
                </Text>
                {filteredItems.map((competition) => (
                  <GuestCompetitionCard
                    key={competition.id}
                    competition={competition}
                  />
                ))}
              </View>
            )}
          </>
        )}
      </ScrollView>
    </ScreenSafeAreaView>
  );
}
