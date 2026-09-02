import { Text } from 'react-native';

import { RTL_TEXT_STYLE } from '@/localization/direction';
import { cairo } from '@/theme/typography';

type FieldErrorProps = {
  message: string;
};

export default function FieldError({ message }: FieldErrorProps) {
  return (
    <Text
      className="w-full text-xs leading-[18px] text-rejected"
      style={{ fontFamily: cairo.regular, ...RTL_TEXT_STYLE }}>
      {message}
    </Text>
  );
}
