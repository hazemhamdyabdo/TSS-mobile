import { StatusBar } from "expo-status-bar";
import { useTranslation } from "react-i18next";
import { Pressable, Text, View } from "react-native";
import { SvgXml } from "react-native-svg";

import ScreenSafeAreaView from "@/components/ScreenSafeAreaView";
import CreateScreenHeader from "@/features/create/components/CreateScreenHeader";
import { RTL_CONTAINER_STYLE, RTL_TEXT_STYLE } from "@/localization/direction";
import { cairo } from "@/theme/typography";

import { FLAG_SA_ICON_XML, FLAG_US_ICON_XML } from "../constants/iconXml";

type LanguageOptionId = "ar" | "en";

function flagXmlForLanguage(id: LanguageOptionId) {
  switch (id) {
    case "ar":
      return FLAG_SA_ICON_XML;
    case "en":
      return FLAG_US_ICON_XML;
    default: {
      const exhaustive: never = id;
      throw new Error(`Unhandled language option: ${exhaustive}`);
    }
  }
}

const LANGUAGE_OPTIONS: LanguageOptionId[] = ["ar", "en"];

export default function LanguageScreen() {
  const { t } = useTranslation();
  const selected: LanguageOptionId = "ar";

  return (
    <ScreenSafeAreaView
      className="flex-1 bg-background"
      edges={["top", "bottom"]}
      style={RTL_CONTAINER_STYLE}
    >
      <StatusBar style="auto" />
      <CreateScreenHeader title={t("more.language.title")} />
      <View className="gap-3 px-5 pt-4">
        <View className="w-full items-start gap-3">
          <Text
            className="w-full text-lg capitalize text-accent"
            style={{ fontFamily: cairo.semiBold, ...RTL_TEXT_STYLE }}
          >
            {t("more.language.heading")}
          </Text>
          <Text
            className="w-full text-xs text-slate-400"
            style={{ fontFamily: cairo.regular, ...RTL_TEXT_STYLE }}
          >
            {t("more.language.subtitle")}
          </Text>
        </View>

        <View className="w-full gap-2">
          {LANGUAGE_OPTIONS.map((optionId) => {
            const isSelected = optionId === selected;
            return (
              <Pressable
                key={optionId}
                accessibilityRole="radio"
                accessibilityState={{ selected: isSelected }}
                className={`w-full flex-row items-center justify-between overflow-hidden border border-slate-100 bg-white px-[26px] py-[25px] ${
                  isSelected ? "rounded-2xl" : "rounded-lg"
                }`}
                style={RTL_CONTAINER_STYLE}
              >
                <View
                  className="flex-row items-center gap-3"
                  style={RTL_CONTAINER_STYLE}
                >
                  <View className="size-fit overflow-hidden rounded-xl">
                      <SvgXml
                      xml={flagXmlForLanguage(optionId)}
                      width={30}
                      height={30}
                    />
                  </View>
                  <View className="items-start gap-1">
                    <Text
                      className="text-base capitalize text-accent"
                      style={{ fontFamily: cairo.medium, ...RTL_TEXT_STYLE }}
                    >
                      {t(`more.language.options.${optionId}.name`)}
                    </Text>
                    <Text
                      className="text-xs capitalize text-accent"
                      style={{ fontFamily: cairo.regular, ...RTL_TEXT_STYLE }}
                    >
                      {t(`more.language.options.${optionId}.region`)}
                    </Text>
                  </View>
                </View>
                <View
                  className={`size-6 items-center justify-center overflow-hidden rounded-full border ${
                    isSelected ? "border-primary" : "border-slate-300"
                  }`}
                >
                  {isSelected ? (
                    <View className="size-3 rounded-full bg-primary" />
                  ) : null}
                </View>
              </Pressable>
            );
          })}

          <View className="w-full items-start gap-4 overflow-hidden rounded-lg border border-slate-100 bg-white px-[26px] py-[25px]">
            <Text
              className="w-full text-base capitalize text-accent"
              style={{ fontFamily: cairo.medium, ...RTL_TEXT_STYLE }}
            >
              {t("more.language.noteTitle")}
            </Text>
            <Text
              className="w-full text-[13px] text-slate-400"
              style={{ fontFamily: cairo.regular, ...RTL_TEXT_STYLE }}
            >
              {t("more.language.noteBody")}
            </Text>
          </View>
        </View>
      </View>
    </ScreenSafeAreaView>
  );
}
