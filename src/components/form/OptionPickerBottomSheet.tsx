import {
  BottomSheetBackdrop,
  BottomSheetModal,
  BottomSheetView,
  type BottomSheetBackdropProps,
} from '@gorhom/bottom-sheet';
import { forwardRef, useCallback, useImperativeHandle, useMemo, useRef } from 'react';
import { Pressable, Text } from 'react-native';
import { useTranslation } from 'react-i18next';

import type { SelectOption } from '@/components/form/types';
import { RTL_TEXT_STYLE } from '@/localization/direction';
import { cairo } from '@/theme/typography';
import { presentBottomSheet } from '@/utils/presentBottomSheet';

export type OptionPickerBottomSheetRef = {
  open: () => void;
  close: () => void;
};

type OptionPickerBottomSheetProps = {
  options: SelectOption[];
  selectedValue?: string;
  onSelect: (value: string) => void;
};

const OptionPickerBottomSheet = forwardRef<OptionPickerBottomSheetRef, OptionPickerBottomSheetProps>(
  function OptionPickerBottomSheet({ options, selectedValue, onSelect }, ref) {
    const { t } = useTranslation();
    const bottomSheetRef = useRef<BottomSheetModal>(null);
    const snapPoints = useMemo(() => ['40%', '70%'], []);

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

    return (
      <BottomSheetModal
        ref={bottomSheetRef}
        snapPoints={snapPoints}
        enablePanDownToClose
        backdropComponent={renderBackdrop}>
        <BottomSheetView className="px-5 pb-8 pt-2">
          {options.map((option) => {
            const selected = option.value === selectedValue;

            return (
              <Pressable
                key={option.value}
                accessibilityRole="button"
                onPress={() => {
                  onSelect(option.value);
                  bottomSheetRef.current?.dismiss();
                }}
                className={`w-full rounded-lg px-3 py-3 ${selected ? 'bg-primary/10' : ''}`}>
                <Text
                  className={`w-full text-sm ${selected ? 'text-primary' : 'text-label'}`}
                  style={{
                    fontFamily: selected ? cairo.semiBold : cairo.regular,
                    ...RTL_TEXT_STYLE,
                  }}>
                  {t(option.labelKey)}
                </Text>
              </Pressable>
            );
          })}
        </BottomSheetView>
      </BottomSheetModal>
    );
  },
);

export default OptionPickerBottomSheet;
