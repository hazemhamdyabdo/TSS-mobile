import { useRouter } from 'expo-router';
import { ScrollView, Text, View } from 'react-native';
import { useTranslation } from 'react-i18next';

import AuthBackButton from './AuthBackButton';
import AuthHeroBackground from './AuthHeroBackground';
import AuthSheet from './AuthSheet';
import ContactForm from './ContactForm';
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
          <View className="w-full items-end gap-2">
            <View className="w-full flex-row justify-end" style={{ direction: 'ltr' }}>
              <AuthBackButton onPress={() => router.back()} />
            </View>
            <View className="w-full items-end gap-1.5">
              <Text
                className="text-right text-xl leading-[26px] text-accent"
                style={{ fontFamily: cairo.bold }}>
                {t('auth.contactTitle')}
              </Text>
              <Text
                className="text-right text-sm text-sec-text"
                style={{ fontFamily: cairo.regular }}>
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
