import { SvgXml } from 'react-native-svg';

import {
  GUEST_COMPETITIONS_ICON_XML,
  GUEST_PENALTIES_ICON_XML,
  GUEST_PROFILE_ICON_XML,
  GUEST_RANKINGS_ICON_XML,
} from '../constants/guestIcons';
import type { PlayerQuickActionId } from '../types';

type PlayerQuickActionIconProps = {
  actionId: PlayerQuickActionId;
};

export default function PlayerQuickActionIcon({ actionId }: PlayerQuickActionIconProps) {
  switch (actionId) {
    case 'myCompetitions':
      return <SvgXml xml={GUEST_COMPETITIONS_ICON_XML} width={24} height={24} />;
    case 'rankings':
      return <SvgXml xml={GUEST_RANKINGS_ICON_XML} width={24} height={24} />;
    case 'punishments':
      return <SvgXml xml={GUEST_PENALTIES_ICON_XML} width={24} height={24} />;
    case 'profile':
      return <SvgXml xml={GUEST_PROFILE_ICON_XML} width={24} height={24} />;
    default: {
      const exhaustive: never = actionId;
      throw new Error(`Unhandled player quick action: ${exhaustive}`);
    }
  }
}
