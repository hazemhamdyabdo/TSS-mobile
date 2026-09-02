import { Platform, type TextStyle, type ViewStyle } from 'react-native';

/**
 * The app is always laid out right-to-left. Direction is a fixed constant here, never
 * derived from the active language or the device locale.
 */
export const APP_DIRECTION = 'rtl' as const;

/**
 * Start-edge alignment for a `textAlign` **style**.
 *
 * Styles must not name a physical side on native: React Native mirrors `left`/`right` when
 * the layout engine is RTL, so `'right'` ends up on the left. `'auto'` means "paragraph
 * start", is never mirrored, and lands on the right. Web has no such mirroring, and
 * react-native-web drops `'auto'` as invalid CSS, so there it needs the physical value.
 */
export const TEXT_START_ALIGN: NonNullable<TextStyle['textAlign']> =
  Platform.OS === 'web' ? 'right' : 'auto';

/**
 * Start-edge alignment for the `TextInput` `textAlign` **prop**, which only accepts a
 * physical side. Direct props skip the RTL style mirroring, so `'right'` stays right.
 */
export const TEXT_INPUT_START_ALIGN = 'right' as const;

/** Direction + start-edge alignment for every string the app renders. */
export const RTL_TEXT_STYLE: TextStyle = {
  textAlign: TEXT_START_ALIGN,
  writingDirection: APP_DIRECTION,
};

/**
 * `direction` is a Yoga layout style: react-native-web rejects it and takes the
 * direction from the document `dir` attribute instead (see `src/app/+html.tsx`).
 */
export const RTL_CONTAINER_STYLE: ViewStyle =
  Platform.OS === 'web' ? {} : { direction: APP_DIRECTION };
