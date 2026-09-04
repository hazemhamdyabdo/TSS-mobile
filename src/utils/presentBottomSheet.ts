import { Keyboard } from 'react-native';

const KEYBOARD_DISMISS_FALLBACK_MS = 400;

/** Present a sheet only after the keyboard has released its screen space. */
export function presentBottomSheet(present: () => void) {
  if (!Keyboard.isVisible()) {
    present();
    return;
  }

  let presented = false;
  let fallback: ReturnType<typeof setTimeout> | undefined;

  const show = () => {
    if (presented) return;

    presented = true;
    subscription.remove();
    if (fallback) clearTimeout(fallback);
    requestAnimationFrame(present);
  };

  const subscription = Keyboard.addListener('keyboardDidHide', show);
  fallback = setTimeout(show, KEYBOARD_DISMISS_FALLBACK_MS);
  Keyboard.dismiss();
}
