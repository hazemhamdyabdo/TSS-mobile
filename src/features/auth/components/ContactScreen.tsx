import { useRouter } from 'expo-router';
import { Text, View } from 'react-native';
import { useTranslation } from 'react-i18next';

import { RTL_TEXT_STYLE } from '@/localization/direction';
import { cairo } from '@/theme/typography';

import AuthBackButton from './AuthBackButton';
import AuthHeroBackground from './AuthHeroBackground';
import AuthSheet from './AuthSheet';
import ContactForm from './ContactForm';

export default function ContactScreen() {
  const { t } = useTranslation();
  const router = useRouter();

  return (
    <AuthHeroBackground>
      <AuthSheet maxHeight="90%">
        <View className="w-full items-start gap-2">
          <View className="w-full flex-row justify-start">
            <AuthBackButton onPress={() => router.back()} />
          </View>
          <View className="w-full items-start gap-1.5">
            <Text
              className="w-full text-xl leading-[26px] text-accent"
              style={{ fontFamily: cairo.bold, ...RTL_TEXT_STYLE }}
            >
              {t('auth.contactTitle')}
            </Text>
            <Text
              className="w-full text-sm text-sec-text"
              style={{ fontFamily: cairo.regular, ...RTL_TEXT_STYLE }}
            >
              {t('auth.contactSubtitle')}
            </Text>
          </View>
        </View>
        <View className="mt-6">
          <ContactForm />
        </View>
      </AuthSheet>
    </AuthHeroBackground>
  );
}
