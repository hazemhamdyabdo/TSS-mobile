import { MaterialDesignIcons } from '@react-native-vector-icons/material-design-icons';
import { StatusBar } from 'expo-status-bar';
import { useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { ScrollView, TextInput, View } from 'react-native';

import ScreenSafeAreaView from '@/components/ScreenSafeAreaView';
import CreateScreenHeader from '@/features/create/components/CreateScreenHeader';
import {
  RTL_CONTAINER_STYLE,
  TEXT_INPUT_START_ALIGN,
} from '@/localization/direction';
import { colors } from '@/theme/colors';
import { cairo } from '@/theme/typography';

import { DUMMY_POLICY_SECTIONS } from '../constants/policies';
import type { PolicySectionId } from '../types';
import PolicySectionAccordion from './PolicySectionAccordion';

export default function PoliciesScreen() {
  const { t } = useTranslation();
  const [query, setQuery] = useState('');
  const [expandedIds, setExpandedIds] = useState<PolicySectionId[]>(
    DUMMY_POLICY_SECTIONS.map((section) => section.id),
  );

  const sections = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();

    if (!normalizedQuery) {
      return DUMMY_POLICY_SECTIONS;
    }

    return DUMMY_POLICY_SECTIONS.filter((section) => {
      if (t(section.titleKey).toLowerCase().includes(normalizedQuery)) {
        return true;
      }
      if (t(section.summaryKey).toLowerCase().includes(normalizedQuery)) {
        return true;
      }
      return section.bulletKeys.some((key) =>
        t(key).toLowerCase().includes(normalizedQuery),
      );
    });
  }, [query, t]);

  const toggleSection = (id: PolicySectionId) => {
    setExpandedIds((current) =>
      current.includes(id) ? current.filter((item) => item !== id) : [...current, id],
    );
  };

  return (
    <ScreenSafeAreaView
      className="flex-1 bg-background"
      edges={['top', 'bottom']}
      style={RTL_CONTAINER_STYLE}
    >
      <StatusBar style="auto" />
      <CreateScreenHeader title={t('more.hub.items.policies.title')} />
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
            placeholder={t('more.policies.search')}
            placeholderTextColor={colors.slate300}
            textAlign={TEXT_INPUT_START_ALIGN}
            returnKeyType="search"
            className="min-w-0 flex-1 text-xs tracking-[0.1px] text-label"
            style={{ fontFamily: cairo.regular }}
          />
        </View>

        <View className="gap-2">
          {sections.map((section) => (
            <PolicySectionAccordion
              key={section.id}
              section={section}
              expanded={expandedIds.includes(section.id)}
              onToggle={() => toggleSection(section.id)}
            />
          ))}
        </View>
      </ScrollView>
    </ScreenSafeAreaView>
  );
}
