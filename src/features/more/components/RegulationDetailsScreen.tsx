import { useLocalSearchParams } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { Alert, ScrollView, Share, Text, View } from 'react-native';

import ScreenSafeAreaView from '@/components/ScreenSafeAreaView';
import OutlineButton from '@/components/ui/OutlineButton';
import PrimaryButton from '@/components/ui/PrimaryButton';
import CreateScreenHeader from '@/features/create/components/CreateScreenHeader';
import { RTL_CONTAINER_STYLE, RTL_TEXT_STYLE } from '@/localization/direction';
import { colors } from '@/theme/colors';
import { cairo } from '@/theme/typography';

import { getRegulationById } from '../constants/regulations';

export default function RegulationDetailsScreen() {
  const { t } = useTranslation();
  const rawId = useLocalSearchParams<{ id: string | string[] }>().id;
  const id = Array.isArray(rawId) ? rawId[0] : rawId;

  const document = useMemo(() => (id ? getRegulationById(id) : undefined), [id]);

  if (!document) {
    return (
      <ScreenSafeAreaView
        className="flex-1 bg-background"
        edges={['top', 'bottom']}
        style={RTL_CONTAINER_STYLE}
      >
        <StatusBar style="auto" />
        <CreateScreenHeader title={t('more.regulations.details.title')} />
        <View className="flex-1 items-center justify-center px-5">
          <Text
            className="text-sm text-slate-400"
            style={{ fontFamily: cairo.medium, ...RTL_TEXT_STYLE }}
          >
            {t('more.regulations.details.notFound')}
          </Text>
        </View>
      </ScreenSafeAreaView>
    );
  }

  const title = t(document.titleKey);

  const onShare = async () => {
    try {
      await Share.share({ message: title });
    } catch {
      // User dismissed the share sheet.
    }
  };

  const onDownload = () => {
    Alert.alert(
      t('more.regulations.details.downloadTitle'),
      t('more.regulations.details.downloadBody'),
    );
  };

  return (
    <ScreenSafeAreaView
      className="flex-1 bg-background"
      edges={['top', 'bottom']}
      style={RTL_CONTAINER_STYLE}
    >
      <StatusBar style="auto" />
      <CreateScreenHeader title={t('more.regulations.details.title')} />
      <ScrollView
        className="flex-1"
        contentContainerClassName="gap-3 px-5 pb-4 pt-4"
        showsVerticalScrollIndicator={false}
      >
        <View
          className="w-full flex-row flex-wrap items-start justify-between gap-4 rounded-lg bg-white p-4"
          style={RTL_CONTAINER_STYLE}
        >
          <Text
            className="text-sm capitalize leading-[1.6] text-label"
            style={{ fontFamily: cairo.semiBold, ...RTL_TEXT_STYLE }}
          >
            {t('more.regulations.details.issueDate', { period: document.issuePeriod })}
          </Text>
          <Text
            className="text-sm capitalize leading-[1.6] text-label"
            style={{ fontFamily: cairo.semiBold, ...RTL_TEXT_STYLE }}
          >
            {t('more.regulations.details.publishDate', { date: document.publishedAt })}
          </Text>
        </View>

        <View className="w-full gap-2 overflow-hidden rounded-lg border border-slate-100 bg-white p-3">
          {document.sectionKeys.map((sectionKey, index) => (
            <View
              key={sectionKey}
              className="h-11 w-full flex-row items-center gap-2 rounded-lg bg-background px-3"
              style={RTL_CONTAINER_STYLE}
            >
              <View className="size-6 items-center justify-center overflow-hidden rounded-xl bg-primary/10">
                <Text
                  className="text-xs"
                  style={{
                    color: colors.primary,
                    fontFamily: cairo.medium,
                    ...RTL_TEXT_STYLE,
                  }}
                >
                  {index + 1}
                </Text>
              </View>
              <Text
                className="min-w-0 flex-1 text-sm text-label"
                style={{ fontFamily: cairo.medium, ...RTL_TEXT_STYLE }}
              >
                {t(`more.regulations.details.sections.${sectionKey}`)}
              </Text>
            </View>
          ))}
        </View>
      </ScrollView>

      <View className="flex-row gap-1.5 px-5 pb-2 pt-1" style={RTL_CONTAINER_STYLE}>
        <View className="min-w-0 flex-1">
          <PrimaryButton title={t('more.regulations.details.download')} onPress={onDownload} />
        </View>
        <View className="min-w-0 flex-1">
          <OutlineButton title={t('more.regulations.details.share')} onPress={onShare} />
        </View>
      </View>
    </ScreenSafeAreaView>
  );
}
