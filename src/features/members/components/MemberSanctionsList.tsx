import { Text, View } from 'react-native';
import { SvgXml } from 'react-native-svg';
import { useTranslation } from 'react-i18next';

import { RTL_CONTAINER_STYLE, RTL_TEXT_STYLE } from '@/localization/direction';
import { cairo } from '@/theme/typography';

import { WARNING_ICON_XML, WARNING_RED_ICON_XML } from '../constants/iconXml';
import type { MemberSanction } from '../types';

type MemberSanctionsListProps = {
  sanctions: MemberSanction[];
};

export default function MemberSanctionsList({ sanctions }: MemberSanctionsListProps) {
  const { t } = useTranslation();

  return (
    <View className="gap-4">
      <Text className="text-sm text-accent" style={{ fontFamily: cairo.semiBold, ...RTL_TEXT_STYLE }}>
        {t('members.sanctions.title')}
      </Text>
      <View className="rounded-[8px] border border-slate-100 bg-white p-2">
        {sanctions.length === 0 ? (
          <View className="items-center rounded-xl bg-background p-4">
            <Text className="text-center text-xs text-slate-400" style={{ fontFamily: cairo.medium }}>
              {t('members.sanctions.empty')}
            </Text>
          </View>
        ) : (
          <View className="gap-1">
            {sanctions.map((sanction) => (
              <SanctionCard key={sanction.id} sanction={sanction} />
            ))}
          </View>
        )}
      </View>
    </View>
  );
}

function SanctionCard({ sanction }: { sanction: MemberSanction }) {
  const { t } = useTranslation();
  const tone = sanctionTone(sanction.kind);

  return (
    <View className="rounded-xl bg-background p-4">
      <View className="flex-row items-center justify-between" style={RTL_CONTAINER_STYLE}>
        <View className="flex-row items-center gap-2" style={RTL_CONTAINER_STYLE}>
          <View className={`size-7 items-center justify-center rounded-lg ${tone.iconBg}`}>
            <SvgXml xml={tone.icon} width={16} height={16} />
          </View>
          <View className="max-w-[180px] items-start gap-2">
            <Text className="text-xs text-accent" style={{ fontFamily: cairo.medium, ...RTL_TEXT_STYLE }}>
              {t(sanction.titleKey)}
            </Text>
            <Text
              className="text-[10px] leading-[12px] text-slate-400"
              style={{ fontFamily: cairo.regular, ...RTL_TEXT_STYLE }}>
              {t(sanction.reasonKey)}
            </Text>
          </View>
        </View>
        <View className="items-start gap-2">
          <View className={`h-[13px] items-center justify-center rounded-3xl px-1.5 ${tone.badgeBg}`}>
            <Text className={`text-[8px] ${tone.badgeText}`} style={{ fontFamily: cairo.medium }}>
              {t(`members.sanctions.kind.${sanction.kind}`)}
            </Text>
          </View>
          <Text className="text-[10px] text-accent" style={{ fontFamily: cairo.regular, ...RTL_TEXT_STYLE }}>
            {t(sanction.relativeKey, { count: sanction.relativeCount })}
          </Text>
        </View>
      </View>
    </View>
  );
}

function sanctionTone(kind: MemberSanction['kind']) {
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
      throw new Error(`Unhandled sanction kind: ${exhaustive}`);
    }
  }
}
