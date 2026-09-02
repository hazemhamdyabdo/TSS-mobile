import { Text, View } from 'react-native';
import { SvgXml } from 'react-native-svg';
import { useTranslation } from 'react-i18next';

import { PUNISHMENTS_ICON_XML } from '@/features/more/constants/iconXml';
import { RTL_CONTAINER_STYLE, RTL_TEXT_STYLE } from '@/localization/direction';
import { cairo } from '@/theme/typography';

import { USERS_ICON_XML } from '../constants/iconXml';

type MemberStatCardsProps = {
  totalCount: number;
  suspendedCount: number;
};

export default function MemberStatCards({ totalCount, suspendedCount }: MemberStatCardsProps) {
  const { t } = useTranslation();

  return (
    <View className="flex-row gap-2" style={RTL_CONTAINER_STYLE}>
      <View
        className="h-[72px] flex-1 flex-row items-center gap-3 rounded-lg border border-slate-100 bg-white px-4"
        style={RTL_CONTAINER_STYLE}>
        <View className="size-9 items-center justify-center rounded-full bg-primary/10">
          <SvgXml xml={USERS_ICON_XML} width={16} height={16} />
        </View>
        <View className="min-w-0 flex-1 items-start gap-1">
          <Text className="text-[10px] text-slate-400" style={{ fontFamily: cairo.medium, ...RTL_TEXT_STYLE }}>
            {t('members.stats.all')}
          </Text>
          <Text className="text-sm text-primary" style={{ fontFamily: cairo.bold, ...RTL_TEXT_STYLE }}>
            {totalCount}
          </Text>
        </View>
      </View>
      <View
        className="h-[72px] flex-1 flex-row items-center gap-3 rounded-lg border border-slate-100 bg-white px-4"
        style={RTL_CONTAINER_STYLE}>
        <View className="size-9 items-center justify-center rounded-full bg-primary/10">
          <SvgXml xml={PUNISHMENTS_ICON_XML} width={16} height={16} />
        </View>
        <View className="min-w-0 flex-1 items-start gap-1">
          <Text className="text-[10px] text-slate-400" style={{ fontFamily: cairo.medium, ...RTL_TEXT_STYLE }}>
            {t('members.stats.suspended')}
          </Text>
          <Text className="text-sm text-primary" style={{ fontFamily: cairo.bold, ...RTL_TEXT_STYLE }}>
            {suspendedCount}
          </Text>
        </View>
      </View>
    </View>
  );
}
