import { useTranslation } from 'react-i18next';
import { Text, View } from 'react-native';
import { SvgXml } from 'react-native-svg';

import { RTL_TEXT_STYLE } from '@/localization/direction';
import { cairo } from '@/theme/typography';

import { EMPTY_PUNISHMENTS_ILLUSTRATION_XML } from '../constants/emptyIllustrationXml';

const ILLUSTRATION_SIZE = 171;

export default function GuestPunishmentsEmptyState() {
  const { t } = useTranslation();

  return (
    <View className="flex-1 items-center justify-center px-5 py-10">
      <View
        className="items-center justify-center overflow-hidden"
        style={{ width: ILLUSTRATION_SIZE, height: ILLUSTRATION_SIZE }}
      >
        <SvgXml
          xml={EMPTY_PUNISHMENTS_ILLUSTRATION_XML}
          width={ILLUSTRATION_SIZE}
          height={ILLUSTRATION_SIZE}
        />
      </View>
      <View className="mt-6 items-center gap-3">
        <Text
          className="text-center text-base text-accent"
          style={{ fontFamily: cairo.medium, ...RTL_TEXT_STYLE }}
        >
          {t('punishments.empty.title')}
        </Text>
        <Text
          className="max-w-[234px] text-center text-xs text-slate-400"
          style={{ fontFamily: cairo.regular, ...RTL_TEXT_STYLE }}
        >
          {t('punishments.empty.subtitle')}
        </Text>
      </View>
    </View>
  );
}
