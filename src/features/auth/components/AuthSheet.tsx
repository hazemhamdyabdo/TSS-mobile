import type { ReactNode } from 'react';
import { View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

type AuthSheetProps = {
  children: ReactNode;
  className?: string;
};

export default function AuthSheet({ children, className = '' }: AuthSheetProps) {
  const insets = useSafeAreaInsets();

  return (
    <View
      className={`mt-auto w-full rounded-t-[32px] bg-background px-5 pt-4 ${className}`}
      style={{ paddingBottom: Math.max(insets.bottom, 24) }}>
      {children}
    </View>
  );
}
