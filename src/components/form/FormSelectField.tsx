import { Image } from 'expo-image';
import { useRef } from 'react';
import { Pressable, Text, View } from 'react-native';
import { useTranslation } from 'react-i18next';

import FormField from '@/components/form/FormField';
import OptionPickerBottomSheet, {
  type OptionPickerBottomSheetRef,
} from '@/components/form/OptionPickerBottomSheet';
import type { SelectOption } from '@/components/form/types';
import { RTL_CONTAINER_STYLE, RTL_TEXT_STYLE } from '@/localization/direction';
import { cairo } from '@/theme/typography';

const caretDown = require('@/assets/images/auth/caret-down.png');

type FormSelectFieldProps = {
  label: string;
  required?: boolean;
  error?: string;
  value: string;
  placeholder: string;
  options: SelectOption[];
  onChange: (value: string) => void;
  flex?: boolean;
};

export default function FormSelectField({
  label,
  required = false,
  error,
  value,
  placeholder,
  options,
  onChange,
  flex = false,
}: FormSelectFieldProps) {
  const { t } = useTranslation();
  const sheetRef = useRef<OptionPickerBottomSheetRef>(null);
  const selected = options.find((option) => option.value === value);

  return (
    <FormField label={label} required={required} error={error} flex={flex}>
      <Pressable
        accessibilityRole="button"
        onPress={() => sheetRef.current?.open()}
        className={`h-12 w-full flex-row items-center gap-2 rounded-[10px] border bg-white px-4 ${error ? 'border-rejected' : 'border-slate-100'}`}
        style={RTL_CONTAINER_STYLE}>
        <Text
          className={`min-w-0 flex-1 text-sm leading-[18px] ${selected ? 'text-label' : 'text-sec-text'}`}
          style={{ fontFamily: cairo.regular, ...RTL_TEXT_STYLE }}
          numberOfLines={1}>
          {selected ? t(selected.labelKey) : placeholder}
        </Text>
        <View className="size-[18px] overflow-hidden">
          <Image source={caretDown} style={{ width: 18, height: 18 }} contentFit="contain" />
        </View>
      </Pressable>
      <OptionPickerBottomSheet
        ref={sheetRef}
        options={options}
        selectedValue={value}
        onSelect={onChange}
      />
    </FormField>
  );
}
