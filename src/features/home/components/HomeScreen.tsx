import { Text, View } from 'react-native';

import ScreenSafeAreaView from '@/components/ScreenSafeAreaView';

export default function HomeScreen() {
  return (
    <ScreenSafeAreaView className="flex-1 bg-white" edges={["top", "bottom"]}>
      <View className="flex-1 items-center justify-center gap-4 px-6">
        <Text className="text-center text-2xl font-bold text-heading">
          NativeWind is working
        </Text>
        <Text className="text-center text-sec-text">
          These chips use semantic tokens from global.css
        </Text>

        <View className="rounded-xl bg-primary px-6 py-3">
          <Text className="font-semibold text-white">bg-primary</Text>
        </View>

        <View className="flex-row flex-wrap justify-center gap-2">
          <View className="rounded-full border border-pending-100 bg-pending-50 px-3 py-1">
            <Text className="text-pending-700">pending</Text>
          </View>
          <View className="rounded-full border border-approved-100 bg-approved-50 px-3 py-1">
            <Text className="text-approved-700">approved</Text>
          </View>
          <View className="rounded-full border border-rejected-100 bg-rejected-50 px-3 py-1">
            <Text className="text-rejected-700">rejected</Text>
          </View>
        </View>

        <View className="w-full max-w-sm rounded-2xl border border-card-border bg-slate-50 p-4">
          <Text className="text-label">border-card-border</Text>
          <Text className="mt-1 text-sec-text">bg-slate-50 · text-label</Text>
        </View>
      </View>
    </ScreenSafeAreaView>
  );
}
