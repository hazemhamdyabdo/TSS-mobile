import {
  BottomSheetBackdrop,
  BottomSheetModal,
  BottomSheetView,
  type BottomSheetBackdropProps,
} from '@gorhom/bottom-sheet';
import { forwardRef, useCallback, useImperativeHandle, useMemo, useRef } from 'react';
import { Text, View } from 'react-native';
import { SvgXml } from 'react-native-svg';
import { useTranslation } from 'react-i18next';

import { cairo } from '@/theme/typography';
import { presentBottomSheet } from '@/utils/presentBottomSheet';

import { QR_BADGE_ICON_XML, QR_GRAPHIC_ICON_XML } from '../constants/iconXml';
import type { MemberCategory } from '../types';

export type MemberQrBottomSheetRef = {
  open: () => void;
  close: () => void;
};

type MemberQrBottomSheetProps = {
  federationId: string;
  category: MemberCategory;
};

export default forwardRef<MemberQrBottomSheetRef, MemberQrBottomSheetProps>(function MemberQrBottomSheet(
  { federationId, category },
  ref,
) {
  const { t } = useTranslation();
  const bottomSheetRef = useRef<BottomSheetModal>(null);
  const snapPoints = useMemo(() => ['58%'], []);

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

  const titleKey = qrTitleKey(category);

  return (
    <BottomSheetModal
      ref={bottomSheetRef}
      snapPoints={snapPoints}
      enablePanDownToClose
      backdropComponent={renderBackdrop}>
      <BottomSheetView className="items-center gap-4 px-5 pb-8 pt-2">
        <Text className="text-sm text-accent" style={{ fontFamily: cairo.medium }}>
          {t(titleKey)}
        </Text>
        <View className="size-12 items-center justify-center rounded-full bg-primary shadow-[0px_0px_3px_3px_rgba(1,138,67,0.2)]">
          <SvgXml xml={QR_BADGE_ICON_XML} width={28} height={28} />
        </View>
        <View className="size-[140px] items-center justify-center overflow-hidden rounded-[7px] border border-slate-100 bg-white">
          <SvgXml xml={QR_GRAPHIC_ICON_XML} width={110} height={110} />
        </View>
        <View className="items-center gap-2">
          <Text className="text-sm text-accent" style={{ fontFamily: cairo.regular }}>
            {t('members.qr.identifier')}
          </Text>
          <Text className="text-lg text-primary" style={{ fontFamily: cairo.semiBold }}>
            {federationId}
          </Text>
        </View>
      </BottomSheetView>
    </BottomSheetModal>
  );
});

function qrTitleKey(category: MemberCategory) {
  switch (category) {
    case 'player':
      return 'members.qr.player';
    case 'coach':
      return 'members.qr.coach';
    case 'referee':
      return 'members.qr.referee';
    case 'administrator':
      return 'members.qr.player';
    default: {
      const exhaustive: never = category;
      throw new Error(`Unhandled member category: ${exhaustive}`);
    }
  }
}
