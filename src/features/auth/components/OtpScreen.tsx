import { useRouter } from 'expo-router';
import { Pressable, Text, View } from 'react-native';
import { useTranslation } from 'react-i18next';

import AuthBackButton from './AuthBackButton';
import AuthHeroBackground from './AuthHeroBackground';
import AuthSheet from './AuthSheet';
import OtpForm from './OtpForm';
import { cairo } from '@/theme/typography';
import { toArabicIndicDigits } from '@/utils/digits';

type OtpScreenProps = {
  phone: string;
};

function formatDisplayPhone(phone: string, language: string) {
  const grouped = phone.replace(/(\d{2})(\d{3})(\d{4})/, '$1 $2 $3');
  const national = language === 'ar' ? toArabicIndicDigits(grouped) : grouped;
  const code = language === 'ar' ? '٩٦٦+' : '+966';
  return `${national} ${code}`;
}

export default function OtpScreen({ phone }: OtpScreenProps) {
  const { t, i18n } = useTranslation();
  const router = useRouter();

  return (
    <AuthHeroBackground>
      <AuthSheet>
        <View className="w-full items-center gap-8 py-2">
          <View className="w-full items-end gap-2">
            <View className="w-full flex-row justify-end" style={{ direction: 'ltr' }}>
              <AuthBackButton onPress={() => router.back()} />
            </View>
            <View className="w-full items-end gap-1.5">
              <Text
                className="text-right text-xl leading-[26px] text-accent"
                style={{ fontFamily: cairo.bold }}>
                {t('auth.otpTitle')}
              </Text>
              <Text
                className="text-right text-sm text-sec-text"
                style={{ fontFamily: cairo.regular }}>
                {t('auth.otpSubtitle', { phone: formatDisplayPhone(phone, i18n.language) })}
              </Text>
              <Pressable onPress={() => router.back()}>
                <Text className="text-right text-sm text-primary" style={{ fontFamily: cairo.regular }}>
                  {t('auth.changeNumber')}
                </Text>
              </Pressable>
            </View>
          </View>
          <OtpForm phone={phone} />
        </View>
      </AuthSheet>
    </AuthHeroBackground>
  );
}
