import {
  BottomSheetBackdrop,
  BottomSheetModal,
  BottomSheetView,
  type BottomSheetBackdropProps,
} from '@gorhom/bottom-sheet';
import { Image } from 'expo-image';
import { forwardRef, useCallback, useImperativeHandle, useMemo, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { Text, View } from 'react-native';
import { SvgXml } from 'react-native-svg';

import { cairo } from '@/theme/typography';
import { presentBottomSheet } from '@/utils/presentBottomSheet';

import { QR_BADGE_ICON_XML } from '../constants/iconXml';
import type { MemberCategory } from '../types';

const qrCodeImage = require('@/assets/images/QR.png');

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
        <Image
          source={qrCodeImage}
          style={{ width: 160, height: 160 }}
          contentFit="contain"
          accessibilityLabel={t(titleKey)}
        />
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
