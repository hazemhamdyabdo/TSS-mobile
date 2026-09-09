import { MaterialDesignIcons } from '@react-native-vector-icons/material-design-icons';
import { useRouter, type Href } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Pressable, ScrollView, Text, TextInput, View } from 'react-native';

import ScreenSafeAreaView from '@/components/ScreenSafeAreaView';
import CreateScreenHeader from '@/features/create/components/CreateScreenHeader';
import {
  RTL_CONTAINER_STYLE,
  RTL_TEXT_STYLE,
  TEXT_INPUT_START_ALIGN,
} from '@/localization/direction';
import { colors } from '@/theme/colors';
import { cairo } from '@/theme/typography';

import { DUMMY_REGULATIONS, REGULATION_FILTERS } from '../constants/regulations';
import type { RegulationFilter } from '../types';
import RegulationDocumentCard from './RegulationDocumentCard';

export default function RegulationsScreen() {
  const { t } = useTranslation();
  const router = useRouter();
  const [query, setQuery] = useState('');
  const [filter, setFilter] = useState<RegulationFilter>('all');

  const documents = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();

    return DUMMY_REGULATIONS.filter((document) => {
      if (filter !== 'all' && document.category !== filter) {
        return false;
      }

      if (!normalizedQuery) {
        return true;
      }

      const title = t(document.titleKey).toLowerCase();
      const description = t(document.descriptionKey).toLowerCase();
      return title.includes(normalizedQuery) || description.includes(normalizedQuery);
    });
  }, [filter, query, t]);

  return (
    <ScreenSafeAreaView
      className="flex-1 bg-background"
      edges={['top', 'bottom']}
      style={RTL_CONTAINER_STYLE}
    >
      <StatusBar style="auto" />
      <CreateScreenHeader title={t('more.hub.items.regulations.title')} />
      <ScrollView
        className="flex-1"
        contentContainerClassName="gap-4 px-5 pb-8 pt-4"
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        <View
          className="h-[42px] w-full flex-row items-center gap-2 rounded-lg border border-slate-100 bg-white px-4"
          style={RTL_CONTAINER_STYLE}
        >
          <MaterialDesignIcons name="magnify" size={20} color={colors.primary} />
          <TextInput
            value={query}
            onChangeText={setQuery}
            placeholder={t('more.regulations.search')}
            placeholderTextColor={colors.slate300}
            textAlign={TEXT_INPUT_START_ALIGN}
            returnKeyType="search"
            className="min-w-0 flex-1 text-xs tracking-[0.1px] text-label"
            style={{ fontFamily: cairo.regular }}
          />
        </View>

        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerClassName="flex-row items-center gap-2"
          style={RTL_CONTAINER_STYLE}
        >
          {REGULATION_FILTERS.map((chip) => {
            const selected = chip === filter;

            return (
              <Pressable
                key={chip}
                accessibilityRole="button"
                onPress={() => setFilter(chip)}
                className={`shrink-0 items-center justify-center rounded-[22px] px-3 py-3 ${
                  selected
                    ? 'bg-primary/10'
                    : 'border-[0.7px] border-slate-100 bg-transparent'
                }`}
              >
                <Text
                  className="text-sm tracking-[0.1px]"
                  style={{
                    color: selected ? colors.primary : colors.slate400,
                    fontFamily: selected ? cairo.semiBold : cairo.regular,
                    ...RTL_TEXT_STYLE,
                  }}
                >
                  {t(`more.regulations.filters.${chip}`)}
                </Text>
              </Pressable>
            );
          })}
        </ScrollView>

        <View className="gap-2">
          {documents.map((document) => (
            <RegulationDocumentCard
              key={document.id}
              document={document}
              onPress={() => router.push(`/regulations/${document.id}` as Href)}
            />
          ))}
        </View>
      </ScrollView>
    </ScreenSafeAreaView>
  );
}
