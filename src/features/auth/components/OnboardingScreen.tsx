import { useRouter } from "expo-router";
import { useTranslation } from "react-i18next";
import { Image, Pressable, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { RTL_TEXT_STYLE } from "@/localization/direction";
import { cairo } from "@/theme/typography";
import AuthHeroBackground from "./AuthHeroBackground";

const startIcon = require("@/assets/images/start-icon.png");

export default function OnboardingScreen() {
  const { t } = useTranslation();
  const router = useRouter();
  const insets = useSafeAreaInsets();
  return (
    <AuthHeroBackground>
      <View
        className="flex-1 justify-end px-5"
        style={{
          paddingBottom: Math.max(insets.bottom, 32),
          paddingTop: insets.top,
        }}
      >
        <View className="w-[266px] items-start gap-6 self-start">
          <View className="w-full items-start gap-3">
            <Text
              className="w-full text-[60px] leading-[72px] text-slate-50"
              style={{ fontFamily: cairo.bold, ...RTL_TEXT_STYLE }}
            >
              {`${t("auth.onboardingTitleLine1")}\n${t("auth.onboardingTitleLine2")}`}
            </Text>
            <Text
              className="w-full text-[26px] leading-6.5 text-slate-200"
              style={{ fontFamily: cairo.medium, ...RTL_TEXT_STYLE }}
            >
              {t("auth.onboardingSubtitle")}
            </Text>
          </View>

          <Pressable
            accessibilityRole="button"
            onPress={() => router.push("/(auth)/login")}
            className="h-11 w-29 flex-row items-center justify-center gap-2 rounded-full bg-primary px-4"
          >
            <Text
              className="text-base text-white"
              style={{ fontFamily: cairo.medium }}
            >
              {t("auth.start")}
            </Text>
            <Image source={startIcon} />
          </Pressable>
        </View>
      </View>
    </AuthHeroBackground>
  );
}
