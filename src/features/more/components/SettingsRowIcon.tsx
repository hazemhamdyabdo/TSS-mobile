import { SvgXml } from 'react-native-svg';

import {
  DARK_MODE_ICON_XML,
  HELP_ICON_XML,
  LANGUAGE_ICON_XML,
  LOGOUT_ICON_XML,
  NOTIFICATIONS_ICON_XML,
  PRIVACY_ICON_XML,
  USER_ICON_XML,
} from '../constants/iconXml';
import type { SettingsRowId } from '../types';

type SettingsRowIconProps = {
  rowId: SettingsRowId;
};

export default function SettingsRowIcon({ rowId }: SettingsRowIconProps) {
  switch (rowId) {
    case 'profile':
      return <SvgXml xml={USER_ICON_XML} width={21} height={21} />;
    case 'notifications':
      return <SvgXml xml={NOTIFICATIONS_ICON_XML} width={22} height={22} />;
    case 'language':
      return <SvgXml xml={LANGUAGE_ICON_XML} width={22} height={22} />;
    case 'privacy':
      return <SvgXml xml={PRIVACY_ICON_XML} width={20} height={20} />;
    case 'help':
      return <SvgXml xml={HELP_ICON_XML} width={24} height={24} />;
    case 'darkMode':
      return <SvgXml xml={DARK_MODE_ICON_XML} width={22} height={22} />;
    case 'logout':
    case 'login':
      return <SvgXml xml={LOGOUT_ICON_XML} width={22} height={22} />;
    default: {
      const exhaustive: never = rowId;
      throw new Error(`Unhandled settings row: ${exhaustive}`);
    }
  }
}
