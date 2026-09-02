import { Text, View } from 'react-native';
import { useTranslation } from 'react-i18next';

import { RTL_TEXT_STYLE } from '@/localization/direction';
import { cairo } from '@/theme/typography';

import type { MemberStatus } from '../types';

type MemberStatusBadgeProps = {
  status: MemberStatus;
  size?: 'sm' | 'md';
};

export default function MemberStatusBadge({ status, size = 'sm' }: MemberStatusBadgeProps) {
  const { t } = useTranslation();
  const isMd = size === 'md';

  switch (status) {
    case 'active':
      return (
        <View
          className={`items-center justify-center rounded-3xl bg-approved-50 px-1.5 ${isMd ? 'h-[19px] px-2' : 'h-[13px]'}`}>
          <Text
            className={`text-approved ${isMd ? 'text-[11px]' : 'text-[8px]'}`}
            style={{ fontFamily: cairo.medium, ...RTL_TEXT_STYLE }}>
            {t('members.status.active')}
          </Text>
        </View>
      );
    case 'suspended':
      return (
        <View
          className={`items-center justify-center rounded-3xl bg-rejected-50 px-1.5 ${isMd ? 'h-[19px] px-2' : 'h-[13px]'}`}>
          <Text
            className={`text-rejected ${isMd ? 'text-[11px]' : 'text-[8px]'}`}
            style={{ fontFamily: cairo.medium, ...RTL_TEXT_STYLE }}>
            {t('members.status.suspended')}
          </Text>
        </View>
      );
    case 'onLeave':
      return (
        <View
          className={`items-center justify-center rounded-3xl bg-pending-50 px-1.5 ${isMd ? 'h-[19px] px-2' : 'h-[13px]'}`}>
          <Text
            className={`text-pending ${isMd ? 'text-[11px]' : 'text-[8px]'}`}
            style={{ fontFamily: cairo.medium, ...RTL_TEXT_STYLE }}>
            {t('members.status.onLeave')}
          </Text>
        </View>
      );
    default: {
      const exhaustive: never = status;
      throw new Error(`Unhandled member status: ${exhaustive}`);
    }
  }
}
