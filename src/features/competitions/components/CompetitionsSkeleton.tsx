import { View } from 'react-native';

export default function CompetitionsSkeleton() {
  return (
    <View className="gap-4">
      <View className="h-8 flex-row items-center gap-4">
        <View className="size-8 rounded-full bg-slate-100" />
        <View className="h-4 w-24 rounded bg-slate-100" />
      </View>
      <View className="h-[42px] flex-row gap-2">
        <View className="h-full flex-1 rounded-[10px] bg-slate-100" />
        <View className="h-full w-[135px] rounded-[10px] bg-slate-100" />
      </View>
      <View className="h-[72px] flex-row gap-2">
        <View className="h-full flex-1 rounded-lg bg-slate-100" />
        <View className="h-full flex-1 rounded-lg bg-slate-100" />
      </View>
      <View className="h-10 flex-row gap-2">
        <View className="h-full flex-1 rounded-lg bg-slate-100" />
        <View className="h-full flex-1 rounded-lg bg-slate-100" />
        <View className="h-full flex-1 rounded-lg bg-slate-100" />
        <View className="h-full flex-1 rounded-lg bg-slate-100" />
      </View>
      <View className="h-[95px] rounded-lg bg-slate-100" />
      <View className="h-[95px] rounded-lg bg-slate-100" />
      <View className="h-[95px] rounded-lg bg-slate-100" />
    </View>
  );
}
