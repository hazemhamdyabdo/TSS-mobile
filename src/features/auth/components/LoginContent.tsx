import { useTranslation } from "react-i18next";
import { Text, View } from "react-native";

import { RTL_TEXT_STYLE } from "@/localization/direction";
import { cairo } from "@/theme/typography";

import LoginForm from "./LoginForm";

type LoginContentProps = {
  onOtpRequested?: (phone: string) => void;
  onContactPress?: () => void;
};

export default function LoginContent({
  onOtpRequested,
  onContactPress,
}: LoginContentProps) {
  const { t } = useTranslation();

  return (
    <View className="w-full items-center gap-8 py-2">
      <View className="w-full items-start gap-1.5 px-5">
        <Text
          className="w-full text-xl leading-[26px] text-accent"
          style={{ fontFamily: cairo.bold, ...RTL_TEXT_STYLE }}
        >
          {t("auth.loginTitle")}
        </Text>
        <Text
          className="w-full text-sm leading-[14px] text-sec-text"
          style={{ fontFamily: cairo.regular, ...RTL_TEXT_STYLE }}
        >
          {t("auth.loginSubtitle")}
        </Text>
      </View>
      <LoginForm
        onOtpRequested={onOtpRequested}
        onContactPress={onContactPress}
      />
    </View>
  );
}
