import type { ReactNode } from 'react';
import { View } from 'react-native';

import { RTL_CONTAINER_STYLE } from '@/localization/direction';

type FormRowProps = {
  children: ReactNode;
};

export default function FormRow({ children }: FormRowProps) {
  return (
    <View className="w-full flex-row items-start gap-2" style={RTL_CONTAINER_STYLE}>
      {children}
    </View>
  );
}
