import { Image } from 'expo-image';
import { Pressable, Text, View } from 'react-native';
import { SvgXml } from 'react-native-svg';
import { useTranslation } from 'react-i18next';

import { RTL_CONTAINER_STYLE, RTL_TEXT_STYLE } from '@/localization/direction';
import { cairo } from '@/theme/typography';

import { MAIL_ICON_XML, PHONE_ICON_XML } from '../constants/iconXml';
import { memberPhotoSource } from '../constants/photos';
import type { AdministratorMember } from '../types';
import { getMemberName } from '../utils/labels';
import MemberMetaChipRow from './MemberMetaChipRow';
import MemberStatusBadge from './MemberStatusBadge';

type AdministratorCardProps = {
  member: AdministratorMember;
  onPress: () => void;
};

export default function AdministratorCard({ member, onPress }: AdministratorCardProps) {
  const { t } = useTranslation();

  return (
    <Pressable
      accessibilityRole="button"
      onPress={onPress}
      className="w-full flex-row items-start gap-3 overflow-hidden rounded-[8px] border border-slate-100 bg-white px-3 py-4"
      style={RTL_CONTAINER_STYLE}>
      <View className="size-10 overflow-hidden rounded-full bg-slate-100">
        <Image
          source={memberPhotoSource(member.category, member.photoIndex)}
          style={{ width: 40, height: 40 }}
          contentFit="cover"
        />
      </View>
      <View className="min-w-0 flex-1 gap-2">
        <View className="flex-row flex-wrap items-center gap-1.5" style={RTL_CONTAINER_STYLE}>
          <Text className="text-xs text-accent" style={{ fontFamily: cairo.medium, ...RTL_TEXT_STYLE }}>
            {getMemberName(member, t)}
          </Text>
          <MemberStatusBadge status={member.status} />
        </View>
        <MemberMetaChipRow chips={member.chips} />
        <View className="h-px w-full bg-slate-100" />
        <View className="flex-row flex-wrap items-center gap-3" style={RTL_CONTAINER_STYLE}>
          <View className="flex-row items-center gap-1" style={RTL_CONTAINER_STYLE}>
            <SvgXml xml={PHONE_ICON_XML} width={10} height={10} />
            <Text className="text-[10px] text-slate-400" style={{ fontFamily: cairo.medium }}>
              {member.phone}
            </Text>
          </View>
          <View className="flex-row items-center gap-1" style={RTL_CONTAINER_STYLE}>
            <SvgXml xml={MAIL_ICON_XML} width={10} height={10} />
            <Text className="text-[10px] text-slate-400" style={{ fontFamily: cairo.medium }}>
              {member.email}
            </Text>
          </View>
        </View>
      </View>
    </Pressable>
  );
}
