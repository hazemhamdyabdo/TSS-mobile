import { MaterialDesignIcons } from '@react-native-vector-icons/material-design-icons';
import { Image } from 'expo-image';
import { useRouter } from 'expo-router';
import { Pressable, Text, View } from 'react-native';
import { useTranslation } from 'react-i18next';

import { CREATE_ROUTES } from '@/features/create/constants/actions';
import { RTL_CONTAINER_STYLE, RTL_TEXT_STYLE } from '@/localization/direction';
import { cairo } from '@/theme/typography';

const emptyIllustration = require('@/assets/images/empty-competitions.png');

export default function CompetitionsEmptyState() {
  const { t } = useTranslation();
  const router = useRouter();

  return (
    <View className="flex-1 items-center justify-center px-5 py-10">
      <View className="size-[128px] items-center justify-center overflow-hidden">
        <Image source={emptyIllustration} style={{ width: 128, height: 128 }} contentFit="contain" />
      </View>
      <View className="mt-6 items-center gap-2">
        <Text className="text-sm text-accent" style={{ fontFamily: cairo.semiBold, ...RTL_TEXT_STYLE }}>
          {t('competitions.empty.title')}
        </Text>
        <Text className="text-xs text-slate-400" style={{ fontFamily: cairo.regular, ...RTL_TEXT_STYLE }}>
          {t('competitions.empty.subtitle')}
        </Text>
      </View>
      <Pressable
        accessibilityRole="button"
        onPress={() => router.push(CREATE_ROUTES.addCompetition)}
        className="mt-6 h-10 flex-row items-center justify-center gap-2 rounded-[10px] bg-primary px-4"
        style={RTL_CONTAINER_STYLE}>
        <MaterialDesignIcons name="plus" size={16} color="#ffffff" />
        <Text className="text-xs text-white" style={{ fontFamily: cairo.semiBold }}>
          {t('competitions.add')}
        </Text>
      </Pressable>
    </View>
  );
}
