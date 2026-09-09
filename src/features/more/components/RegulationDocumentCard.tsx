import { useTranslation } from 'react-i18next';
import { Pressable, Text, View } from 'react-native';
import { SvgXml } from 'react-native-svg';

import { RTL_CONTAINER_STYLE, RTL_TEXT_STYLE } from '@/localization/direction';
import { cairo } from '@/theme/typography';

import { DOCUMENTS_ICON_XML } from '../constants/iconXml';
import type { RegulationDocument } from '../types';

type RegulationDocumentCardProps = {
  document: RegulationDocument;
  onPress?: () => void;
};

export default function RegulationDocumentCard({
  document,
  onPress,
}: RegulationDocumentCardProps) {
  const { t } = useTranslation();

  return (
    <Pressable
      accessibilityRole="button"
      onPress={onPress}
      className="w-full flex-row items-start gap-3 overflow-hidden rounded-lg border border-slate-100 bg-white p-4"
      style={RTL_CONTAINER_STYLE}
    >
      <View className="size-10 items-center justify-center overflow-hidden rounded-lg bg-primary/10">
        <SvgXml xml={DOCUMENTS_ICON_XML} width={24} height={24} />
      </View>
      <View className="min-w-0 flex-1 items-start justify-center gap-2.5">
        <Text
          className="w-full text-sm capitalize tracking-[0.1px] text-accent"
          style={{ fontFamily: cairo.medium, ...RTL_TEXT_STYLE }}
        >
          {t(document.titleKey)}
        </Text>
        <Text
          className="w-full text-xs capitalize leading-[1.2] tracking-[0.1px] text-slate-400"
          style={{ fontFamily: cairo.regular, ...RTL_TEXT_STYLE }}
        >
          {t(document.descriptionKey)}
        </Text>
        <View className="flex-row items-center gap-1" style={RTL_CONTAINER_STYLE}>
          <Text
            className="text-xs capitalize tracking-[0.1px] text-primary"
            style={{ fontFamily: cairo.regular, ...RTL_TEXT_STYLE }}
          >
            {t('more.regulations.fileType')}
          </Text>
          <View className="size-0.5 rounded-[11px] bg-primary" />
          <Text
            className="text-xs capitalize tracking-[0.1px] text-primary"
            style={{ fontFamily: cairo.regular, ...RTL_TEXT_STYLE }}
          >
            {t('more.regulations.fileSize', { size: document.fileSizeMb })}
          </Text>
        </View>
      </View>
    </Pressable>
  );
}
