import { StatusBar } from 'expo-status-bar';
import { Switch, Text, View } from 'react-native';
import { useTranslation } from 'react-i18next';

import ScreenSafeAreaView from '@/components/ScreenSafeAreaView';
import CreateScreenHeader from '@/features/create/components/CreateScreenHeader';
import { RTL_CONTAINER_STYLE, RTL_TEXT_STYLE } from '@/localization/direction';
import { colors } from '@/theme/colors';
import { cairo } from '@/theme/typography';

import { updateNotificationPrefs } from '../api';
import { useMoreState } from '../hooks/useMoreState';
import type { NotificationPrefs } from '../types';

type NotificationPrefKey = keyof NotificationPrefs;

const PREF_ROWS: { key: NotificationPrefKey; titleKey: string; subtitleKey: string }[] = [
  {
    key: 'enabled',
    titleKey: 'more.notifications.enabled.title',
    subtitleKey: 'more.notifications.enabled.subtitle',
  },
  {
    key: 'transferRequests',
    titleKey: 'more.notifications.transferRequests.title',
    subtitleKey: 'more.notifications.transferRequests.subtitle',
  },
  {
    key: 'featureUpdates',
    titleKey: 'more.notifications.featureUpdates.title',
    subtitleKey: 'more.notifications.featureUpdates.subtitle',
  },
];

export default function NotificationsSettingsScreen() {
  const { t } = useTranslation();
  const { notifications } = useMoreState();

  const handleToggle = (key: NotificationPrefKey, value: boolean) => {
    void updateNotificationPrefs({ ...notifications, [key]: value });
  };

  return (
    <ScreenSafeAreaView
      className="flex-1 bg-background"
      edges={['top', 'bottom']}
      style={RTL_CONTAINER_STYLE}
    >
      <StatusBar style="dark" />
      <CreateScreenHeader title={t('more.notifications.title')} />
      <View className="gap-2 px-5 pt-4">
        {PREF_ROWS.map((row) => (
          <View
            key={row.key}
            className="w-full items-start gap-4 overflow-hidden rounded-lg border border-slate-100 bg-white p-6"
          >
            <View className="w-full flex-row items-center justify-between" style={RTL_CONTAINER_STYLE}>
              <Text
                className="text-sm capitalize text-accent"
                style={{ fontFamily: cairo.medium, ...RTL_TEXT_STYLE }}
              >
                {t(row.titleKey)}
              </Text>
              <Switch
                value={notifications[row.key]}
                onValueChange={(value) => handleToggle(row.key, value)}
                trackColor={{ false: 'rgba(1,138,67,0.1)', true: colors.primary }}
                thumbColor={colors.white}
                ios_backgroundColor="rgba(1,138,67,0.1)"
              />
            </View>
            <Text
              className="w-full text-sm text-slate-400"
              style={{ fontFamily: cairo.regular, ...RTL_TEXT_STYLE }}
            >
              {t(row.subtitleKey)}
            </Text>
          </View>
        ))}
      </View>
    </ScreenSafeAreaView>
  );
}
