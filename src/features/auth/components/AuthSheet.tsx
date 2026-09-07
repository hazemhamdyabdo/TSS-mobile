import type { ReactNode } from 'react';
import { ScrollView } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

type AuthSheetProps = {
  children: ReactNode;
  className?: string;
};

export default function AuthSheet({ children, className = '' }: AuthSheetProps) {
  const insets = useSafeAreaInsets();

  return (
    <ScrollView
      className={`mt-auto w-full rounded-t-[32px] bg-background ${className}`}
      style={{ maxHeight: '92%' }}
      contentContainerClassName="px-5 pt-4"
      contentContainerStyle={{ paddingBottom: Math.max(insets.bottom, 24) }}
      keyboardShouldPersistTaps="handled"
      keyboardDismissMode="interactive"
      bounces={false}
      showsVerticalScrollIndicator={false}>
      {children}
    </ScrollView>
  );
}
