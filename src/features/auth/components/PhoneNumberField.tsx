import { MaterialDesignIcons } from "@react-native-vector-icons/material-design-icons";
import { useRef, useState } from "react";
import { Pressable, Text, TextInput, View } from "react-native";

import { colors } from "@/theme/colors";
import { cairo } from "@/theme/typography";
import { onlyDigits } from "@/utils/digits";

import CountryPickerBottomSheet, {
  type CountryPickerBottomSheetRef,
  type CountryPickerOption,
} from "./CountryPickerBottomSheet";
import PhoneCountryFlag from "./PhoneCountryFlag";

type PackageCountry = {
  name: string;
  iso2: string;
  dialCode: string;
};

const COUNTRIES: CountryPickerOption[] = withSaudiFirst(
  (
    require("react-native-phone-input/dist/resources/countries.json") as PackageCountry[]
  ).map((country) => ({
    iso2: country.iso2,
    name: country.name,
    dialCode: `+${country.dialCode}`,
  })),
);

type PhoneNumberFieldProps = {
  value: string;
  onChangeText: (value: string) => void;
  placeholder: string;
  hasError?: boolean;
  variant?: "default" | "profile";
};

export default function PhoneNumberField({
  value,
  onChangeText,
  placeholder,
  hasError = false,
  variant = "default",
}: PhoneNumberFieldProps) {
  const countrySheetRef = useRef<CountryPickerBottomSheetRef>(null);
  const [iso2, setIso2] = useState("sa");
  const [focused, setFocused] = useState(false);
  const dialCode =
    COUNTRIES.find((country) => country.iso2 === iso2)?.dialCode ?? "+966";
  const national = nationalDigitsFromDisplay(value, dialCode);
  const isProfile = variant === "profile";
  const borderClass = hasError
    ? "border-rejected"
    : focused
      ? "border-primary"
      : "border-slate-100";

  const countryPicker = (
    <Pressable
      accessibilityRole="button"
      onPress={() => countrySheetRef.current?.open()}
      className="shrink-0 flex-row items-center gap-1"
    >
      {isProfile ? (
        <>
          <Text
            className="text-sm text-slate-400"
            style={{ fontFamily: cairo.regular, writingDirection: "ltr" }}
          >
            {`(${dialCode})`}
          </Text>
          <PhoneCountryFlag iso2={iso2} size={20} />
          <MaterialDesignIcons name="chevron-down" size={14} color={colors.secText} />
        </>
      ) : (
        <>
          <PhoneCountryFlag iso2={iso2} />
          <Text
            className="text-sm text-label"
            style={{ fontFamily: cairo.regular, writingDirection: "ltr" }}
          >
            {dialCode}
          </Text>
        </>
      )}
    </Pressable>
  );

  const phoneInput = (
    <View className="min-w-0 flex-1 self-stretch justify-center">
      <TextInput
        value={isProfile ? formatProfilePhone(national) : national}
        onChangeText={(text) => {
          const digits = onlyDigits(text);
          onChangeText(digits ? `${dialCode}${digits}` : "");
        }}
        placeholder={placeholder}
        placeholderTextColor={colors.secText}
        keyboardType="number-pad"
        textContentType="telephoneNumber"
        autoComplete="tel"
        autoCorrect={false}
        autoCapitalize="none"
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        textAlign={isProfile ? "right" : "left"}
        className={`h-full w-full text-sm leading-[18px] ${isProfile ? "text-slate-400" : "text-label"}`}
        style={{
          fontFamily: cairo.regular,
          writingDirection: "ltr",
          includeFontPadding: false,
          textAlignVertical: "center",
          paddingVertical: 0,
        }}
      />
    </View>
  );

  return (
    <>
      <View
        className={`h-12 w-full flex-row items-center gap-2 rounded-[10px] border bg-white ${isProfile ? "px-4" : "px-3"} ${borderClass}`}
        style={{ direction: "ltr" }}
      >
        {isProfile ? (
          <MaterialDesignIcons
            name="pencil-outline"
            size={22}
            color={focused ? colors.primary : colors.secText}
          />
        ) : null}
        {isProfile ? phoneInput : countryPicker}
        {isProfile ? countryPicker : phoneInput}
      </View>

      <CountryPickerBottomSheet
        ref={countrySheetRef}
        countries={COUNTRIES}
        selectedIso2={iso2}
        onSelect={(nextIso2) => {
          const nextCode =
            COUNTRIES.find((country) => country.iso2 === nextIso2)?.dialCode ??
            "+966";
          setIso2(nextIso2);
          onChangeText(national ? `${nextCode}${national}` : "");
        }}
      />
    </>
  );
}

function nationalDigitsFromDisplay(display: string, dialCode: string) {
  const digits = onlyDigits(display);
  const codeDigits = onlyDigits(dialCode);
  if (digits.startsWith(codeDigits)) {
    return digits.slice(codeDigits.length);
  }

  return digits;
}

function formatProfilePhone(value: string) {
  const digits = onlyDigits(value).slice(0, 9);
  return [digits.slice(0, 2), digits.slice(2, 6), digits.slice(6, 9)]
    .filter(Boolean)
    .join(" ");
}

function withSaudiFirst(countries: CountryPickerOption[]) {
  return [...countries].sort((left, right) => {
    if (left.iso2 === "sa") {
      return -1;
    }

    if (right.iso2 === "sa") {
      return 1;
    }

    return left.name.localeCompare(right.name);
  });
}
