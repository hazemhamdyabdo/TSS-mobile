import { MaterialDesignIcons } from "@react-native-vector-icons/material-design-icons";
import { StatusBar } from "expo-status-bar";
import { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { Pressable, ScrollView, Text, TextInput, View } from "react-native";

import ScreenSafeAreaView from "@/components/ScreenSafeAreaView";
import CreateScreenHeader from "@/features/create/components/CreateScreenHeader";
import {
  RTL_CONTAINER_STYLE,
  RTL_TEXT_STYLE,
  TEXT_INPUT_START_ALIGN,
} from "@/localization/direction";
import { colors } from "@/theme/colors";
import { cairo } from "@/theme/typography";

import {
  DUMMY_FENCING_LAW_SECTIONS,
  FENCING_LAW_FILTERS,
} from "../constants/fencingLaws";
import type {
  FencingLawArticle,
  FencingLawFilter,
  FencingLawSectionId,
} from "../types";
import FencingLawSectionAccordion from "./FencingLawSectionAccordion";

function articleMatchesQuery(
  article: FencingLawArticle,
  query: string,
  t: (key: string) => string,
): boolean {
  switch (article.kind) {
    case "explanation":
      return (
        t(article.titleKey).toLowerCase().includes(query) ||
        t(article.bodyKey).toLowerCase().includes(query)
      );
    case "penalties":
      return article.items.some(
        (item) =>
          t(item.titleKey).toLowerCase().includes(query) ||
          t(item.bodyKey).toLowerCase().includes(query),
      );
    case "bullets":
      return (
        t(article.titleKey).toLowerCase().includes(query) ||
        article.bulletKeys.some((key) => t(key).toLowerCase().includes(query))
      );
    default: {
      const exhaustive: never = article;
      return exhaustive;
    }
  }
}

export default function FencingLawsScreen() {
  const { t } = useTranslation();
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState<FencingLawFilter>("all");
  const [expandedIds, setExpandedIds] = useState<FencingLawSectionId[]>([]);

  const sections = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();

    return DUMMY_FENCING_LAW_SECTIONS.filter((section) => {
      if (filter !== "all" && section.id !== filter) {
        return false;
      }

      if (!normalizedQuery) {
        return true;
      }

      if (t(section.titleKey).toLowerCase().includes(normalizedQuery)) {
        return true;
      }

      return section.articles.some((article) =>
        articleMatchesQuery(article, normalizedQuery, t),
      );
    }).map((section) => {
      if (!normalizedQuery) {
        return section;
      }

      return {
        ...section,
        articles: section.articles.filter((article) =>
          articleMatchesQuery(article, normalizedQuery, t),
        ),
      };
    });
  }, [filter, query, t]);

  const toggleSection = (id: FencingLawSectionId) => {
    setExpandedIds((current) =>
      current.includes(id)
        ? current.filter((item) => item !== id)
        : [...current, id],
    );
  };

  return (
    <ScreenSafeAreaView
      className="flex-1 bg-background"
      edges={["top", "bottom"]}
      style={RTL_CONTAINER_STYLE}
    >
      <StatusBar style="auto" />
      <CreateScreenHeader title={t("more.hub.items.laws.title")} />
      <ScrollView
        className="flex-1"
        contentContainerClassName="gap-4 px-5 pb-8 pt-4"
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        <View
          className="h-[42px] w-full flex-row items-center gap-2 rounded-lg border border-slate-100 bg-white px-4"
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
            placeholder={t("more.fencingLaws.search")}
            placeholderTextColor={colors.slate300}
            textAlign={TEXT_INPUT_START_ALIGN}
            returnKeyType="search"
            className="min-w-0 flex-1 text-xs tracking-[0.1px] text-label"
            style={{ fontFamily: cairo.regular }}
          />
        </View>

        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerClassName="flex-row items-center gap-2"
          style={RTL_CONTAINER_STYLE}
        >
          {FENCING_LAW_FILTERS.map((chip) => {
            const selected = chip === filter;

            return (
              <Pressable
                key={chip}
                accessibilityRole="button"
                onPress={() => setFilter(chip)}
                className={`shrink-0 items-center justify-center rounded-[22px] px-3 py-3 ${
                  selected
                    ? "bg-primary/10"
                    : "border-[0.7px] border-slate-100 bg-transparent"
                }`}
              >
                <Text
                  className="text-sm tracking-[0.1px]"
                  style={{
                    color: selected ? colors.primary : colors.slate400,
                    fontFamily: selected ? cairo.semiBold : cairo.regular,
                    ...RTL_TEXT_STYLE,
                  }}
                >
                  {t(`more.fencingLaws.filters.${chip}`)}
                </Text>
              </Pressable>
            );
          })}
        </ScrollView>

        <View className="gap-2">
          {sections.map((section) => (
            <FencingLawSectionAccordion
              key={section.id}
              section={section}
              expanded={expandedIds.includes(section.id)}
              onToggle={() => toggleSection(section.id)}
            />
          ))}
        </View>
      </ScrollView>
    </ScreenSafeAreaView>
  );
}
