import { StatusBar } from 'expo-status-bar';
import { useTranslation } from 'react-i18next';
import { ScrollView, View } from 'react-native';

import ScreenSafeAreaView from '@/components/ScreenSafeAreaView';
import CreateScreenHeader from '@/features/create/components/CreateScreenHeader';
import { RTL_CONTAINER_STYLE } from '@/localization/direction';
import { useMockListFetch } from '@/hooks/useMockListFetch';

import { getHome } from '../api';
import { useHomeState } from '../hooks/useHomeState';
import LeaderboardPodium from './LeaderboardPodium';
import LeaderboardRow from './LeaderboardRow';

export default function GuestLeaderboardScreen() {
  const { t } = useTranslation();
  const home = useHomeState();
  const isLoading = useMockListFetch(getHome);
  const { podium, currentUser, list } = home.leaderboard;

  return (
    <ScreenSafeAreaView
      className="flex-1 bg-background"
      edges={['top', 'bottom']}
      style={RTL_CONTAINER_STYLE}>
      <StatusBar style="auto" />
      <CreateScreenHeader title={t('home.guest.ranking.title')} />

      {isLoading ? (
        <View className="flex-1 gap-4 px-5 pt-4">
          <View className="h-[199px] w-[299px] self-center rounded-full bg-slate-100" />
          <View className="h-12 w-full rounded-lg bg-slate-100" />
          <View className="flex-1 rounded-t-[32px] bg-white p-5">
            <View className="gap-2">
              {Array.from({ length: 6 }).map((_, index) => (
                <View key={index} className="h-12 rounded-lg bg-slate-100" />
              ))}
            </View>
          </View>
        </View>
      ) : (
        <ScrollView
          className="flex-1"
          contentContainerClassName="gap-4 pb-8"
          showsVerticalScrollIndicator={false}>
          <LeaderboardPodium podium={podium} />

          <View className="px-5">
            <LeaderboardRow entry={currentUser} variant="sticky" />
          </View>

          <View className="w-full rounded-t-[32px] bg-white p-5">
            <View className="w-full gap-2">
              {list.map((entry) => (
                <LeaderboardRow
                  key={entry.id}
                  entry={entry}
                  variant={entry.isCurrentUser ? 'active' : 'default'}
                />
              ))}
            </View>
          </View>
        </ScrollView>
      )}
    </ScreenSafeAreaView>
  );
}
