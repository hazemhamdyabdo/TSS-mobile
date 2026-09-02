import { useRouter } from 'expo-router';
import { Pressable, Text, View } from 'react-native';
import { useTranslation } from 'react-i18next';

import AuthBackButton from './AuthBackButton';
import AuthHeroBackground from './AuthHeroBackground';
import AuthSheet from './AuthSheet';
import OtpForm from './OtpForm';
import { useTextStartAlign, useWritingDirection } from '@/localization/direction';
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
  const textAlign = useTextStartAlign();
  const writingDirection = useWritingDirection();

  return (
    <AuthHeroBackground>
      <AuthSheet>
        <View className="w-full items-center gap-8 py-2">
          <View className="w-full items-start gap-2">
            <View className="w-full flex-row justify-start">
              <AuthBackButton onPress={() => router.back()} />
            </View>
            <View className="w-full items-start gap-1.5">
              <Text
                className="w-full text-xl leading-[26px] text-accent"
                style={{ fontFamily: cairo.bold, textAlign, writingDirection }}>
                {t('auth.otpTitle')}
              </Text>
              <Text
                className="w-full text-sm text-sec-text"
                style={{ fontFamily: cairo.regular, textAlign, writingDirection }}>
                {t('auth.otpSubtitle', { phone: formatDisplayPhone(phone, i18n.language) })}
              </Text>
              <Pressable onPress={() => router.back()} className="w-full">
                <Text
                  className="w-full text-sm text-primary"
                  style={{ fontFamily: cairo.regular, textAlign, writingDirection }}>
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
