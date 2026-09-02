import { Text } from 'react-native';

import { RTL_TEXT_STYLE } from '@/localization/direction';
import { cairo } from '@/theme/typography';

type FormLabelProps = {
  children: string;
  required?: boolean;
  optionalHint?: string;
};

export default function FormLabel({ children, required = false, optionalHint }: FormLabelProps) {
  return (
    <Text
      className="w-full text-sm leading-[18px] text-label"
      style={{ fontFamily: cairo.regular, ...RTL_TEXT_STYLE }}>
      {children}
      {required ? <Text className="text-sm leading-[18px] text-rejected">*</Text> : null}
      {optionalHint ? (
        <Text className="text-xs leading-[18px] text-slate-400">{` ${optionalHint}`}</Text>
      ) : null}
    </Text>
  );
}
