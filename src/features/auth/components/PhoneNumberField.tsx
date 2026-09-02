import { Image } from 'expo-image';
import { Text, TextInput, View } from 'react-native';

import { useTextStartAlign } from '@/localization/direction';
import { colors } from '@/theme/colors';
import { cairo } from '@/theme/typography';

const ksaFlag = require('@/assets/images/auth/ksa-flag.png');
const caretDown = require('@/assets/images/auth/caret-down.png');

type PhoneNumberFieldProps = {
  value: string;
  onChangeText: (value: string) => void;
  placeholder: string;
  countryCode: string;
  hasError?: boolean;
};

export default function PhoneNumberField({
  value,
  onChangeText,
  placeholder,
  countryCode,
  hasError = false,
}: PhoneNumberFieldProps) {
  const textAlign = useTextStartAlign();

  return (
    <View
      className={`h-12 w-full flex-row items-center gap-2 rounded-[10px] border bg-white px-4 ${hasError ? 'border-rejected' : 'border-slate-100'}`}
      style={{ direction: 'ltr' }}>
      <TextInput
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor={colors.secText}
        keyboardType="phone-pad"
        textAlign={textAlign}
        className="min-w-0 flex-1 text-sm leading-[18px] text-label"
        style={{ fontFamily: cairo.regular }}
      />
      <View className="flex-row items-center gap-1">
        <Text className="text-sm leading-[21px] text-accent" style={{ fontFamily: cairo.medium }}>
          {countryCode}
        </Text>
        <View className="size-5 overflow-hidden">
          <Image source={ksaFlag} style={{ width: 20, height: 20 }} contentFit="cover" />
        </View>
        <View className="size-[14px] overflow-hidden">
          <Image source={caretDown} style={{ width: 14, height: 14 }} contentFit="contain" />
        </View>
      </View>
    </View>
  );
}
