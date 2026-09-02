import { Image } from 'expo-image';
import { Pressable, View } from 'react-native';
import { useTranslation } from 'react-i18next';

const backArrow = require('@/assets/images/auth/back-arrow.png');

type AuthBackButtonProps = {
  onPress: () => void;
};

export default function AuthBackButton({ onPress }: AuthBackButtonProps) {
  const { t } = useTranslation();

  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={t('common.back')}
      onPress={onPress}
      className="size-8 overflow-hidden">
      <View className="size-8 overflow-hidden">
        <Image source={backArrow} style={{ width: 32, height: 32 }} contentFit="contain" />
      </View>
    </Pressable>
  );
}
