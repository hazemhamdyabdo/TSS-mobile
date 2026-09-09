import { useRouter, type Href } from 'expo-router';
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
  NEWS_HERO_SLIDES,
  NEWS_ITEMS,
  categoryTitleKey,
} from '../constants/dummy';
import { FILTER_WHITE_ICON_XML } from '../constants/iconXml';
import type { NewsCategory, NewsCategoryFilter, NewsItem } from '../types';
import NewsCard from './NewsCard';
import NewsHeroCarousel from './NewsHeroCarousel';

const FILTER_OPTIONS: SelectOption[] = NEWS_CATEGORY_FILTERS.map((value) => ({
  value,
  labelKey:
    value === 'all' ? 'news.filters.all' : `news.categories.${value}`,
}));

export default function NewsScreen() {
  const { t } = useTranslation();
  const router = useRouter();
  const filterSheetRef = useRef<OptionPickerBottomSheetRef>(null);
  const [query, setQuery] = useState('');
  const [categoryFilter, setCategoryFilter] =
    useState<NewsCategoryFilter>('all');

  const matchesQuery = (item: NewsItem) => {
    const normalized = query.trim().toLowerCase();
    if (!normalized) {
      return true;
    }
    return (
      t(item.titleKey).toLowerCase().includes(normalized) ||
      t(item.summaryKey).toLowerCase().includes(normalized)
    );
  };

  const filteredItems = useMemo(
    () =>
      NEWS_ITEMS.filter((item) => {
        if (categoryFilter !== 'all' && item.category !== categoryFilter) {
          return false;
        }
        return matchesQuery(item);
      }),
    [categoryFilter, query, t],
  );

  const openDetails = (id: string) => {
    router.push(`/news/${id}` as Href);
  };

  const openCategory = (category: NewsCategory) => {
    router.push(`/news/category/${category}` as Href);
  };

  const sectionCategories: NewsCategory[] = ['tournaments', 'nationalTeam'];

  return (
    <ScreenSafeAreaView
      className="flex-1 bg-background"
      edges={['top', 'bottom']}
      style={RTL_CONTAINER_STYLE}
    >
      <StatusBar style="auto" />
      <CreateScreenHeader title={t('news.title')} />
      <ScrollView
        className="flex-1"
        contentContainerClassName="gap-4 px-5 pb-8 pt-2"
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        <NewsHeroCarousel
          slides={NEWS_HERO_SLIDES}
          onPressSlide={(slide) => openDetails(slide.newsId)}
        />

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

        {sectionCategories.map((category) => {
          const preview = filteredItems.find((item) => item.category === category);
          if (!preview) {
            return null;
          }

          return (
            <View key={category} className="gap-4">
              <View
                className="flex-row items-center justify-between"
                style={RTL_CONTAINER_STYLE}
              >
                <Text
                  className="text-sm text-accent"
                  style={{ fontFamily: cairo.semiBold, ...RTL_TEXT_STYLE }}
                >
                  {t(categoryTitleKey(category))}
                </Text>
                <Pressable
                  accessibilityRole="button"
                  onPress={() => openCategory(category)}
                >
                  <Text
                    className="text-[10px] text-primary"
                    style={{ fontFamily: cairo.semiBold }}
                  >
                    {t('news.viewAll')}
                  </Text>
                </Pressable>
              </View>
              <NewsCard
                item={preview}
                onPress={() => openDetails(preview.id)}
              />
            </View>
          );
        })}
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
