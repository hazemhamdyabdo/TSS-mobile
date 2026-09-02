import { Text, View } from 'react-native';

import { cairo } from '@/theme/typography';

type AuthDividerProps = {
  label: string;
};

export default function AuthDivider({ label }: AuthDividerProps) {
  return (
    <View className="h-2 w-full flex-row items-center gap-4">
      <View className="h-px min-w-0 flex-1 bg-slate-200" />
      <Text className="text-xs text-slate-400" style={{ fontFamily: cairo.regular }}>
        {label}
      </Text>
      <View className="h-px min-w-0 flex-1 bg-slate-200" />
    </View>
  );
}
