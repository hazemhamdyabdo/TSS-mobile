import {
  BottomSheetBackdrop,
  BottomSheetModal,
  BottomSheetView,
  type BottomSheetBackdropProps,
} from "@gorhom/bottom-sheet";
import { MaterialDesignIcons } from "@react-native-vector-icons/material-design-icons";
import {
  forwardRef,
  useCallback,
  useImperativeHandle,
  useMemo,
  useRef,
} from "react";
import { useTranslation } from "react-i18next";
import { Pressable, Text, View } from "react-native";

import { RTL_CONTAINER_STYLE, RTL_TEXT_STYLE } from "@/localization/direction";
import { colors } from "@/theme/colors";
import { cairo } from "@/theme/typography";
import { presentBottomSheet } from "@/utils/presentBottomSheet";

export type CompetitionOptionsBottomSheetRef = {
  open: () => void;
  close: () => void;
};

type CompetitionOptionsBottomSheetProps = {
  onEdit: () => void;
  onDelete: () => void;
};

const CompetitionOptionsBottomSheet = forwardRef<
  CompetitionOptionsBottomSheetRef,
  CompetitionOptionsBottomSheetProps
>(function CompetitionOptionsBottomSheet({ onEdit, onDelete }, ref) {
  const { t } = useTranslation();
  const bottomSheetRef = useRef<BottomSheetModal>(null);
  const snapPoints = useMemo(() => ["28%"], []);

  useImperativeHandle(ref, () => ({
    open: () => presentBottomSheet(() => bottomSheetRef.current?.present()),
    close: () => bottomSheetRef.current?.dismiss(),
  }));

  const renderBackdrop = useCallback(
    (props: BottomSheetBackdropProps) => (
      <BottomSheetBackdrop
        {...props}
        appearsOnIndex={0}
        disappearsOnIndex={-1}
        pressBehavior="close"
      />
    ),
    [],
  );

  return (
    <BottomSheetModal
      ref={bottomSheetRef}
      snapPoints={snapPoints}
      enablePanDownToClose
      backdropComponent={renderBackdrop}
    >
      <BottomSheetView className="gap-2 px-5 pb-8 pt-2 bg-background ">
        <Pressable
          accessibilityRole="button"
          onPress={() => {
            bottomSheetRef.current?.dismiss();
            onEdit();
          }}
          className="h-14 flex-row items-center gap-3 rounded-xl bg-white border border-slate-100 px-3"
          style={RTL_CONTAINER_STYLE}
        >
          <View className="size-10 items-center justify-center rounded-lg bg-primary/10">
            <MaterialDesignIcons
              name="pencil-outline"
              size={20}
              color={colors.primary}
            />
          </View>
          <Text
            className="text-sm text-accent"
            style={{ fontFamily: cairo.medium, ...RTL_TEXT_STYLE }}
          >
            {t("competitions.actions.edit")}
          </Text>
        </Pressable>
        <Pressable
          accessibilityRole="button"
          onPress={() => {
            bottomSheetRef.current?.dismiss();
            onDelete();
          }}
          className="h-14 flex-row items-center gap-3 rounded-xl bg-white border border-slate-100 px-3"
          style={RTL_CONTAINER_STYLE}
        >
          <View className="size-10 items-center justify-center rounded-lg bg-rejected/10">
            <MaterialDesignIcons
              name="trash-can-outline"
              size={20}
              color={colors.rejected}
            />
          </View>
          <Text
            className="text-sm text-rejected"
            style={{ fontFamily: cairo.medium, ...RTL_TEXT_STYLE }}
          >
            {t("competitions.actions.delete")}
          </Text>
        </Pressable>
      </BottomSheetView>
    </BottomSheetModal>
  );
});

export default CompetitionOptionsBottomSheet;
