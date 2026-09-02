import { Text } from 'react-native';

import { cairo } from '@/theme/typography';

type FieldErrorProps = {
  message: string;
};

export default function FieldError({ message }: FieldErrorProps) {
  return (
    <Text
      className="w-full text-right text-xs leading-[18px] text-rejected"
      style={{ fontFamily: cairo.regular }}>
      {message}
    </Text>
  );
}
