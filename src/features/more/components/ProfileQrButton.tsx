import { useTranslation } from 'react-i18next';
import { Pressable, Text } from 'react-native';
import { SvgXml } from 'react-native-svg';

import { QR_ICON_XML } from '@/features/members/constants/iconXml';
import { RTL_CONTAINER_STYLE, RTL_TEXT_STYLE } from '@/localization/direction';
import { cairo } from '@/theme/typography';

type ProfileQrButtonProps = {
  onPress: () => void;
};

export default function ProfileQrButton({ onPress }: ProfileQrButtonProps) {
  const { t } = useTranslation();

  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={t('more.profile.qrCode')}
      onPress={onPress}
      className="h-12 w-full flex-row items-center justify-center gap-2 overflow-hidden rounded-[10px] bg-primary px-3"
      style={RTL_CONTAINER_STYLE}
    >
      <SvgXml xml={QR_ICON_XML} width={18} height={18} />
      <Text
        className="text-base capitalize text-white"
        style={{ fontFamily: cairo.medium, ...RTL_TEXT_STYLE }}
      >
        {t('more.profile.qrCode')}
      </Text>
    </Pressable>
  );
}
