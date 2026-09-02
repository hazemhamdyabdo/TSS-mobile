import { Image } from 'expo-image';
import { Pressable, Text, View } from 'react-native';
import { useTranslation } from 'react-i18next';

import { RTL_CONTAINER_STYLE, RTL_TEXT_STYLE } from '@/localization/direction';
import { cairo } from '@/theme/typography';

import { memberPhotoSource } from '../constants/photos';
import type { CoachMember } from '../types';
import { getMemberName } from '../utils/labels';
import MemberMetaChipRow from './MemberMetaChipRow';
import MemberStatusBadge from './MemberStatusBadge';

type CoachCardProps = {
  member: CoachMember;
  onPress: () => void;
};

export default function CoachCard({ member, onPress }: CoachCardProps) {
  const { t } = useTranslation();

  return (
    <Pressable
      accessibilityRole="button"
      onPress={onPress}
      className="w-full flex-row items-start gap-3 rounded-[8px] border border-slate-100 bg-white px-3 py-4"
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
      </View>
    </Pressable>
  );
}
