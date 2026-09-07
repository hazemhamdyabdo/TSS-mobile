import { useTranslation } from 'react-i18next';
import { Text, View } from 'react-native';
import { SvgXml } from 'react-native-svg';

import {
  WARNING_ICON_XML,
  WARNING_RED_ICON_XML,
} from '@/features/members/constants/iconXml';
import { RTL_CONTAINER_STYLE, RTL_TEXT_STYLE } from '@/localization/direction';
import { cairo } from '@/theme/typography';

import type { GuestPunishment, GuestPunishmentKind } from '../types';

type GuestPunishmentCardProps = {
  punishment: GuestPunishment;
};

function toneFor(kind: GuestPunishmentKind) {
  switch (kind) {
    case 'warning':
      return {
        icon: WARNING_ICON_XML,
        iconBg: 'bg-pending-50',
        badgeBg: 'bg-[rgba(240,157,46,0.1)]',
        badgeText: 'text-[#f09d2e]',
      };
    case 'suspension':
      return {
        icon: WARNING_RED_ICON_XML,
        iconBg: 'bg-rejected-50',
        badgeBg: 'bg-rejected-50',
        badgeText: 'text-rejected',
      };
    default: {
      const exhaustive: never = kind;
      throw new Error(`Unhandled punishment kind: ${exhaustive}`);
    }
  }
}

export default function GuestPunishmentCard({
  punishment,
}: GuestPunishmentCardProps) {
  const { t } = useTranslation();
  const tone = toneFor(punishment.kind);

  return (
    <View className="rounded-lg bg-white p-4">
      <View
        className="flex-row items-center justify-between"
        style={RTL_CONTAINER_STYLE}
      >
        <View
          className="min-w-0 flex-1 flex-row items-center gap-2"
          style={RTL_CONTAINER_STYLE}
        >
          <View
            className={`size-8 items-center justify-center rounded-lg ${tone.iconBg}`}
          >
            <SvgXml xml={tone.icon} width={18} height={18} />
          </View>
          <View className="min-w-0 flex-1 items-start gap-3">
            <Text
              className="text-sm text-accent"
              numberOfLines={2}
              style={{ fontFamily: cairo.medium, ...RTL_TEXT_STYLE }}
            >
              {t(punishment.titleKey)}
            </Text>
            <Text
              className="text-xs text-slate-400"
              numberOfLines={2}
              style={{ fontFamily: cairo.regular, ...RTL_TEXT_STYLE }}
            >
              {t(punishment.reasonKey)}
            </Text>
          </View>
        </View>

        <View className="items-start gap-2 pl-2">
          <View
            className={`h-[18px] items-center justify-center rounded-full px-2 ${tone.badgeBg}`}
          >
            <Text
              className={`text-[11px] ${tone.badgeText}`}
              style={{ fontFamily: cairo.medium }}
            >
              {t(`punishments.kind.${punishment.kind}`)}
            </Text>
          </View>
          <Text
            className="text-[10px] text-accent"
            style={{ fontFamily: cairo.regular, ...RTL_TEXT_STYLE }}
          >
            {t(punishment.relativeKey, { count: punishment.relativeCount })}
          </Text>
        </View>
      </View>
    </View>
  );
}
