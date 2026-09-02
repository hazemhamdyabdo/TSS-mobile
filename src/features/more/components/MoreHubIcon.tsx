import { SvgXml } from 'react-native-svg';

import {
  CLUBS_ICON_XML,
  PUNISHMENTS_ICON_XML,
  RANKINGS_ICON_XML,
  RESULTS_ICON_XML,
  SETTINGS_ICON_XML,
  TRANSFERS_ICON_XML,
} from '../constants/iconXml';
import type { MoreHubId } from '../types';

type MoreHubIconProps = {
  actionId: MoreHubId;
};

export default function MoreHubIcon({ actionId }: MoreHubIconProps) {
  switch (actionId) {
    case 'clubs':
      return <SvgXml xml={CLUBS_ICON_XML} width={24} height={24} />;
    case 'rankings':
      return <SvgXml xml={RANKINGS_ICON_XML} width={24} height={24} />;
    case 'results':
      return <SvgXml xml={RESULTS_ICON_XML} width={24} height={24} />;
    case 'punishments':
      return <SvgXml xml={PUNISHMENTS_ICON_XML} width={24} height={24} />;
    case 'transfers':
      return <SvgXml xml={TRANSFERS_ICON_XML} width={20} height={20} />;
    case 'settings':
      return <SvgXml xml={SETTINGS_ICON_XML} width={20} height={20} />;
    default: {
      const exhaustive: never = actionId;
      throw new Error(`Unhandled more hub action: ${exhaustive}`);
    }
  }
}
