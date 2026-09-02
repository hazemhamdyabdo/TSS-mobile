import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Localization from 'expo-localization';
import * as Updates from 'expo-updates';
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import { DevSettings, I18nManager, Platform } from 'react-native';

import ar from './locales/ar.json';
import en from './locales/en.json';
import { arFeatures } from './locales/features/ar';
import { enFeatures } from './locales/features/en';

export type AppLanguage = 'ar' | 'en';

export const DEFAULT_LANGUAGE: AppLanguage = 'ar';

/** Flip to true when language can be chosen from settings or the device locale. */
const ALLOW_DYNAMIC_LANGUAGE = false;

const LANGUAGE_KEY = '@tff/language';

const resources = {
  en: { translation: { ...en, ...enFeatures } },
  ar: { translation: { ...ar, ...arFeatures } },
};

function deviceLanguage(): AppLanguage {
  const locale = Localization.getLocales()[0]?.languageCode;
  return locale === 'en' ? 'en' : 'ar';
}

function resolveLanguage(storedLanguage: string | null): AppLanguage {
  if (!ALLOW_DYNAMIC_LANGUAGE) {
    return DEFAULT_LANGUAGE;
  }

  if (storedLanguage === 'en' || storedLanguage === 'ar') {
    return storedLanguage;
  }

  return deviceLanguage();
}

async function applyRtl(language: AppLanguage) {
  const shouldBeRtl = language === 'ar';
  if (I18nManager.isRTL === shouldBeRtl) {
    return;
  }

  I18nManager.allowRTL(shouldBeRtl);
  I18nManager.forceRTL(shouldBeRtl);

  if (Platform.OS === 'web') {
    return;
  }

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
