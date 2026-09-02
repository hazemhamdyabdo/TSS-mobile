import AsyncStorage from "@react-native-async-storage/async-storage";
import * as Localization from "expo-localization";
import * as Updates from "expo-updates";
import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import { DevSettings, I18nManager, Platform } from "react-native";

import { APP_DIRECTION } from "./direction";
import ar from "./locales/ar.json";
import en from "./locales/en.json";
import { arFeatures } from "./locales/features/ar";
import { enFeatures } from "./locales/features/en";

export type AppLanguage = "ar" | "en";

export const DEFAULT_LANGUAGE: AppLanguage = "ar";

/** Flip to true when language can be chosen from settings or the device locale. */
const ALLOW_DYNAMIC_LANGUAGE = false;

const LANGUAGE_KEY = "@tff/language";

const resources = {
  en: { translation: { ...en, ...enFeatures } },
  ar: { translation: { ...ar, ...arFeatures } },
};

function deviceLanguage(): AppLanguage {
  const locale = Localization.getLocales()[0]?.languageCode;
  return locale === "en" ? "en" : "ar";
}

function resolveLanguage(storedLanguage: string | null): AppLanguage {
  if (!ALLOW_DYNAMIC_LANGUAGE) {
    return DEFAULT_LANGUAGE;
  }

  if (storedLanguage === "en" || storedLanguage === "ar") {
    return storedLanguage;
  }

  return deviceLanguage();
}

function applyDocumentDirection(language: AppLanguage) {
  if (Platform.OS !== "web" || typeof document === "undefined") {
    return;
  }

  document.documentElement.dir = APP_DIRECTION;
  document.documentElement.lang = language;
}

async function applyRtl(language: AppLanguage) {
  applyDocumentDirection(language);

  // react-native-web implements allowRTL/forceRTL as no-ops and has no
  // swapLeftAndRightInRTL at all, so the document `dir` above is the whole story on web.
  if (Platform.OS === "web") {
    return;
  }

  // Keep NativeWind physical left/right utilities (text-right, items-end)
  // from being inverted by the RTL layout engine.
  I18nManager.swapLeftAndRightInRTL(false);

  if (I18nManager.isRTL) {
    return;
  }

  I18nManager.allowRTL(true);
  I18nManager.forceRTL(true);

  if (__DEV__) {
    DevSettings.reload();
    return;
  }

  await Updates.reloadAsync();
}

export async function initializeI18n() {
  const storedLanguage = await AsyncStorage.getItem(LANGUAGE_KEY);
  const language = resolveLanguage(storedLanguage);

  if (!i18n.isInitialized) {
    await i18n.use(initReactI18next).init({
      resources,
      lng: language,
      fallbackLng: DEFAULT_LANGUAGE,
      interpolation: { escapeValue: false },
    });
  } else if (i18n.language !== language) {
    await i18n.changeLanguage(language);
  }

  await applyRtl(language);
  return i18n;
}

export async function changeLanguage(language: AppLanguage) {
  await AsyncStorage.setItem(LANGUAGE_KEY, language);
  await i18n.changeLanguage(language);
  await applyRtl(language);
}

export default i18n;
