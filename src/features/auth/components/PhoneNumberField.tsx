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
};

export default function PhoneNumberField({
  value,
  onChangeText,
  placeholder,
  hasError = false,
}: PhoneNumberFieldProps) {
  const countrySheetRef = useRef<CountryPickerBottomSheetRef>(null);
  const [iso2, setIso2] = useState("sa");
  const dialCode =
    COUNTRIES.find((country) => country.iso2 === iso2)?.dialCode ?? "+966";
  const national = nationalDigitsFromDisplay(value, dialCode);

  return (
    <>
      <View
        className={`h-12 w-full flex-row items-center gap-2 rounded-[10px] border bg-white px-3 ${
          hasError ? "border-rejected" : "border-slate-100"
        }`}
        style={{ direction: "ltr" }}
      >
        <View className="min-w-0 flex-1 self-stretch justify-center">
          <TextInput
            value={national}
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
            textAlign="left"
            className="h-full w-full text-sm leading-[18px] text-label"
            style={{
              fontFamily: cairo.regular,
              writingDirection: "ltr",
              includeFontPadding: false,
              textAlignVertical: "center",
              paddingVertical: 0,
            }}
          />
        </View>

        <Pressable
          accessibilityRole="button"
          onPress={() => countrySheetRef.current?.open()}
          className="shrink-0 flex-row items-center gap-2"
        >
          <Text
            className="text-sm text-label"
            style={{ fontFamily: cairo.regular, writingDirection: "ltr" }}
          >
            {dialCode}
          </Text>
          <PhoneCountryFlag iso2={iso2} />
        </Pressable>
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
