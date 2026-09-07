import { useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useTranslation } from "react-i18next";
import { Pressable, ScrollView, Text, View } from "react-native";

import ScreenSafeAreaView from "@/components/ScreenSafeAreaView";
import { useAuthState } from "@/features/auth/hooks/useAuthState";
import CreateScreenHeader from "@/features/create/components/CreateScreenHeader";
import { RTL_CONTAINER_STYLE, RTL_TEXT_STYLE } from "@/localization/direction";
import { cairo } from "@/theme/typography";

import {
  GUEST_MORE_HUB_ACTIONS,
  MORE_HUB_ACTIONS,
} from "../constants/actions";
import MoreHubIcon from "./MoreHubIcon";

export default function MoreScreen() {
  const { t } = useTranslation();
  const router = useRouter();
  const { session } = useAuthState();
  const isGuest = Boolean(session?.isGuest);
  const actions = isGuest ? GUEST_MORE_HUB_ACTIONS : MORE_HUB_ACTIONS;

  return (
    <ScreenSafeAreaView
      className="flex-1 bg-background"
      edges={["top"]}
      style={RTL_CONTAINER_STYLE}
    >
      <StatusBar style="auto" />
      <CreateScreenHeader
        title={t("more.hub.title")}
        onBack={() => router.navigate("/(tabs)")}
      />
      <ScrollView
        className="flex-1"
        contentContainerClassName="gap-2 px-5 pb-8 pt-4"
        showsVerticalScrollIndicator={false}
      >
        {actions.map((action) => (
          <Pressable
            key={action.id}
            accessibilityRole="button"
            onPress={() => router.push(action.href)}
            className="w-full flex-row items-center gap-3 overflow-hidden rounded-lg border border-slate-100 bg-white p-4"
            style={RTL_CONTAINER_STYLE}
          >
            <View className="size-10 items-center justify-center overflow-hidden rounded-lg bg-primary/10">
              <MoreHubIcon actionId={action.id} />
            </View>
            <View className="min-w-0 flex-1 items-start gap-1">
              <Text
                className="w-full text-sm capitalize text-accent"
                style={{ fontFamily: cairo.medium, ...RTL_TEXT_STYLE }}
              >
                {t(action.titleKey)}
              </Text>
              <Text
                className="w-full text-xs text-slate-400"
                style={{ fontFamily: cairo.regular, ...RTL_TEXT_STYLE }}
              >
                {t(action.subtitleKey)}
              </Text>
            </View>
          </Pressable>
        ))}
      </ScrollView>
    </ScreenSafeAreaView>
  );
}
