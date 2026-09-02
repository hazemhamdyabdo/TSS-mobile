import { MaterialDesignIcons } from '@react-native-vector-icons/material-design-icons';
import { useState } from 'react';
import { TextInput, View } from 'react-native';

import FormField from '@/components/form/FormField';
import {
  APP_DIRECTION,
  RTL_CONTAINER_STYLE,
  TEXT_INPUT_START_ALIGN,
} from '@/localization/direction';
import { colors } from '@/theme/colors';
import { cairo } from '@/theme/typography';

type ProfileTextFieldProps = {
  label: string;
  value: string;
  placeholder: string;
  error?: string;
  editable?: boolean;
  showPencil?: boolean;
  keyboardType?: 'default' | 'email-address';
  onChangeText: (value: string) => void;
};

export default function ProfileTextField({
  label,
  value,
  placeholder,
  error,
  editable = true,
  showPencil = true,
  keyboardType = 'default',
  onChangeText,
}: ProfileTextFieldProps) {
  const [focused, setFocused] = useState(false);
  const borderClass = error ? 'border-rejected' : focused ? 'border-primary' : 'border-slate-100';
  const pencilColor = focused ? colors.primary : colors.secText;

  return (
    <FormField label={label} error={error}>
      <View
        className={`h-12 w-full flex-row items-center rounded-[10px] border bg-white px-4 ${borderClass}`}
        style={RTL_CONTAINER_STYLE}
      >
        <TextInput
          value={value}
          onChangeText={onChangeText}
          placeholder={placeholder}
          placeholderTextColor={colors.secText}
          keyboardType={keyboardType}
          autoCapitalize={keyboardType === 'email-address' ? 'none' : 'sentences'}
          editable={editable}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          textAlign={TEXT_INPUT_START_ALIGN}
          className="min-w-0 flex-1 text-sm leading-[18px] text-slate-400"
          style={{ fontFamily: cairo.regular, writingDirection: APP_DIRECTION }}
        />
        {showPencil ? (
          <MaterialDesignIcons name="pencil-outline" size={22} color={pencilColor} />
        ) : null}
      </View>
    </FormField>
  );
}
