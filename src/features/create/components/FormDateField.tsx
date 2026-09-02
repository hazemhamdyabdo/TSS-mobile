import DateTimePicker, {
  type DateTimePickerChangeEvent,
} from "@react-native-community/datetimepicker";
import { MaterialDesignIcons } from "@react-native-vector-icons/material-design-icons";
import { useState, type ReactNode } from "react";
import { Platform, Pressable, Text, TextInput, View } from "react-native";

import {
  RTL_CONTAINER_STYLE,
  RTL_TEXT_STYLE,
  TEXT_INPUT_START_ALIGN,
} from "@/localization/direction";
import { colors } from "@/theme/colors";
import { cairo } from "@/theme/typography";

import { parseIsoDate, toDisplayDate, toIsoDate } from "../utils/dates";
import FormField from "./FormField";

type FormDateFieldProps = {
  label: string;
  required?: boolean;
  error?: string;
  value: string;
  placeholder: string;
  onChange: (value: string) => void;
  maximumDate?: Date;
  flex?: boolean;
};

function DateFieldFrame({
  error,
  children,
}: {
  error?: string;
  children: ReactNode;
}) {
  return (
    <View
      className={`h-12 w-full flex-row items-center gap-2 rounded-[10px] border bg-white px-4 ${error ? "border-rejected" : "border-slate-100"}`}
      style={RTL_CONTAINER_STYLE}
    >
      {children}
      <MaterialDesignIcons
        name="calendar-outline"
        size={16}
        color={colors.secText}
      />
    </View>
  );
}

export default function FormDateField({
  label,
  required = false,
  error,
  value,
  placeholder,
  onChange,
  maximumDate,
  flex = false,
}: FormDateFieldProps) {
  const [open, setOpen] = useState(false);
  const selectedDate = value ? parseIsoDate(value) : new Date();
  const displayValue = value ? toDisplayDate(value) : "";

  const handleValueChange = (_event: DateTimePickerChangeEvent, date: Date) => {
    if (Platform.OS === "android") {
      setOpen(false);
    }

    onChange(toIsoDate(date));
  };

  return (
    <FormField label={label} required={required} error={error} flex={flex}>
      {Platform.OS === "web" ? (
        <DateFieldFrame error={error}>
          <TextInput
            value={displayValue}
            placeholder={placeholder}
            placeholderTextColor={colors.secText}
            onChangeText={(text) => {
              const match = text.match(/^(\d{2})\/(\d{2})\/(\d{4})$/);
              if (match) {
                onChange(`${match[3]}-${match[1]}-${match[2]}`);
              }
            }}
            textAlign={TEXT_INPUT_START_ALIGN}
            className="min-w-0 flex-1 text-sm leading-4.5 text-label"
            style={{ fontFamily: cairo.regular }}
          />
        </DateFieldFrame>
      ) : (
        <>
          <Pressable
            accessibilityRole="button"
            onPress={() => setOpen((current) => !current)}
          >
            <DateFieldFrame error={error}>
              <Text
                className={`min-w-0 flex-1 text-sm leading-4.5 ${value ? "text-label" : "text-sec-text"}`}
                style={{ fontFamily: cairo.regular, ...RTL_TEXT_STYLE }}
              >
                {displayValue || placeholder}
              </Text>
            </DateFieldFrame>
          </Pressable>
          {open ? (
            <DateTimePicker
              value={selectedDate}
              mode="date"
              display={Platform.OS === "ios" ? "spinner" : "default"}
              maximumDate={maximumDate}
              onValueChange={handleValueChange}
              onDismiss={() => setOpen(false)}
            />
          ) : null}
        </>
      )}
    </FormField>
  );
}
