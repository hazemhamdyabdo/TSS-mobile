import { useRouter } from 'expo-router';
import { ScrollView, Text, View } from 'react-native';
import { useTranslation } from 'react-i18next';

import AuthBackButton from './AuthBackButton';
import AuthHeroBackground from './AuthHeroBackground';
import AuthSheet from './AuthSheet';
import ContactForm from './ContactForm';
import { RTL_TEXT_STYLE } from '@/localization/direction';
import { cairo } from '@/theme/typography';

export default function ContactScreen() {
  const { t } = useTranslation();
  const router = useRouter();
  return (
    <AuthHeroBackground>
      <AuthSheet className="max-h-[90%]">
        <ScrollView
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 16 }}>
          <View className="w-full items-start gap-2">
            <View className="w-full flex-row justify-start">
              <AuthBackButton onPress={() => router.back()} />
            </View>
            <View className="w-full items-start gap-1.5">
              <Text
                className="w-full text-xl leading-[26px] text-accent"
                style={{ fontFamily: cairo.bold, ...RTL_TEXT_STYLE }}>
                {t('auth.contactTitle')}
              </Text>
              <Text
                className="w-full text-sm text-sec-text"
                style={{ fontFamily: cairo.regular, ...RTL_TEXT_STYLE }}>
                {t('auth.contactSubtitle')}
              </Text>
            </View>
          </View>
          <View className="mt-8">
            <ContactForm />
          </View>
        </ScrollView>
      </AuthSheet>
    </AuthHeroBackground>
  );
}
