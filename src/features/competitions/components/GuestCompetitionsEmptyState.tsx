import { Image } from "expo-image";
import { useTranslation } from "react-i18next";
import { Text, View } from "react-native";

import { RTL_TEXT_STYLE } from "@/localization/direction";
import { cairo } from "@/theme/typography";

const emptyIllustration = require("@/assets/images/empty-competitions.png");

export default function GuestCompetitionsEmptyState() {
  const { t } = useTranslation();

  return (
    <View className="flex-1 items-center justify-center px-5 py-10">
      <View className="size-[171px] items-center justify-center overflow-hidden">
        <Image
          source={emptyIllustration}
          style={{ width: 171, height: 171 }}
          contentFit="contain"
        />
      </View>
      <View className="mt-6 items-center gap-2">
        <Text
          className="text-sm text-accent"
          style={{ fontFamily: cairo.semiBold, ...RTL_TEXT_STYLE }}
        >
          {t("competitions.empty.title")}
        </Text>
        <Text
          className="text-xs text-slate-400"
          style={{ fontFamily: cairo.regular, ...RTL_TEXT_STYLE }}
        >
          {t("competitions.empty.subtitle")}
        </Text>
      </View>
    </View>
  );
}
