import { StatusBar } from "expo-status-bar";
import { useTranslation } from "react-i18next";
import { Text, View } from "react-native";

import ScreenSafeAreaView from "@/components/ScreenSafeAreaView";
import CreateScreenHeader from "@/features/create/components/CreateScreenHeader";
import { RTL_CONTAINER_STYLE, RTL_TEXT_STYLE } from "@/localization/direction";
import { cairo } from "@/theme/typography";

type MoreInfoScreenProps = {
  titleKey: string;
  bodyKey: string;
};

export default function MoreInfoScreen({
  titleKey,
  bodyKey,
}: MoreInfoScreenProps) {
  const { t } = useTranslation();

  return (
    <ScreenSafeAreaView
      className="flex-1 bg-background"
      edges={["top", "bottom"]}
      style={RTL_CONTAINER_STYLE}
    >
      <StatusBar style="auto" />
      <CreateScreenHeader title={t(titleKey)} />
      <View className="px-5 pt-4">
        <View className="w-full overflow-hidden rounded-lg border border-slate-100 bg-white p-6">
          <Text
            className="w-full text-sm leading-6 text-slate-400"
            style={{ fontFamily: cairo.regular, ...RTL_TEXT_STYLE }}
          >
            {t(bodyKey)}
          </Text>
        </View>
      </View>
    </ScreenSafeAreaView>
  );
}
