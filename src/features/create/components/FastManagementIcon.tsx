import { Image } from 'expo-image';

import QuickActionIcon from '@/features/home/components/QuickActionIcon';

import type { CreateActionId } from '../types';

const clubIcon = require('@/assets/images/create/icon-club.png');
const administratorIcon = require('@/assets/images/create/icon-administrator.png');
const punishmentIcon = require('@/assets/images/create/icon-punishment.png');

type FastManagementIconProps = {
  actionId: CreateActionId;
};

export default function FastManagementIcon({ actionId }: FastManagementIconProps) {
  switch (actionId) {
    case 'addPlayer':
    case 'addCoach':
    case 'addReferee':
    case 'addCompetition':
      return <QuickActionIcon actionId={actionId} />;
    case 'addClub':
      return <Image source={clubIcon} style={{ width: 24, height: 24 }} contentFit="contain" />;
    case 'addAdministrator':
      return (
        <Image source={administratorIcon} style={{ width: 24, height: 24 }} contentFit="contain" />
      );
    case 'addPunishment':
      return <Image source={punishmentIcon} style={{ width: 24, height: 24 }} contentFit="contain" />;
    default: {
      const exhaustive: never = actionId;
      throw new Error(`Unhandled create action: ${exhaustive}`);
    }
  }
}
