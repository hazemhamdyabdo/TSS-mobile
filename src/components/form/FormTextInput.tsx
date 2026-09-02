import { TextInput } from 'react-native';

import { APP_DIRECTION, TEXT_INPUT_START_ALIGN } from '@/localization/direction';
import { colors } from '@/theme/colors';
import { cairo } from '@/theme/typography';

type FormTextInputProps = {
  value: string;
  onChangeText: (value: string) => void;
  placeholder: string;
  hasError?: boolean;
  keyboardType?: 'default' | 'numeric' | 'email-address' | 'phone-pad';
};

export default function FormTextInput({
  value,
  onChangeText,
  placeholder,
  hasError = false,
  keyboardType = 'default',
}: FormTextInputProps) {
  return (
    <TextInput
      value={value}
      onChangeText={onChangeText}
      placeholder={placeholder}
      placeholderTextColor={colors.secText}
      keyboardType={keyboardType}
      autoCapitalize={keyboardType === 'email-address' ? 'none' : 'sentences'}
      textAlign={TEXT_INPUT_START_ALIGN}
      className={`h-12 w-full rounded-[10px] border bg-white px-4 text-sm leading-[18px] text-label ${hasError ? 'border-rejected' : 'border-slate-100'}`}
      style={{ fontFamily: cairo.regular, writingDirection: APP_DIRECTION }}
    />
  );
}
