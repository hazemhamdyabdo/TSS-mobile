import { SvgXml } from 'react-native-svg';

import {
  GUEST_CLUBS_ICON_XML,
  GUEST_COMPETITIONS_ICON_XML,
  GUEST_NEWS_ICON_XML,
  GUEST_PLAYERS_ICON_XML,
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
    case 'competitions':
      return <SvgXml xml={GUEST_COMPETITIONS_ICON_XML} width={size} height={size} />;
    case 'clubs':
      return <SvgXml xml={GUEST_CLUBS_ICON_XML} width={size} height={size} />;
    case 'players':
      return <SvgXml xml={GUEST_PLAYERS_ICON_XML} width={size} height={size} />;
    case 'news':
      return <SvgXml xml={GUEST_NEWS_ICON_XML} width={size} height={size} />;
    default: {
      const exhaustive: never = actionId;
      throw new Error(`Unhandled guest quick action: ${exhaustive}`);
    }
  }
}
