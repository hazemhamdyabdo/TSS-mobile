import { SvgXml } from 'react-native-svg';

import {
  ADD_COACH_ICON_XML,
  ADD_COMPETITION_ICON_XML,
  ADD_PLAYER_ICON_XML,
  ADD_REFEREE_ICON_XML,
} from '../constants/actionIcons';
import type { QuickActionId } from '../types';

type QuickActionIconProps = {
  actionId: QuickActionId;
  size?: number;
};

export default function QuickActionIcon({ actionId, size = 24 }: QuickActionIconProps) {
  switch (actionId) {
    case 'addPlayer':
      return <SvgXml xml={ADD_PLAYER_ICON_XML} width={size} height={size} />;
    case 'addCoach':
      return <SvgXml xml={ADD_COACH_ICON_XML} width={size} height={size} />;
    case 'addReferee':
      return <SvgXml xml={ADD_REFEREE_ICON_XML} width={size} height={size} />;
    case 'addCompetition':
      return <SvgXml xml={ADD_COMPETITION_ICON_XML} width={size} height={size} />;
    default: {
      const exhaustive: never = actionId;
      throw new Error(`Unhandled quick action: ${exhaustive}`);
    }
  }
}
