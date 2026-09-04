import {
  BottomSheetBackdrop,
  BottomSheetFlatList,
  BottomSheetModal,
  BottomSheetTextInput,
  type BottomSheetBackdropProps,
} from '@gorhom/bottom-sheet';
import { forwardRef, useCallback, useImperativeHandle, useMemo, useRef, useState } from 'react';
import { Pressable, Text, View } from 'react-native';
import { useTranslation } from 'react-i18next';

import { RTL_CONTAINER_STYLE, RTL_TEXT_STYLE, TEXT_INPUT_START_ALIGN } from '@/localization/direction';
import { colors } from '@/theme/colors';
import { cairo } from '@/theme/typography';
import { presentBottomSheet } from '@/utils/presentBottomSheet';

import PhoneCountryFlag from './PhoneCountryFlag';

export type CountryPickerOption = {
  iso2: string;
  name: string;
  dialCode: string;
};

export type CountryPickerBottomSheetRef = {
  open: () => void;
  close: () => void;
};

type CountryPickerBottomSheetProps = {
  countries: CountryPickerOption[];
  selectedIso2: string;
  onSelect: (iso2: string) => void;
};

const CountryPickerBottomSheet = forwardRef<
  CountryPickerBottomSheetRef,
  CountryPickerBottomSheetProps
>(function CountryPickerBottomSheet({ countries, selectedIso2, onSelect }, ref) {
  const { t } = useTranslation();
  const bottomSheetRef = useRef<BottomSheetModal>(null);
  const snapPoints = useMemo(() => ['75%'], []);
  const [query, setQuery] = useState('');

  useImperativeHandle(ref, () => ({
    open: () => presentBottomSheet(() => bottomSheetRef.current?.present()),
    close: () => bottomSheetRef.current?.dismiss(),
  }));

  const renderBackdrop = useCallback(
    (props: BottomSheetBackdropProps) => (
      <BottomSheetBackdrop {...props} appearsOnIndex={0} disappearsOnIndex={-1} pressBehavior="close" />
    ),
    [],
  );

  const filteredCountries = useMemo(() => {
    const normalized = query.trim().toLowerCase();
    if (!normalized) {
      return countries;
    }

    return countries.filter((country) => {
      return (
        country.name.toLowerCase().includes(normalized) ||
        country.dialCode.toLowerCase().includes(normalized) ||
        country.iso2.toLowerCase().includes(normalized)
      );
    });
  }, [countries, query]);

  return (
    <BottomSheetModal
      ref={bottomSheetRef}
      snapPoints={snapPoints}
      enablePanDownToClose
      keyboardBehavior="extend"
      android_keyboardInputMode="adjustResize"
      backdropComponent={renderBackdrop}
      onDismiss={() => setQuery('')}>
      <BottomSheetFlatList
        data={filteredCountries}
        extraData={selectedIso2}
        keyExtractor={(item) => item.iso2}
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={{ paddingHorizontal: 20, paddingBottom: 32 }}
        ListHeaderComponent={
          <View className="gap-3 pb-3" style={RTL_CONTAINER_STYLE}>
            <Text className="text-base text-label" style={{ fontFamily: cairo.semiBold, ...RTL_TEXT_STYLE }}>
              {t('auth.selectCountry')}
            </Text>
            <BottomSheetTextInput
              value={query}
              onChangeText={setQuery}
              placeholder={t('auth.searchCountry')}
              placeholderTextColor={colors.secText}
              textAlign={TEXT_INPUT_START_ALIGN}
              className="h-11 rounded-[10px] border border-slate-100 bg-white px-3 text-sm text-label"
              style={{ fontFamily: cairo.regular, ...RTL_TEXT_STYLE }}
            />
          </View>
        }
        renderItem={({ item }) => {
          const selected = item.iso2 === selectedIso2;

          return (
            <Pressable
              accessibilityRole="button"
              onPress={() => {
                onSelect(item.iso2);
                bottomSheetRef.current?.dismiss();
              }}
              className={`w-full flex-row items-center gap-3 rounded-lg px-3 py-3 ${
                selected ? 'bg-primary/10' : ''
              }`}
              style={RTL_CONTAINER_STYLE}>
              <PhoneCountryFlag iso2={item.iso2} />
              <Text
                className={`min-w-16 text-sm ${selected ? 'text-primary' : 'text-label'}`}
                style={{ fontFamily: cairo.semiBold, ...RTL_TEXT_STYLE }}>
                {item.dialCode}
              </Text>
              <Text
                className={`min-w-0 flex-1 text-sm ${selected ? 'text-primary' : 'text-label'}`}
                style={{ fontFamily: cairo.regular, ...RTL_TEXT_STYLE }}>
                {item.name}
              </Text>
            </Pressable>
          );
        }}
      />
    </BottomSheetModal>
  );
});

export default CountryPickerBottomSheet;
