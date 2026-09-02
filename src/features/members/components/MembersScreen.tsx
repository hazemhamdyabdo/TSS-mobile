import { Text, View } from 'react-native';
import { useTranslation } from 'react-i18next';

import ScreenSafeAreaView from '@/components/ScreenSafeAreaView';
import { cairo } from '@/theme/typography';

export default function MembersScreen() {
  const { t } = useTranslation();

  return (
    <ScreenSafeAreaView className="flex-1 bg-background" edges={['top']}>
      <View className="flex-1 items-center justify-center px-5">
        <Text className="text-base text-label" style={{ fontFamily: cairo.semiBold }}>
          {t('tabs.members')}
        </Text>
      </View>
    </ScreenSafeAreaView>
  );
}
