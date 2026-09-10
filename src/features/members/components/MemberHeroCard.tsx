import { Image } from "expo-image";
import { useTranslation } from "react-i18next";
import { Pressable, Text, View } from "react-native";
import { SvgXml } from "react-native-svg";

import { RTL_CONTAINER_STYLE, RTL_TEXT_STYLE } from "@/localization/direction";
import { cairo } from "@/theme/typography";

import { QR_ICON_XML } from "../constants/iconXml";
import { memberPhotoSource } from "../constants/photos";
import type { Member } from "../types";
import { getMemberName } from "../utils/labels";
import MemberStatusBadge from "./MemberStatusBadge";

type MemberHeroCardProps = {
  member: Member;
  onQrPress: () => void;
};

export default function MemberHeroCard({
  member,
  onQrPress,
}: MemberHeroCardProps) {
  const { t } = useTranslation();

  return (
    <View className="overflow-hidden rounded-[8px] border border-slate-100 bg-white px-4 py-3">
      <View
        className="absolute -top-[39px] size-[118px] rounded-full bg-primary"
        style={{ right: -20 }}
      />
      <View
        className="absolute -top-[18px] size-[90px] rounded-full bg-[#002411]/40"
        style={{ right: -8 }}
      />
      <View
        className="flex-row items-center justify-between"
        style={RTL_CONTAINER_STYLE}
      >
        <View
        className="flex-row items-center gap-2.5"
          style={RTL_CONTAINER_STYLE}
        >
          <View className="size-[68px] overflow-hidden rounded-full border-2 border-white bg-slate-100">
            <Image
              source={memberPhotoSource(member.category, member.photoIndex)}
              style={{ width: 68, height: 68 }}
              contentFit="cover"
            />
          </View>
          <View className="items-start gap-3 ms-3">
            <View
              className="flex-row items-center gap-2"
              style={RTL_CONTAINER_STYLE}
            >
              <Text
                className="text-lg text-accent"
                style={{ fontFamily: cairo.medium, ...RTL_TEXT_STYLE }}
              >
                {getMemberName(member, t)}
              </Text>
              {member.category === "administrator" ? null : (
                <MemberStatusBadge status={member.status} size="md" />
              )}
            </View>
            <Text
              className="text-sm text-primary"
              style={{ fontFamily: cairo.semiBold, ...RTL_TEXT_STYLE }}
            >
              {member.federationId}
            </Text>
          </View>
        </View>
        <Pressable
          accessibilityRole="button"
          accessibilityLabel={t("members.qr.title")}
          onPress={onQrPress}
          className="rounded-lg bg-primary p-2"
        >
          <SvgXml xml={QR_ICON_XML} width={18} height={18} />
        </Pressable>
      </View>
    </View>
  );
}
