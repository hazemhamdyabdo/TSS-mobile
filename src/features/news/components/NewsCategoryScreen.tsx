import { useLocalSearchParams, useRouter, type Href } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useMemo, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Pressable, ScrollView, Text, View } from 'react-native';
import { SvgXml } from 'react-native-svg';

import OptionPickerBottomSheet, {
  type OptionPickerBottomSheetRef,
} from '@/components/form/OptionPickerBottomSheet';
import type { SelectOption } from '@/components/form/types';
import ScreenSafeAreaView from '@/components/ScreenSafeAreaView';
import CreateScreenHeader from '@/features/create/components/CreateScreenHeader';
import MemberSearchField from '@/features/members/components/MemberSearchField';
import { RTL_CONTAINER_STYLE, RTL_TEXT_STYLE } from '@/localization/direction';
import { cairo } from '@/theme/typography';

import {
  NEWS_CATEGORY_FILTERS,
  categoryTitleKey,
  getNewsByCategory,
} from '../constants/dummy';
import { FILTER_WHITE_ICON_XML } from '../constants/iconXml';
import type { NewsCategory, NewsCategoryFilter } from '../types';
import NewsCard from './NewsCard';

const FILTER_OPTIONS: SelectOption[] = NEWS_CATEGORY_FILTERS.map((value) => ({
  value,
  labelKey:
    value === 'all' ? 'news.filters.all' : `news.categories.${value}`,
}));

function parseCategory(value: string | undefined): NewsCategory | null {
  if (value === 'tournaments' || value === 'nationalTeam') {
    return value;
  }
  return null;
}

export default function NewsCategoryScreen() {
  const { t } = useTranslation();
  const router = useRouter();
  const raw = useLocalSearchParams<{ category: string | string[] }>().category;
  const categoryParam = Array.isArray(raw) ? raw[0] : raw;
  const category = parseCategory(categoryParam);
  const filterSheetRef = useRef<OptionPickerBottomSheetRef>(null);
  const [query, setQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState<NewsCategoryFilter>(
    category ?? 'all',
  );

  const items = useMemo(() => {
    if (!category) {
      return [];
    }

    const source =
      categoryFilter === 'all'
        ? getNewsByCategory(category)
        : getNewsByCategory(category).filter(
            (item) => item.category === categoryFilter,
          );

    const normalized = query.trim().toLowerCase();
    if (!normalized) {
      return source;
    }

    return source.filter(
      (item) =>
        t(item.titleKey).toLowerCase().includes(normalized) ||
        t(item.summaryKey).toLowerCase().includes(normalized),
    );
  }, [category, categoryFilter, query, t]);

  if (!category) {
    return (
      <ScreenSafeAreaView
        className="flex-1 bg-background"
        edges={['top', 'bottom']}
        style={RTL_CONTAINER_STYLE}
      >
        <StatusBar style="auto" />
        <CreateScreenHeader title={t('news.title')} />
        <View className="flex-1 items-center justify-center px-5">
          <Text
            className="text-sm text-slate-400"
            style={{ fontFamily: cairo.medium, ...RTL_TEXT_STYLE }}
          >
            {t('news.notFound')}
          </Text>
        </View>
      </ScreenSafeAreaView>
    );
  }

  return (
    <ScreenSafeAreaView
      className="flex-1 bg-background"
      edges={['top', 'bottom']}
      style={RTL_CONTAINER_STYLE}
    >
      <StatusBar style="auto" />
      <CreateScreenHeader title={t(categoryTitleKey(category))} />
      <ScrollView
        className="flex-1"
        contentContainerClassName="gap-3 px-5 pb-8 pt-2"
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        <View className="flex-row items-center gap-2" style={RTL_CONTAINER_STYLE}>
          <MemberSearchField
            value={query}
            placeholder={t('news.search')}
            onChangeText={setQuery}
          />
          <Pressable
            accessibilityRole="button"
            onPress={() => filterSheetRef.current?.open()}
            className="h-10 flex-row items-center gap-1 rounded-lg bg-primary px-3"
            style={RTL_CONTAINER_STYLE}
          >
            <Text
              className="text-sm text-background"
              style={{ fontFamily: cairo.regular }}
            >
              {t('news.filter')}
            </Text>
            <SvgXml xml={FILTER_WHITE_ICON_XML} width={16} height={16} />
          </Pressable>
        </View>

        {items.length === 0 ? (
          <Text
            className="py-8 text-center text-xs text-slate-400"
            style={{ fontFamily: cairo.medium }}
          >
            {t('news.empty')}
          </Text>
        ) : (
          items.map((item) => (
            <NewsCard
              key={item.id}
              item={item}
              onPress={() => router.push(`/news/${item.id}` as Href)}
            />
          ))
        )}
      </ScrollView>
      <OptionPickerBottomSheet
        ref={filterSheetRef}
        options={FILTER_OPTIONS}
        selectedValue={categoryFilter}
        onSelect={(value) => setCategoryFilter(value as NewsCategoryFilter)}
      />
    </ScreenSafeAreaView>
  );
}
