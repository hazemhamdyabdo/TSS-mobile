import {
  BottomSheetBackdrop,
  BottomSheetModal,
  BottomSheetView,
  type BottomSheetBackdropProps,
} from '@gorhom/bottom-sheet';
import { useRouter, type Href } from 'expo-router';
import { forwardRef, useCallback, useImperativeHandle, useRef } from 'react';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { colors } from '@/theme/colors';
import { presentBottomSheet } from '@/utils/presentBottomSheet';

import LoginContent from './LoginContent';

export type LoginBottomSheetRef = {
  open: () => void;
  close: () => void;
};

const LoginBottomSheet = forwardRef<LoginBottomSheetRef>(function LoginBottomSheet(_, ref) {
  const bottomSheetRef = useRef<BottomSheetModal>(null);
  const pendingRouteRef = useRef<Href | null>(null);
  const insets = useSafeAreaInsets();
  const router = useRouter();

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

  const navigateAfterDismiss = useCallback((href: Href) => {
    pendingRouteRef.current = href;
    bottomSheetRef.current?.dismiss();
  }, []);

  const handleDismiss = useCallback(() => {
    const pendingRoute = pendingRouteRef.current;
    pendingRouteRef.current = null;

    if (pendingRoute) {
      router.push(pendingRoute);
    }
  }, [router]);

  return (
    <BottomSheetModal
      ref={bottomSheetRef}
      enableDynamicSizing
      enablePanDownToClose
      keyboardBehavior="interactive"
      keyboardBlurBehavior="restore"
      android_keyboardInputMode="adjustResize"
      backdropComponent={renderBackdrop}
      onDismiss={handleDismiss}
      backgroundStyle={{ backgroundColor: colors.background, borderRadius: 32 }}
      handleIndicatorStyle={{ backgroundColor: colors.slate300 }}>
      <BottomSheetView
        className="w-full px-5 pt-1"
        style={{ paddingBottom: Math.max(insets.bottom, 24) }}>
        <LoginContent
          onOtpRequested={(phone) =>
            navigateAfterDismiss(
              `/(auth)/otp?phone=${encodeURIComponent(phone)}` as unknown as Href,
            )
          }
          onContactPress={() => navigateAfterDismiss('/(auth)/contact')}
        />
      </BottomSheetView>
    </BottomSheetModal>
  );
});

export default LoginBottomSheet;
