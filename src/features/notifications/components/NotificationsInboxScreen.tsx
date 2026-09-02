import { useRouter, type Href } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Alert, Pressable, ScrollView, Text, View } from 'react-native';

import ScreenSafeAreaView from '@/components/ScreenSafeAreaView';
import CreateScreenHeader from '@/features/create/components/CreateScreenHeader';
import { useMockListFetch } from '@/hooks/useMockListFetch';
import { RTL_CONTAINER_STYLE, RTL_TEXT_STYLE } from '@/localization/direction';
import { cairo } from '@/theme/typography';
import { getMockErrorMessage } from '@/utils/formErrors';

import { getNotifications, markAllNotificationsRead, markNotificationRead } from '../api';
import { useNotificationsState } from '../hooks/useNotificationsState';
import type { AppNotification } from '../types';

export default function NotificationsInboxScreen() {
  const { t } = useTranslation();
  const router = useRouter();
  const { items, unreadCount } = useNotificationsState();
  const isLoading = useMockListFetch(getNotifications);
  const [isMarkingAll, setIsMarkingAll] = useState(false);

  const handleOpen = async (item: AppNotification) => {
    try {
      if (!item.read) {
        await markNotificationRead(item.id);
      }

      if (item.href) {
        router.push(item.href as Href);
      }
    } catch (error) {
      Alert.alert(t('inbox.title'), getMockErrorMessage(error, 'inbox.notFound', t));
    }
  };

  const handleMarkAll = async () => {
    if (isMarkingAll || unreadCount === 0) {
      return;
    }

    setIsMarkingAll(true);
    try {
      await markAllNotificationsRead();
    } catch (error) {
      Alert.alert(t('inbox.title'), getMockErrorMessage(error, 'inbox.notFound', t));
    } finally {
      setIsMarkingAll(false);
    }
  };

  return (
    <ScreenSafeAreaView
      className="flex-1 bg-background"
      edges={['top', 'bottom']}
      style={RTL_CONTAINER_STYLE}>
      <StatusBar style="auto" />
      <CreateScreenHeader title={t('inbox.title')} />
      <ScrollView
        className="flex-1"
        contentContainerClassName="gap-3 px-5 pb-8 pt-2"
        showsVerticalScrollIndicator={false}>
        {isLoading ? (
          <Text
            className="py-8 text-center text-xs text-slate-400"
            style={{ fontFamily: cairo.medium }}>
            {t('federation.loading')}
          </Text>
        ) : (
          <>
            <View className="flex-row items-center justify-between" style={RTL_CONTAINER_STYLE}>
              <Text className="text-xs text-slate-400" style={{ fontFamily: cairo.medium }}>
                {t('inbox.unreadCount', { count: unreadCount })}
              </Text>
              <Pressable
                accessibilityRole="button"
                onPress={() => {
                  void handleMarkAll();
                }}
                disabled={unreadCount === 0 || isMarkingAll}>
                <Text className="text-xs text-primary" style={{ fontFamily: cairo.semiBold }}>
                  {t('inbox.markAllRead')}
                </Text>
              </Pressable>
            </View>

            {items.length === 0 ? (
              <Text
                className="py-8 text-center text-xs text-slate-400"
                style={{ fontFamily: cairo.medium }}>
                {t('inbox.empty')}
              </Text>
            ) : (
              <View className="gap-2">
                {items.map((item) => (
                  <Pressable
                    key={item.id}
                    accessibilityRole="button"
                    onPress={() => {
                      void handleOpen(item);
                    }}
                    className="rounded-lg border border-slate-100 bg-white p-4"
                    style={RTL_CONTAINER_STYLE}>
                    <View className="flex-row items-start gap-2" style={RTL_CONTAINER_STYLE}>
                      {!item.read ? <View className="mt-1 size-2 rounded-full bg-primary" /> : null}
                      <View className="min-w-0 flex-1 items-start gap-1">
                        <Text
                          className="w-full text-sm text-accent"
                          style={{ fontFamily: cairo.medium, ...RTL_TEXT_STYLE }}>
                          {t(item.titleKey)}
                        </Text>
                        <Text
                          className="w-full text-xs text-slate-400"
                          style={{ fontFamily: cairo.regular, ...RTL_TEXT_STYLE }}>
                          {t(item.bodyKey)}
                        </Text>
                      </View>
                    </View>
                  </Pressable>
                ))}
              </View>
            )}
          </>
        )}
      </ScrollView>
    </ScreenSafeAreaView>
  );
}
