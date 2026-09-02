import { Pressable, Text } from 'react-native';

import { cairo } from '@/theme/typography';

type OutlineButtonProps = {
  title: string;
  onPress: () => void;
  disabled?: boolean;
};

export default function OutlineButton({
  title,
  onPress,
  disabled = false,
}: OutlineButtonProps) {
  return (
    <Pressable
      accessibilityRole="button"
      onPress={onPress}
      disabled={disabled}
      className={`h-12 w-full items-center justify-center rounded-[10px] border-[1.5px] border-primary bg-white px-4 ${disabled ? 'opacity-50' : ''}`}>
      <Text className="text-base text-primary" style={{ fontFamily: cairo.regular }}>
        {title}
      </Text>
    </Pressable>
  );
}
