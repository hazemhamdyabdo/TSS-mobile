import { StatusBar } from "expo-status-bar";
import { useTranslation } from "react-i18next";
import { Text, View } from "react-native";

import ScreenSafeAreaView from "@/components/ScreenSafeAreaView";
import CreateScreenHeader from "@/features/create/components/CreateScreenHeader";
import { RTL_CONTAINER_STYLE, RTL_TEXT_STYLE } from "@/localization/direction";
import { cairo } from "@/theme/typography";

import type { MoreHubId } from "../types";

type MorePlaceholderScreenProps = {
  section: Exclude<MoreHubId, "settings">;
};

export default function MorePlaceholderScreen({
  section,
}: MorePlaceholderScreenProps) {
  const { t } = useTranslation();

  return (
    <ScreenSafeAreaView
      className="flex-1 bg-background"
      edges={["top", "bottom"]}
      style={RTL_CONTAINER_STYLE}
    >
      <StatusBar style="dark" />
      <CreateScreenHeader title={t(`more.hub.items.${section}.title`)} />
      <View className="flex-1 items-center justify-center px-5">
        <Text
          className="w-full text-sm text-slate-400"
          style={{ fontFamily: cairo.regular, ...RTL_TEXT_STYLE }}
        >
          {t("more.placeholder.body")}
        </Text>
      </View>
    </ScreenSafeAreaView>
  );
}
