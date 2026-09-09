import { MaterialDesignIcons } from '@react-native-vector-icons/material-design-icons';
import { useTranslation } from 'react-i18next';
import { Pressable, Text, View } from 'react-native';
import { SvgXml } from 'react-native-svg';

import { RTL_CONTAINER_STYLE, RTL_TEXT_STYLE } from '@/localization/direction';
import { colors } from '@/theme/colors';
import { cairo } from '@/theme/typography';

import { DOCUMENTS_ICON_XML } from '../constants/iconXml';
import type { FencingLawArticle, FencingLawSection } from '../types';

type FencingLawSectionAccordionProps = {
  section: FencingLawSection;
  expanded: boolean;
  onToggle: () => void;
};

function ExplanationArticleCard({ article }: { article: Extract<FencingLawArticle, { kind: 'explanation' }> }) {
  const { t } = useTranslation();

  return (
    <View className="w-full overflow-hidden rounded-lg border border-slate-100 bg-white p-4">
      <View className="gap-2.5">
        <Text
          className="w-full text-sm tracking-[0.1px] text-accent"
          style={{ fontFamily: cairo.medium, ...RTL_TEXT_STYLE }}
        >
          {t(article.titleKey)}
        </Text>
        <Text
          className="w-full text-xs tracking-[0.1px] text-primary"
          style={{ fontFamily: cairo.regular, ...RTL_TEXT_STYLE }}
        >
          {t('more.fencingLaws.briefLabel')}
        </Text>
        <Text
          className="w-full text-xs leading-[1.2] tracking-[0.1px] text-slate-500"
          style={{ fontFamily: cairo.medium, ...RTL_TEXT_STYLE }}
        >
          {t(article.bodyKey)}
        </Text>
      </View>
    </View>
  );
}

function PenaltiesArticleCard({ article }: { article: Extract<FencingLawArticle, { kind: 'penalties' }> }) {
  const { t } = useTranslation();

  return (
    <View className="w-full overflow-hidden rounded-lg border border-slate-100 bg-white p-4">
      <View className="gap-2.5">
        {article.items.map((item) => (
          <View key={item.titleKey} className="w-full gap-2.5">
            <Text
              className="w-full text-sm tracking-[0.1px] text-accent"
              style={{ fontFamily: cairo.medium, ...RTL_TEXT_STYLE }}
            >
              {t(item.titleKey)}
            </Text>
            <Text
              className="w-full text-xs leading-[1.2] tracking-[0.1px] text-slate-500"
              style={{ fontFamily: cairo.medium, ...RTL_TEXT_STYLE }}
            >
              {t(item.bodyKey)}
            </Text>
          </View>
        ))}
      </View>
    </View>
  );
}

function BulletsArticleCard({ article }: { article: Extract<FencingLawArticle, { kind: 'bullets' }> }) {
  const { t } = useTranslation();

  return (
    <View className="w-full overflow-hidden rounded-lg border border-slate-100 bg-white p-4">
      <View className="gap-2.5">
        <Text
          className="w-full text-sm tracking-[0.1px] text-accent"
          style={{ fontFamily: cairo.medium, ...RTL_TEXT_STYLE }}
        >
          {t(article.titleKey)}
        </Text>
        <Text
          className="w-full text-xs tracking-[0.1px] text-primary"
          style={{ fontFamily: cairo.regular, ...RTL_TEXT_STYLE }}
        >
          {t('more.fencingLaws.briefLabel')}
        </Text>
        <View className="w-full gap-1">
          {article.bulletKeys.map((bulletKey) => (
            <View
              key={bulletKey}
              className="w-full flex-row items-start gap-2"
              style={RTL_CONTAINER_STYLE}
            >
              <Text
                className="text-xs leading-[1.4] text-slate-500"
                style={{ fontFamily: cairo.medium }}
              >
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
      </View>
    </View>
  );
}

function ArticleCard({ article }: { article: FencingLawArticle }) {
  switch (article.kind) {
    case 'explanation':
      return <ExplanationArticleCard article={article} />;
    case 'penalties':
      return <PenaltiesArticleCard article={article} />;
    case 'bullets':
      return <BulletsArticleCard article={article} />;
    default: {
      const exhaustive: never = article;
      return exhaustive;
    }
  }
}

export default function FencingLawSectionAccordion({
  section,
  expanded,
  onToggle,
}: FencingLawSectionAccordionProps) {
  const { t } = useTranslation();

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

      {expanded
        ? section.articles.map((article) => (
            <ArticleCard key={article.id} article={article} />
          ))
        : null}
    </View>
  );
}
