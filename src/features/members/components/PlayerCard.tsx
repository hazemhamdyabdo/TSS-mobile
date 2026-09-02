import { Image } from 'expo-image';
import { Pressable, Text, View } from 'react-native';
import { useTranslation } from 'react-i18next';

import { RTL_CONTAINER_STYLE, RTL_TEXT_STYLE } from '@/localization/direction';
import { cairo } from '@/theme/typography';

import { memberPhotoSource } from '../constants/photos';
import type { PlayerMember } from '../types';
import { getMemberName } from '../utils/labels';
import MemberMetaChipRow from './MemberMetaChipRow';
import MemberStatusBadge from './MemberStatusBadge';

type PlayerCardProps = {
  member: PlayerMember;
  onPress: () => void;
};

export default function PlayerCard({ member, onPress }: PlayerCardProps) {
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
          {member.nationalTeam ? (
            <View className="h-[13px] items-center justify-center rounded-3xl bg-primary/10 px-1.5">
              <Text className="text-[8px] text-primary" style={{ fontFamily: cairo.medium }}>
                {t('members.badges.nationalTeam')}
              </Text>
            </View>
          ) : null}
        </View>
        <MemberMetaChipRow chips={member.chips} />
      </View>
    </Pressable>
  );
}
