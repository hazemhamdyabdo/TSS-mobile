import { Text, View } from 'react-native';
import { useTranslation } from 'react-i18next';

import AuthHeroBackground from './AuthHeroBackground';
import AuthSheet from './AuthSheet';
import LoginForm from './LoginForm';
import { cairo } from '@/theme/typography';

export default function LoginScreen() {
  const { t } = useTranslation();

  return (
    <AuthHeroBackground>
      <AuthSheet>
        <View className="w-full items-center gap-8 py-2">
          <View className="w-full items-end gap-1.5">
            <Text
              className="text-right text-xl leading-[26px] text-accent"
              style={{ fontFamily: cairo.bold }}>
              {t('auth.loginTitle')}
            </Text>
            <Text
              className="text-right text-sm leading-[14px] text-sec-text"
              style={{ fontFamily: cairo.regular }}>
              {t('auth.loginSubtitle')}
            </Text>
          </View>
          <LoginForm />
        </View>
      </AuthSheet>
    </AuthHeroBackground>
  );
}
