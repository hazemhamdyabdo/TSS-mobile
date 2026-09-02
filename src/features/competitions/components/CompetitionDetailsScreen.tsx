import { MaterialDesignIcons } from "@react-native-vector-icons/material-design-icons";
import { useLocalSearchParams, useRouter, type Href } from "expo-router";
import { useMemo, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { Alert, Pressable, ScrollView, Text, View } from "react-native";

import ScreenSafeAreaView from "@/components/ScreenSafeAreaView";
import CreateBackButton from "@/features/create/components/CreateBackButton";
import { getMockErrorMessage } from "@/utils/formErrors";
import { RTL_CONTAINER_STYLE, RTL_TEXT_STYLE } from "@/localization/direction";
import { colors } from "@/theme/colors";
import { cairo } from "@/theme/typography";

import { StatusBar } from "expo-status-bar";
import { deleteCompetition } from "../api";
import { useCompetitionsState } from "../hooks/useCompetitionsState";
import type { CompetitionDetailTab } from "../types";
import CompetitionHero from "./CompetitionHero";
import CompetitionInfoTab from "./CompetitionInfoTab";
import CompetitionOptionsBottomSheet, {
  type CompetitionOptionsBottomSheetRef,
} from "./CompetitionOptionsBottomSheet";
import CompetitionParticipantsTab from "./CompetitionParticipantsTab";
import CompetitionResultsTab from "./CompetitionResultsTab";
import CompetitionSegmentedTabs from "./CompetitionSegmentedTabs";

export default function CompetitionDetailsScreen() {
  const { t } = useTranslation();
  const router = useRouter();
  const rawId = useLocalSearchParams<{ id: string | string[] }>().id;
  const id = Array.isArray(rawId) ? rawId[0] : rawId;
  const state = useCompetitionsState();
  const optionsRef = useRef<CompetitionOptionsBottomSheetRef>(null);
  const [tab, setTab] = useState<CompetitionDetailTab>("info");

  const competition = useMemo(
    () => state.items.find((item) => item.id === id),
    [id, state.items],
  );
  const participants = useMemo(
    () => state.participants.filter((item) => item.competitionId === id),
    [id, state.participants],
  );
  const results = useMemo(
    () => state.results.filter((item) => item.competitionId === id),
    [id, state.results],
  );

  const handleDelete = () => {
    if (!competition) {
      return;
    }

    Alert.alert(
      t("competitions.actions.delete"),
      t("competitions.actions.deleteConfirm"),
      [
        { text: t("common.cancel"), style: "cancel" },
        {
          text: t("common.delete"),
          style: "destructive",
          onPress: async () => {
            try {
              await deleteCompetition(competition.id);
              router.back();
            } catch (error) {
              Alert.alert(
                t("competitions.actions.delete"),
                getMockErrorMessage(error, "competitions.notFound", t),
              );
            }
          },
        },
      ],
    );
  };

  const renderTab = () => {
    if (!competition) {
      return null;
    }

    switch (tab) {
      case "info":
        return <CompetitionInfoTab competition={competition} />;
      case "participants":
        return <CompetitionParticipantsTab participants={participants} />;
      case "results":
        return <CompetitionResultsTab results={results} />;
      default: {
        const exhaustive: never = tab;
        throw new Error(`Unhandled competition tab: ${exhaustive}`);
      }
    }
  };

  return (
    <ScreenSafeAreaView
      className="flex-1 bg-background"
      edges={["top"]}
      style={RTL_CONTAINER_STYLE}
    >
      <StatusBar style="auto" />
      <View
        className="flex-row items-center justify-between px-5 py-3"
        style={RTL_CONTAINER_STYLE}
      >
        <View
          className="flex-row items-center gap-4"
          style={RTL_CONTAINER_STYLE}
        >
          <CreateBackButton />
          <Text
            className="text-base text-accent"
            style={{ fontFamily: cairo.semiBold, ...RTL_TEXT_STYLE }}
          >
            {t("competitions.detailsTitle")}
          </Text>
        </View>
        <Pressable
          accessibilityRole="button"
          accessibilityLabel={t("competitions.actions.more")}
          onPress={() => optionsRef.current?.open()}
          className="size-8 items-center justify-center"
        >
          <MaterialDesignIcons
            name="dots-vertical"
            size={24}
            color={colors.accent}
          />
        </Pressable>
      </View>

      {competition ? (
        <ScrollView
          className="flex-1"
          contentContainerClassName="gap-4 px-5 pb-10"
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          <CompetitionHero competition={competition} />
          <CompetitionSegmentedTabs value={tab} onChange={setTab} />
          {renderTab()}
        </ScrollView>
      ) : (
        <View className="flex-1 items-center justify-center px-5">
          <Text
            className="text-sm text-slate-400"
            style={{ fontFamily: cairo.medium, ...RTL_TEXT_STYLE }}
          >
            {t("competitions.notFound")}
          </Text>
        </View>
      )}

      <CompetitionOptionsBottomSheet
        ref={optionsRef}
        onEdit={() =>
          router.push(
            `/add-competition?id=${competition?.id ?? ""}` as Href,
          )
        }
        onDelete={handleDelete}
      />
    </ScreenSafeAreaView>
  );
}
