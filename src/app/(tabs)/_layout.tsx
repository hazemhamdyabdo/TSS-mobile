import { Tabs } from 'expo-router/js-tabs';

import AppTabBar from '@/components/AppTabBar';

export default function TabsLayout() {
  return (
    <Tabs
      tabBar={(props) => <AppTabBar {...props} />}
      screenOptions={{
        headerShown: false,
      }}>
      <Tabs.Screen name="index" />
      <Tabs.Screen name="competitions" />
      <Tabs.Screen name="members" />
      <Tabs.Screen name="more" />
    </Tabs>
  );
}
