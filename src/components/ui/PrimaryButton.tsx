import { ActivityIndicator, Pressable, Text } from 'react-native';

import { colors } from '@/theme/colors';
import { cairo } from '@/theme/typography';

type PrimaryButtonProps = {
  title: string;
  onPress: () => void;
  disabled?: boolean;
  loading?: boolean;
};

export default function PrimaryButton({
  title,
  onPress,
  disabled = false,
  loading = false,
}: PrimaryButtonProps) {
  const isDisabled = disabled || loading;

  return (
    <Pressable
      accessibilityRole="button"
      onPress={onPress}
      disabled={isDisabled}
      className={`h-12 w-full flex-row items-center justify-center rounded-[10px] bg-primary px-3 ${isDisabled ? 'opacity-50' : ''}`}>
      {loading ? (
        <ActivityIndicator color={colors.white} />
      ) : (
        <Text className="text-base text-white" style={{ fontFamily: cairo.medium }}>
          {title}
        </Text>
      )}
    </Pressable>
  );
}
