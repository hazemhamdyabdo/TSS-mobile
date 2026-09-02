import { Text } from 'react-native';

import { useTextStartAlign, useWritingDirection } from '@/localization/direction';
import { cairo } from '@/theme/typography';

type FieldErrorProps = {
  message: string;
};

export default function FieldError({ message }: FieldErrorProps) {
  const textAlign = useTextStartAlign();
  const writingDirection = useWritingDirection();

  return (
    <Text
      className="w-full text-xs leading-[18px] text-rejected"
      style={{ fontFamily: cairo.regular, textAlign, writingDirection }}>
      {message}
    </Text>
  );
}
