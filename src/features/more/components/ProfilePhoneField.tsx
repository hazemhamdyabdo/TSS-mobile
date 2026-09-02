import { Image } from 'expo-image';
import { MaterialDesignIcons } from '@react-native-vector-icons/material-design-icons';
import { useState } from 'react';
import { Text, TextInput, View } from 'react-native';

import FormField from '@/components/form/FormField';
import { SA_DIAL_CODE } from '@/features/auth/constants/dummy';
import { TEXT_INPUT_START_ALIGN } from '@/localization/direction';
import { colors } from '@/theme/colors';
import { cairo } from '@/theme/typography';

const ksaFlag = require('@/assets/images/auth/ksa-flag.png');
const caretDown = require('@/assets/images/auth/caret-down.png');

type ProfilePhoneFieldProps = {
  label: string;
  value: string;
  placeholder: string;
  error?: string;
  onChangeText: (value: string) => void;
};

export default function ProfilePhoneField({
  label,
  value,
  placeholder,
  error,
  onChangeText,
}: ProfilePhoneFieldProps) {
  const [focused, setFocused] = useState(false);
  const borderClass = error ? 'border-rejected' : focused ? 'border-primary' : 'border-slate-100';
  const pencilColor = focused ? colors.primary : colors.secText;

  return (
    <FormField label={label} error={error}>
      <View
        className={`h-12 w-full flex-row items-center gap-2 rounded-[10px] border bg-white px-4 ${borderClass}`}
        style={{ direction: 'ltr' }}
      >
        <MaterialDesignIcons name="pencil-outline" size={22} color={pencilColor} />
        <TextInput
          value={value}
          onChangeText={onChangeText}
          placeholder={placeholder}
          placeholderTextColor={colors.secText}
          keyboardType="phone-pad"
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          textAlign={TEXT_INPUT_START_ALIGN}
          className="min-w-0 flex-1 text-sm leading-[18px] text-slate-400"
          style={{ fontFamily: cairo.regular }}
        />
        <View className="flex-row items-center gap-1">
          <Text className="text-sm leading-[18px] text-slate-400" style={{ fontFamily: cairo.regular }}>
            {`(+${SA_DIAL_CODE})`}
          </Text>
          <View className="size-5 overflow-hidden">
            <Image source={ksaFlag} style={{ width: 20, height: 20 }} contentFit="cover" />
          </View>
          <View className="size-[14px] overflow-hidden">
            <Image source={caretDown} style={{ width: 14, height: 14 }} contentFit="contain" />
          </View>
        </View>
      </View>
    </FormField>
  );
}
