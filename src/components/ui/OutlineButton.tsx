import { ActivityIndicator, Pressable, Text } from 'react-native';

import { colors } from '@/theme/colors';
import { cairo } from '@/theme/typography';

type OutlineButtonVariant = 'primary' | 'muted';

type OutlineButtonProps = {
  title: string;
  onPress: () => void;
  disabled?: boolean;
  loading?: boolean;
  variant?: OutlineButtonVariant;
};

export default function OutlineButton({
  title,
  onPress,
  disabled = false,
  loading = false,
  variant = 'primary',
}: OutlineButtonProps) {
  const isDisabled = disabled || loading;
  const isMuted = variant === 'muted';

  return (
    <Pressable
      accessibilityRole="button"
      onPress={onPress}
      disabled={isDisabled}
      className={`h-12 w-full flex-row items-center justify-center rounded-[10px] border-[1.5px] bg-white px-4 ${
        isMuted ? 'border-slate-300' : 'border-primary'
      } ${isDisabled ? 'opacity-50' : ''}`}>
      {loading ? (
        <ActivityIndicator color={isMuted ? colors.slate400 : colors.primary} />
      ) : (
        <Text
          className={`text-base ${isMuted ? 'capitalize text-slate-400' : 'text-primary'}`}
          style={{ fontFamily: isMuted ? cairo.medium : cairo.regular }}>
          {title}
        </Text>
      )}
    </Pressable>
  );
}
