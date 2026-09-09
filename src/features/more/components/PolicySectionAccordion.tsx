import { MaterialDesignIcons } from '@react-native-vector-icons/material-design-icons';
import { useTranslation } from 'react-i18next';
import { Pressable, Text, View } from 'react-native';
import { SvgXml } from 'react-native-svg';

import { RTL_CONTAINER_STYLE, RTL_TEXT_STYLE } from '@/localization/direction';
import { colors } from '@/theme/colors';
import { cairo } from '@/theme/typography';

import { DOCUMENTS_ICON_XML } from '../constants/iconXml';
import type { PolicySection } from '../types';

type PolicySectionAccordionProps = {
  section: PolicySection;
  expanded: boolean;
  onToggle: () => void;
};

function BulletColumn({ keys }: { keys: string[] }) {
  const { t } = useTranslation();

  return (
    <View className="min-w-0 flex-1 gap-1">
      {keys.map((bulletKey) => (
        <View
          key={bulletKey}
          className="w-full flex-row items-start gap-2"
          style={RTL_CONTAINER_STYLE}
        >
          <Text className="text-xs leading-[1.4] text-slate-500" style={{ fontFamily: cairo.medium }}>
            •
          </Text>
          <Text
            className="min-w-0 flex-1 text-xs leading-[1.4] tracking-[0.1px] text-slate-500"
            style={{ fontFamily: cairo.medium, ...RTL_TEXT_STYLE }}
          >
            {t(bulletKey)}
          </Text>
        </View>
      ))}
    </View>
  );
}

export default function PolicySectionAccordion({
  section,
  expanded,
  onToggle,
}: PolicySectionAccordionProps) {
  const { t } = useTranslation();
  const startColumn = section.bulletKeys.slice(0, 2);
  const endColumn = section.bulletKeys.slice(2);

  return (
    <View className="w-full gap-1">
      <Pressable
        accessibilityRole="button"
        onPress={onToggle}
        className={`w-full flex-row items-center gap-3 overflow-hidden rounded-lg bg-white p-4 ${
          expanded ? 'border border-primary/20' : 'border border-slate-100'
        }`}
        style={RTL_CONTAINER_STYLE}
      >
        <View className="size-8 items-center justify-center overflow-hidden rounded-md bg-primary/10">
          <SvgXml xml={DOCUMENTS_ICON_XML} width={19} height={19} />
        </View>
        <Text
          className="min-w-0 flex-1 text-sm tracking-[0.1px] text-accent"
          style={{ fontFamily: cairo.medium, ...RTL_TEXT_STYLE }}
        >
          {t(section.titleKey)}
        </Text>
        <MaterialDesignIcons
          name={expanded ? 'chevron-up' : 'chevron-down'}
          size={18}
          color={expanded ? colors.primary : colors.slate400}
        />
      </Pressable>

      {expanded ? (
        <View className="w-full overflow-hidden rounded-lg border border-slate-100 bg-white p-4">
          <View className="gap-2.5">
            <Text
              className="w-full text-sm leading-[1.2] tracking-[0.1px] text-accent"
              style={{ fontFamily: cairo.medium, ...RTL_TEXT_STYLE }}
            >
              {t(section.summaryKey)}
            </Text>
            <Text
              className="w-full text-xs leading-[1.2] tracking-[0.1px] text-primary"
              style={{ fontFamily: cairo.regular, ...RTL_TEXT_STYLE }}
            >
              {t('more.policies.includesLabel')}
            </Text>
            <View className="w-full flex-row items-start gap-2.5" style={RTL_CONTAINER_STYLE}>
              <BulletColumn keys={startColumn} />
              <BulletColumn keys={endColumn} />
            </View>
          </View>
        </View>
      ) : null}
    </View>
  );
}
