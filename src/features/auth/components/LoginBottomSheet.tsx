import {
  BottomSheetBackdrop,
  BottomSheetModal,
  BottomSheetScrollView,
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

type PendingNavigation = {
  href: Href;
  replace?: boolean;
};

const LoginBottomSheet = forwardRef<LoginBottomSheetRef>(function LoginBottomSheet(_, ref) {
  const bottomSheetRef = useRef<BottomSheetModal>(null);
  const pendingRouteRef = useRef<PendingNavigation | null>(null);
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

  const navigateAfterDismiss = useCallback((href: Href, options?: { replace?: boolean }) => {
    pendingRouteRef.current = { href, replace: options?.replace };
    bottomSheetRef.current?.dismiss();
  }, []);

  const handleDismiss = useCallback(() => {
    const pendingRoute = pendingRouteRef.current;
    pendingRouteRef.current = null;

    if (!pendingRoute) {
      return;
    }

    if (pendingRoute.replace) {
      router.replace(pendingRoute.href);
      return;
    }

    router.push(pendingRoute.href);
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
      <BottomSheetScrollView
        className="w-full"
        contentContainerClassName="px-5 pt-1"
        contentContainerStyle={{ paddingBottom: Math.max(insets.bottom, 24) }}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}>
        <LoginContent
          onOtpRequested={(phone) =>
            navigateAfterDismiss(
              `/(auth)/otp?phone=${encodeURIComponent(phone)}` as unknown as Href,
            )
          }
          onContactPress={() => navigateAfterDismiss('/(auth)/contact')}
          onGuestEntered={() =>
            navigateAfterDismiss('/(tabs)', { replace: true })
          }
        />
      </BottomSheetScrollView>
    </BottomSheetModal>
  );
});

export default LoginBottomSheet;
