import { Image } from "expo-image";
import { useTranslation } from "react-i18next";
import { Text, View } from "react-native";

import { useAuthState } from "@/features/auth/hooks/useAuthState";
import { RTL_CONTAINER_STYLE, RTL_TEXT_STYLE } from "@/localization/direction";
import { cairo } from "@/theme/typography";

import type { UserProfile } from "../types";
import { formatSaPhoneDisplay } from "../utils/phone";
import { resolveProfileAvatarSource } from "../utils/profileAvatar";

type SettingsProfileCardProps = {
  profile: UserProfile;
};

export default function SettingsProfileCard({
  profile,
}: SettingsProfileCardProps) {
  const { t } = useTranslation();
  const { session } = useAuthState();
  const isGuest = Boolean(session?.isGuest);
  const avatarSource = resolveProfileAvatarSource(profile, isGuest);

  return (
    <View className="mt-6 w-full">
      <View className="items-center rounded-xl bg-white p-3 pt-10">
        <View className="absolute -top-[30px] size-[68px] overflow-hidden rounded-full border-2 border-white">
          <Image
            source={avatarSource}
            style={{ width: 68, height: 68 }}
            contentFit="cover"
          />
        </View>
        <View className="w-full items-center gap-2">
          <Text
            className="text-lg text-accent"
            style={{ fontFamily: cairo.medium, ...RTL_TEXT_STYLE }}
          >
            {profile.name}
          </Text>
          <View className="rounded-3xl bg-primary/7 px-4 py-1">
            <Text
              className="text-xs capitalize leading-[1.6] text-primary"
              style={{ fontFamily: cairo.medium, ...RTL_TEXT_STYLE }}
            >
              {t(profile.roleKey)}
            </Text>
          </View>
        </View>
        <View
          className="mt-2 w-full flex-row gap-2"
          style={RTL_CONTAINER_STYLE}
        >
          <View className="min-w-0 flex-1 items-start gap-1 rounded-lg bg-background p-2">
            <Text
              className="w-full text-xs text-slate-500"
              style={{ fontFamily: cairo.regular, ...RTL_TEXT_STYLE }}
            >
              {t("more.settings.email")}
            </Text>
            <Text
              className="w-full text-xs text-accent"
              style={{ fontFamily: cairo.medium, ...RTL_TEXT_STYLE }}
              numberOfLines={1}
            >
              {profile.email}
            </Text>
          </View>
          <View className="min-w-0 flex-1 items-start gap-1 rounded-lg bg-background p-2">
            <Text
              className="w-full text-xs text-slate-500"
              style={{ fontFamily: cairo.regular, ...RTL_TEXT_STYLE }}
            >
              {t("more.settings.phone")}
            </Text>
            <Text
              className="w-full text-xs text-accent"
              style={{ fontFamily: cairo.medium, ...RTL_TEXT_STYLE }}
            >
              {formatSaPhoneDisplay(profile.phone)}
            </Text>
          </View>
        </View>
      </View>
    </View>
  );
}
