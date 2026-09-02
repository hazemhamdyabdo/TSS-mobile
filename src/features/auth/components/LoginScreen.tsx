import { Text, View } from 'react-native';
import { useTranslation } from 'react-i18next';

import AuthHeroBackground from './AuthHeroBackground';
import AuthSheet from './AuthSheet';
import LoginForm from './LoginForm';
import { useTextStartAlign, useWritingDirection } from '@/localization/direction';
import { cairo } from '@/theme/typography';

export default function LoginScreen() {
  const { t } = useTranslation();
  const textAlign = useTextStartAlign();
  const writingDirection = useWritingDirection();

  return (
    <AuthHeroBackground>
      <AuthSheet>
        <View className="w-full items-center gap-8 py-2">
          <View className="w-full items-start gap-1.5">
            <Text
              className="w-full text-xl leading-[26px] text-accent"
              style={{ fontFamily: cairo.bold, textAlign, writingDirection }}>
              {t('auth.loginTitle')}
            </Text>
            <Text
              className="w-full text-sm leading-[14px] text-sec-text"
              style={{ fontFamily: cairo.regular, textAlign, writingDirection }}>
              {t('auth.loginSubtitle')}
            </Text>
          </View>
          <LoginForm />
        </View>
      </AuthSheet>
    </AuthHeroBackground>
  );
}
