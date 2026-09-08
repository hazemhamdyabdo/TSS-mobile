import { useRouter, type Href } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Pressable, ScrollView, Text, TextInput, View } from 'react-native';

import ScreenSafeAreaView from '@/components/ScreenSafeAreaView';
import CreateScreenHeader from '@/features/create/components/CreateScreenHeader';
import { useMockListFetch } from '@/hooks/useMockListFetch';
import { RTL_CONTAINER_STYLE, RTL_TEXT_STYLE, TEXT_INPUT_START_ALIGN } from '@/localization/direction';
import { colors } from '@/theme/colors';
import { cairo } from '@/theme/typography';

import { getFederation } from '../api';

export type FederationListRow = {
  id: string;
  title: string;
  subtitle: string;
  meta?: string;
  badge?: string;
};

type FederationListScreenProps = {
  titleKey: string;
  searchKey: string;
  emptyKey: string;
  addHref?: Href;
  addLabelKey?: string;
  rows: FederationListRow[];
  embeddedInTabs?: boolean;
};

export default function FederationListScreen({
  titleKey,
  searchKey,
  emptyKey,
  addHref,
  addLabelKey,
  rows,
  embeddedInTabs = false,
}: FederationListScreenProps) {
  const { t } = useTranslation();
  const router = useRouter();
  const isLoading = useMockListFetch(getFederation);
  const [query, setQuery] = useState('');

  const filteredRows = useMemo(() => {
    const normalized = query.trim().toLowerCase();
    if (!normalized) {
      return rows;
    }

    return rows.filter((row) =>
      `${row.title} ${row.subtitle} ${row.meta ?? ''}`.toLowerCase().includes(normalized),
    );
  }, [query, rows]);

  return (
    <ScreenSafeAreaView
      className="flex-1 bg-background"
      edges={embeddedInTabs ? ['top'] : ['top', 'bottom']}
      style={RTL_CONTAINER_STYLE}>
      <StatusBar style="auto" />
      <CreateScreenHeader title={t(titleKey)} showBack={!embeddedInTabs} />
      <ScrollView
        className="flex-1"
        contentContainerClassName={`gap-3 px-5 pt-2 ${embeddedInTabs ? 'pb-28' : 'pb-8'}`}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}>
        {isLoading ? (
          <Text
            className="py-8 text-center text-xs text-slate-400"
            style={{ fontFamily: cairo.medium }}>
            {t('federation.loading')}
          </Text>
        ) : (
          <>
            <View className="flex-row items-center gap-2" style={RTL_CONTAINER_STYLE}>
              <TextInput
                value={query}
                onChangeText={setQuery}
                placeholder={t(searchKey)}
                placeholderTextColor={colors.secText}
                textAlign={TEXT_INPUT_START_ALIGN}
                className="h-[42px] min-w-0 flex-1 rounded-[10px] border border-slate-100 bg-white px-3 text-xs text-label"
                style={{ fontFamily: cairo.regular }}
              />
              {addHref && addLabelKey ? (
                <Pressable
                  accessibilityRole="button"
                  onPress={() => router.push(addHref)}
                  className="h-[42px] items-center justify-center rounded-[10px] bg-primary px-3">
                  <Text className="text-xs text-white" style={{ fontFamily: cairo.semiBold }}>
                    {t(addLabelKey)}
                  </Text>
                </Pressable>
              ) : null}
            </View>

            {filteredRows.length === 0 ? (
              <Text
                className="py-8 text-center text-xs text-slate-400"
                style={{ fontFamily: cairo.medium }}>
                {t(emptyKey)}
              </Text>
            ) : (
              <View className="gap-2">
                {filteredRows.map((row) => (
                  <View
                    key={row.id}
                    className="rounded-lg border border-slate-100 bg-white p-4"
                    style={RTL_CONTAINER_STYLE}>
                    <View className="flex-row items-start justify-between gap-2" style={RTL_CONTAINER_STYLE}>
                      <View className="min-w-0 flex-1 items-start gap-1">
                        <Text
                          className="w-full text-sm text-accent"
                          style={{ fontFamily: cairo.medium, ...RTL_TEXT_STYLE }}>
                          {row.title}
                        </Text>
                        <Text
                          className="w-full text-xs text-slate-400"
                          style={{ fontFamily: cairo.regular, ...RTL_TEXT_STYLE }}>
                          {row.subtitle}
                        </Text>
                        {row.meta ? (
                          <Text
                            className="w-full text-[10px] text-slate-400"
                            style={{ fontFamily: cairo.regular, ...RTL_TEXT_STYLE }}>
                            {row.meta}
                          </Text>
                        ) : null}
                      </View>
                      {row.badge ? (
                        <View className="rounded-3xl bg-primary/10 px-2 py-1">
                          <Text className="text-[10px] text-primary" style={{ fontFamily: cairo.medium }}>
                            {row.badge}
                          </Text>
                        </View>
                      ) : null}
                    </View>
                  </View>
                ))}
              </View>
            )}
          </>
        )}
      </ScrollView>
    </ScreenSafeAreaView>
  );
}
