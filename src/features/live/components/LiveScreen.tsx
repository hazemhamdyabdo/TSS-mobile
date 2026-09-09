import { useRouter, type Href } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useTranslation } from 'react-i18next';
import { ScrollView, Text, View } from 'react-native';

import ScreenSafeAreaView from '@/components/ScreenSafeAreaView';
import CreateScreenHeader from '@/features/create/components/CreateScreenHeader';
import { RTL_CONTAINER_STYLE, RTL_TEXT_STYLE } from '@/localization/direction';
import { cairo } from '@/theme/typography';

import { LIVE_MATCHES } from '../constants/dummy';
import LiveMatchCard from './LiveMatchCard';

export default function LiveScreen() {
  const { t } = useTranslation();
  const router = useRouter();

  return (
    <ScreenSafeAreaView
      className="flex-1 bg-background"
      edges={['top', 'bottom']}
      style={RTL_CONTAINER_STYLE}
    >
      <StatusBar style="auto" />
      <CreateScreenHeader title={t('live.title')} />
      <ScrollView
        className="flex-1"
        contentContainerClassName="gap-4 px-5 pb-8"
        showsVerticalScrollIndicator={false}
      >
        {LIVE_MATCHES.length === 0 ? (
          <View className="items-center py-16">
            <Text
              className="text-sm text-slate-400"
              style={{ fontFamily: cairo.medium, ...RTL_TEXT_STYLE }}
            >
              {t('live.empty')}
            </Text>
          </View>
        ) : (
          LIVE_MATCHES.map((match) => (
            <LiveMatchCard
              key={match.id}
              match={match}
              onPress={() => router.push(`/live/${match.id}` as Href)}
            />
          ))
        )}
      </ScrollView>
    </ScreenSafeAreaView>
  );
}
