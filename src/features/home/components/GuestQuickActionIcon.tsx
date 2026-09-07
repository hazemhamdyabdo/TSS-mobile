import { SvgXml } from 'react-native-svg';

import {
  GUEST_COMPETITIONS_ICON_XML,
  GUEST_PENALTIES_ICON_XML,
  GUEST_PROFILE_ICON_XML,
  GUEST_RANKINGS_ICON_XML,
} from '../constants/guestIcons';
import type { GuestQuickActionId } from '../types';

type GuestQuickActionIconProps = {
  actionId: GuestQuickActionId;
  size?: number;
};

export default function GuestQuickActionIcon({
  actionId,
  size = 24,
}: GuestQuickActionIconProps) {
  switch (actionId) {
    case 'myCompetitions':
      return <SvgXml xml={GUEST_COMPETITIONS_ICON_XML} width={size} height={size} />;
    case 'rankings':
      return <SvgXml xml={GUEST_RANKINGS_ICON_XML} width={size} height={size} />;
    case 'penalties':
      return <SvgXml xml={GUEST_PENALTIES_ICON_XML} width={size} height={size} />;
    case 'profile':
      return <SvgXml xml={GUEST_PROFILE_ICON_XML} width={size} height={size} />;
    default: {
      const exhaustive: never = actionId;
      throw new Error(`Unhandled guest quick action: ${exhaustive}`);
    }
  }
}
