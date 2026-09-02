import { Text } from 'react-native';

import { useTextStartAlign, useWritingDirection } from '@/localization/direction';
import { cairo } from '@/theme/typography';

type FormLabelProps = {
  children: string;
};

export default function FormLabel({ children }: FormLabelProps) {
  const textAlign = useTextStartAlign();
  const writingDirection = useWritingDirection();

  return (
    <Text
      className="w-full text-sm leading-[18px] text-label"
      style={{ fontFamily: cairo.regular, textAlign, writingDirection }}>
      {children}
    </Text>
  );
}
