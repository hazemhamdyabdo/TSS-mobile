import { NativeTabs } from 'expo-router/unstable-native-tabs';
import { useTranslation } from 'react-i18next';
import { useColorScheme } from 'react-native';

import { Colors } from '@/constants/theme';
import { colors } from '@/theme/colors';

export default function TabsLayout() {
  const { t } = useTranslation();
  const scheme = useColorScheme();
  const tabColors = Colors[scheme === 'unspecified' ? 'light' : scheme];

  return (
    <NativeTabs
      backgroundColor={tabColors.background}
      indicatorColor={tabColors.backgroundElement}
      labelStyle={{ selected: { color: colors.primary } }}>
      <NativeTabs.Trigger name="index">
        <NativeTabs.Trigger.Label>{t('tabs.home')}</NativeTabs.Trigger.Label>
        <NativeTabs.Trigger.Icon sf="house.fill" md="home" />
      </NativeTabs.Trigger>
      <NativeTabs.Trigger name="explore">
        <NativeTabs.Trigger.Label>{t('tabs.explore')}</NativeTabs.Trigger.Label>
        <NativeTabs.Trigger.Icon sf="safari" md="explore" />
      </NativeTabs.Trigger>
    </NativeTabs>
  );
}
