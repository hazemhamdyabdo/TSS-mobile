import { View } from 'react-native';

export default function HomeSkeleton() {
  return (
    <View className="gap-4">
      <View className="h-8 flex-row items-center justify-between">
        <View className="size-8 rounded-full bg-slate-100" />
        <View className="h-7 w-[121px] rounded bg-slate-100" />
        <View className="size-8 rounded-2xl bg-slate-100" />
      </View>
      <View className="h-12 flex-row items-center justify-between">
        <View className="h-10 w-40 rounded bg-slate-100" />
        <View className="h-8 w-24 rounded-3xl bg-slate-100" />
      </View>
      <View className="h-[132px] rounded-lg bg-slate-100" />
      <View className="h-[60px] flex-row gap-2">
        <View className="h-full flex-1 rounded-lg bg-slate-100" />
        <View className="h-full flex-1 rounded-lg bg-slate-100" />
        <View className="h-full flex-1 rounded-lg bg-slate-100" />
        <View className="h-full flex-1 rounded-lg bg-slate-100" />
      </View>
      <View className="gap-1 rounded-lg border border-slate-100 bg-white p-2">
        <View className="h-16 rounded-xl bg-slate-100" />
        <View className="h-16 rounded-xl bg-slate-100" />
        <View className="h-16 rounded-xl bg-slate-100" />
      </View>
    </View>
  );
}
