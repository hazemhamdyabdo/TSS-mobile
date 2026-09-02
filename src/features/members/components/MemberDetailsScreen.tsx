import { useLocalSearchParams } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useMemo, useRef } from "react";
import { useTranslation } from "react-i18next";
import { ScrollView, Text, View } from "react-native";

import ScreenSafeAreaView from "@/components/ScreenSafeAreaView";
import CreateScreenHeader from "@/features/create/components/CreateScreenHeader";
import { RTL_CONTAINER_STYLE, RTL_TEXT_STYLE } from "@/localization/direction";
import { cairo } from "@/theme/typography";

import { useMembersState } from "../hooks/useMembersState";
import type { MemberCategory } from "../types";
import MemberHeroCard from "./MemberHeroCard";
import MemberOverviewRowView from "./MemberOverviewRowView";
import MemberQrBottomSheet, {
  type MemberQrBottomSheetRef,
} from "./MemberQrBottomSheet";
import MemberSanctionsList from "./MemberSanctionsList";

export default function MemberDetailsScreen() {
  const { t } = useTranslation();
  const rawId = useLocalSearchParams<{ id: string | string[] }>().id;
  const id = Array.isArray(rawId) ? rawId[0] : rawId;
  const state = useMembersState();
  const qrRef = useRef<MemberQrBottomSheetRef>(null);

  const member = useMemo(
    () => state.items.find((item) => item.id === id),
    [id, state.items],
  );

  if (!member || member.category === "administrator") {
    return (
      <ScreenSafeAreaView
        className="flex-1 bg-background"
        edges={["top", "bottom"]}
        style={RTL_CONTAINER_STYLE}
      >
        <StatusBar style="auto" />
        <CreateScreenHeader title={t("members.details.player")} />
        <View className="flex-1 items-center justify-center px-5">
          <Text
            className="text-sm text-slate-400"
            style={{ fontFamily: cairo.medium, ...RTL_TEXT_STYLE }}
          >
            {t("members.notFound")}
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
      <CreateScreenHeader title={t(detailsTitleKey(member.category))} />
      <ScrollView
        className="flex-1"
        contentContainerClassName="gap-3 px-5 pb-8"
        showsVerticalScrollIndicator={false}
      >
        <MemberHeroCard
          member={member}
          onQrPress={() => qrRef.current?.open()}
        />
        <View className="gap-4">
          <Text
            className="text-sm text-accent"
            style={{ fontFamily: cairo.semiBold, ...RTL_TEXT_STYLE }}
          >
            {t(overviewTitleKey(member.category))}
          </Text>
          <View className="gap-2 rounded-[8px] border border-slate-100 bg-white p-3">
            {member.overview.map((row) => (
              <MemberOverviewRowView
                key={`${row.labelKey}-${row.valueKey ?? row.value}`}
                row={row}
              />
            ))}
          </View>
        </View>
        <MemberSanctionsList sanctions={member.sanctions} />
      </ScrollView>
      <MemberQrBottomSheet
        ref={qrRef}
        federationId={member.federationId}
        category={member.category}
      />
    </ScreenSafeAreaView>
  );
}

function detailsTitleKey(category: Exclude<MemberCategory, "administrator">) {
  switch (category) {
    case "player":
      return "members.details.player";
    case "coach":
      return "members.details.coach";
    case "referee":
      return "members.details.referee";
    default: {
      const exhaustive: never = category;
      throw new Error(`Unhandled details title: ${exhaustive}`);
    }
  }
}

function overviewTitleKey(category: Exclude<MemberCategory, "administrator">) {
  switch (category) {
    case "player":
      return "members.overview.player";
    case "coach":
      return "members.overview.coach";
    case "referee":
      return "members.overview.referee";
    default: {
      const exhaustive: never = category;
      throw new Error(`Unhandled overview title: ${exhaustive}`);
    }
  }
}
