import type { ReactNode } from "react";
import { ScrollView, View, type DimensionValue } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { colors } from "@/theme/colors";

type AuthSheetProps = {
  children: ReactNode;
  className?: string;
  maxHeight?: DimensionValue;
};

export default function AuthSheet({
  children,
  className = "",
  maxHeight = "92%",
}: AuthSheetProps) {
  const insets = useSafeAreaInsets();

  return (
    <View
      collapsable={false}
      className={`mt-auto w-full overflow-hidden rounded-t-[32px] px-5 pt-4 ${className}`}
      style={{
        maxHeight,
        backgroundColor: colors.white,
      }}
    >
      <ScrollView
        contentContainerClassName="px-5 pt-4"
        contentContainerStyle={{ paddingBottom: Math.max(insets.bottom, 24) }}
        keyboardShouldPersistTaps="handled"
        keyboardDismissMode="interactive"
        bounces={false}
        showsVerticalScrollIndicator={false}
      >
        {children}
      </ScrollView>
    </View>
  );
}
