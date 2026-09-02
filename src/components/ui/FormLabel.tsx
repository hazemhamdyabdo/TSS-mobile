import { Text } from 'react-native';

import { cairo } from '@/theme/typography';

type FormLabelProps = {
  children: string;
};

export default function FormLabel({ children }: FormLabelProps) {
  return (
    <Text
      className="w-full text-right text-sm leading-[18px] text-label"
      style={{ fontFamily: cairo.regular }}>
      {children}
    </Text>
  );
}
