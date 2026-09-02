import { Image } from 'expo-image';
import { useRouter } from 'expo-router';
import { Pressable, View } from 'react-native';
import { useTranslation } from 'react-i18next';

const backIcon = require('@/assets/images/create/back.png');

type CreateBackButtonProps = {
  onPress?: () => void;
};

export default function CreateBackButton({ onPress }: CreateBackButtonProps) {
  const { t } = useTranslation();
  const router = useRouter();

  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={t('common.back')}
      onPress={onPress ?? (() => router.back())}
      className="size-8 overflow-hidden">
      <View className="size-8 overflow-hidden">
        <Image source={backIcon} style={{ width: 32, height: 32 }} contentFit="contain" />
      </View>
    </Pressable>
  );
}
