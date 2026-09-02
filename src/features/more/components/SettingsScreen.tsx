import { useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useTranslation } from "react-i18next";
import { Alert, ScrollView, Text, View } from "react-native";

import ScreenSafeAreaView from "@/components/ScreenSafeAreaView";
import { signOut } from "@/features/auth/api";
import CreateScreenHeader from "@/features/create/components/CreateScreenHeader";
import { RTL_CONTAINER_STYLE, RTL_TEXT_STYLE } from "@/localization/direction";
import { cairo } from "@/theme/typography";

import { setDarkMode } from "../api";
import { APP_COPYRIGHT_YEAR, APP_VERSION_LABEL } from "../constants/app";
import { useMoreState } from "../hooks/useMoreState";
import SettingsProfileCard from "./SettingsProfileCard";
import SettingsRow from "./SettingsRow";

export default function SettingsScreen() {
  const { t } = useTranslation();
  const router = useRouter();
  const { profile, darkMode } = useMoreState();

  const handleLogout = () => {
    Alert.alert(t("more.settings.logout"), t("more.settings.logoutConfirm"), [
      { text: t("common.cancel"), style: "cancel" },
      {
        text: t("more.settings.logout"),
        style: "destructive",
        onPress: async () => {
          await signOut();
          router.replace("/");
        },
      },
    ]);
  };

  return (
    <ScreenSafeAreaView
      className="flex-1 bg-background"
      edges={["top", "bottom"]}
      style={RTL_CONTAINER_STYLE}
    >
      <StatusBar style="auto" />
      <CreateScreenHeader title={t("more.settings.title")} />
      <ScrollView
        className="flex-1"
        contentContainerClassName="gap-4 px-5 pb-8 pt-2"
        showsVerticalScrollIndicator={false}
      >
        <SettingsProfileCard profile={profile} />

        <View className="w-full gap-4">
          <Text
            className="w-full text-xs capitalize tracking-[0.1px] text-accent"
            style={{ fontFamily: cairo.medium, ...RTL_TEXT_STYLE }}
          >
            {t("more.settings.sections.profile")}
          </Text>
          <SettingsRow
            rowId="profile"
            label={t("more.settings.rows.profile")}
            onPress={() => router.push("/profile")}
          />
        </View>

        <View className="w-full gap-4">
          <Text
            className="w-full text-xs capitalize tracking-[0.1px] text-accent"
            style={{ fontFamily: cairo.medium, ...RTL_TEXT_STYLE }}
          >
            {t("more.settings.sections.app")}
          </Text>
          <View>
            <SettingsRow
              rowId="notifications"
              label={t("more.settings.rows.notifications")}
              position="first"
              onPress={() => router.push("/notifications")}
            />
            <SettingsRow
              rowId="language"
              label={t("more.settings.rows.language")}
              position="last"
              onPress={() => router.push("/language")}
            />
          </View>
        </View>

        <View className="w-full gap-4">
          <Text
            className="w-full text-xs capitalize tracking-[0.1px] text-accent"
            style={{ fontFamily: cairo.medium, ...RTL_TEXT_STYLE }}
          >
            {t("more.settings.sections.about")}
          </Text>
          <View>
            <SettingsRow
              rowId="privacy"
              label={t("more.settings.rows.privacy")}
              position="first"
              onPress={() => router.push("/privacy")}
            />
            <SettingsRow
              rowId="help"
              label={t("more.settings.rows.help")}
              position="middle"
              onPress={() => router.push("/help")}
            />
            <SettingsRow
              rowId="darkMode"
              label={t("more.settings.rows.darkMode")}
              variant="switch"
              position="middle"
              switchValue={darkMode}
              onSwitchChange={(value) => {
                void setDarkMode(value);
              }}
            />
            <SettingsRow
              rowId="logout"
              label={t("more.settings.logout")}
              variant="action"
              tone="danger"
              position="last"
              onPress={handleLogout}
            />
          </View>
        </View>

        <View className="items-center gap-2 pt-2">
          <Text
            className="text-sm text-slate-400"
            style={{ fontFamily: cairo.regular, ...RTL_TEXT_STYLE }}
          >
            {APP_VERSION_LABEL}
          </Text>
          <Text
            className="text-sm text-slate-400"
            style={{ fontFamily: cairo.regular, ...RTL_TEXT_STYLE }}
          >
            {`© ${APP_COPYRIGHT_YEAR} Fencing.sa LLC`}
          </Text>
        </View>
      </ScrollView>
    </ScreenSafeAreaView>
  );
}
