import { Image } from "expo-image";
import { useRouter, type Href } from "expo-router";
import type { BottomTabBarProps } from "expo-router/js-tabs";
import type { ReactNode } from "react";
import { useTranslation } from "react-i18next";
import { Pressable, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { SvgXml } from "react-native-svg";

import TabIcon, { type TabName } from "@/components/TabIcon";
import { MORE_TAB_ICON_XML } from "@/components/tabIconXml";
import { useAuthState } from "@/features/auth/hooks/useAuthState";
import { getAuthRole } from "@/features/auth/utils/sessionRole";
import {
  GUEST_COMPETITIONS_ICON_XML,
  GUEST_HOME_ICON_XML,
  GUEST_LIVE_ICON_XML,
  GUEST_PENALTIES_ICON_XML,
  GUEST_RANKINGS_ICON_XML,
} from "@/features/home/constants/guestIcons";
import { colors } from "@/theme/colors";
import { cairo } from "@/theme/typography";

const addIcon = require("@/assets/images/home/icons/tab-add.png");

function isTabName(name: string): name is TabName {
  return (
    name === "index" ||
    name === "competitions" ||
    name === "members" ||
    name === "more"
  );
}

function navigateInTabs(
  navigation: BottomTabBarProps["navigation"],
  state: BottomTabBarProps["state"],
  name: string,
  focusedName: string | undefined,
) {
  const route = state.routes.find((item) => item.name === name);
  if (!route) {
    return;
  }

  const event = navigation.emit({
    type: "tabPress",
    target: route.key,
    canPreventDefault: true,
  });

  if (focusedName !== name && !event.defaultPrevented) {
    navigation.navigate(name);
  }
}

type TabItemProps = {
  label: string;
  focused: boolean;
  onPress: () => void;
  children: ReactNode;
  widthClassName?: string;
};

function TabItem({
  label,
  focused,
  onPress,
  children,
  widthClassName,
}: TabItemProps) {
  const color = focused ? colors.primary : colors.slate400;

  return (
    <Pressable
      accessibilityRole="button"
      accessibilityState={{ selected: focused }}
      onPress={onPress}
      className={`h-full items-center justify-center gap-1 ${widthClassName ?? ""}`}
    >
      {focused ? (
        <View className="absolute top-0 h-1 w-9 rounded-b-sm bg-tab-indicator" />
      ) : null}
      {children}
      <Text
        className="text-[12px]"
        ellipsizeMode="tail"
        numberOfLines={1}
        adjustsFontSizeToFit
        minimumFontScale={0.75}
        style={{ fontFamily: cairo.regular, color }}
      >
        {label}
      </Text>
    </Pressable>
  );
}

type GuestSideItemProps = {
  label: string;
  focused: boolean;
  onPress: () => void;
  iconXml: string;
  size?: number;
  widthClassName?: string;
};

function GuestSideItem({
  label,
  focused,
  onPress,
  iconXml,
  size = 24,
  widthClassName = "w-[45px]",
}: GuestSideItemProps) {
  const color = focused ? colors.primary : colors.slate400;
  const xml = iconXml
    .replaceAll("#018A43", color)
    .replaceAll("#CBD5E1", color)
    .replaceAll('stroke="#018A43"', `stroke="${color}"`);

  return (
    <TabItem
      label={label}
      focused={focused}
      onPress={onPress}
      widthClassName={widthClassName}
    >
      <SvgXml xml={xml} width={size} height={size} />
    </TabItem>
  );
}

export default function AppTabBar({ state, navigation }: BottomTabBarProps) {
  const { t } = useTranslation();
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const { session } = useAuthState();
  const role = getAuthRole(session);
  const focusedName = state.routes[state.index]?.name;
  const focusedTab = isTabName(focusedName ?? "") ? focusedName : null;

  const labels: Record<TabName, string> = {
    index: t("tabs.home"),
    competitions: t("tabs.competitions"),
    members: t("tabs.members"),
    more: t("tabs.more"),
  };

  function navigateTo(name: TabName) {
    navigateInTabs(navigation, state, name, focusedTab ?? undefined);
  }

  if (role === "guest" && focusedName === "members") {
    return null;
  }

  if (role === "guest") {
    const rankingsFocused = focusedName === "rankings";
    const competitionsFocused = focusedTab === "competitions";
    const liveLabel = t("tabs.live");

    return (
      <View
        className="overflow-visible bg-white"
        style={{ paddingBottom: Math.max(insets.bottom, 8) }}
      >
        <View className="h-[70px] flex-row items-center justify-center gap-[122px] px-5">
          <View className="h-full w-[118px] flex-row items-center justify-center gap-8">
            <GuestSideItem
              label={labels.index}
              focused={focusedTab === "index"}
              onPress={() => navigateTo("index")}
              iconXml={GUEST_HOME_ICON_XML}
              widthClassName="w-[41px]"
            />
            <GuestSideItem
              label={t("tabs.rankings")}
              focused={rankingsFocused}
              onPress={() =>
                navigateInTabs(navigation, state, "rankings", focusedName)
              }
              iconXml={GUEST_RANKINGS_ICON_XML}
            />
          </View>

          <View className="h-full flex-row items-center justify-center gap-8">
            <GuestSideItem
              label={labels.competitions}
              focused={competitionsFocused}
              onPress={() => navigateTo("competitions")}
              iconXml={GUEST_COMPETITIONS_ICON_XML}
            />
            <GuestSideItem
              label={labels.more}
              focused={focusedTab === "more"}
              onPress={() => navigateTo("more")}
              iconXml={MORE_TAB_ICON_XML}
            />
          </View>
        </View>

        <View
          pointerEvents="box-none"
          className="absolute left-0 right-0 items-center"
          style={{ top: -22 }}
        >
          <Pressable
            accessibilityRole="button"
            accessibilityLabel={liveLabel}
            onPress={() => router.push('/live' as Href)}
            className="items-center gap-1"
          >
            <View
              className="size-[60px] items-center justify-center rounded-full bg-primary/20"
              style={{
                shadowColor: "#000",
                shadowOffset: { width: 0, height: 1 },
                shadowOpacity: 0.15,
                shadowRadius: 4,
                elevation: 3,
              }}
            >
              <View className="size-[45px] items-center justify-center rounded-full bg-primary">
                <SvgXml xml={GUEST_LIVE_ICON_XML} width={24} height={24} />
              </View>
            </View>
            <Text
              className="text-[12px]"
              numberOfLines={1}
              adjustsFontSizeToFit
              minimumFontScale={0.75}
              style={{
                fontFamily: cairo.regular,
                color: colors.slate400,
              }}
            >
              {liveLabel}
            </Text>
          </Pressable>
        </View>
      </View>
    );
  }

  if (role === "user") {
    const rankingsFocused = focusedName === "rankings";
    const punishmentsFocused = focusedName === "punishments";
    const competitionsFocused = focusedTab === "competitions";

    return (
      <View
        className="overflow-visible bg-white"
        style={{ paddingBottom: Math.max(insets.bottom, 8) }}
      >
        <View className="h-[70px] flex-row items-center px-5">
          <View className="h-full flex-1 flex-row items-center justify-evenly">
            <TabItem
              label={labels.index}
              focused={focusedTab === "index"}
              onPress={() => navigateTo("index")}
            >
              <TabIcon
                name="index"
                color={
                  focusedTab === "index" ? colors.primary : colors.slate400
                }
              />
            </TabItem>
            <GuestSideItem
              label={t("tabs.rankings")}
              focused={rankingsFocused}
              onPress={() =>
                navigateInTabs(navigation, state, "rankings", focusedName)
              }
              iconXml={GUEST_RANKINGS_ICON_XML}
            />
          </View>

          <View className="w-[72px]" />

          <View className="h-full flex-1 flex-row items-center justify-evenly">
            <GuestSideItem
              label={t("tabs.penalties")}
              focused={punishmentsFocused}
              onPress={() =>
                navigateInTabs(navigation, state, "punishments", focusedName)
              }
              iconXml={GUEST_PENALTIES_ICON_XML}
              size={22}
            />
            <TabItem
              label={labels.more}
              focused={focusedTab === "more"}
              onPress={() => navigateTo("more")}
            >
              <TabIcon
                name="more"
                color={focusedTab === "more" ? colors.primary : colors.slate400}
              />
            </TabItem>
          </View>
        </View>

        <View
          pointerEvents="box-none"
          className="absolute left-0 right-0 items-center"
          style={{ top: -22 }}
        >
          <Pressable
            accessibilityRole="button"
            accessibilityLabel={labels.competitions}
            accessibilityState={{ selected: competitionsFocused }}
            onPress={() => navigateTo("competitions")}
            className="items-center gap-1"
          >
            <View
              className="size-[60px] items-center justify-center rounded-full bg-primary/20"
              style={{
                shadowColor: "#000",
                shadowOffset: { width: 0, height: 1 },
                shadowOpacity: 0.15,
                shadowRadius: 4,
                elevation: 3,
              }}
            >
              <View className="size-[45px] items-center justify-center rounded-full bg-primary">
                <SvgXml
                  xml={GUEST_COMPETITIONS_ICON_XML.replaceAll(
                    "#018A43",
                    colors.white,
                  )}
                  width={24}
                  height={24}
                />
              </View>
            </View>
            <Text
              className="text-[12px]"
              numberOfLines={1}
              adjustsFontSizeToFit
              minimumFontScale={0.75}
              style={{
                fontFamily: cairo.regular,
                color: competitionsFocused ? colors.primary : colors.slate400,
              }}
            >
              {labels.competitions}
            </Text>
          </Pressable>
        </View>
      </View>
    );
  }

  return (
    <View
      className="overflow-visible bg-white"
      style={{ paddingBottom: Math.max(insets.bottom, 8) }}
    >
      <View className="h-[70px] flex-row items-center px-5">
        <View className="h-full flex-1 flex-row items-center justify-evenly">
          <TabItem
            label={labels.index}
            focused={focusedTab === "index"}
            onPress={() => navigateTo("index")}
          >
            <TabIcon
              name="index"
              color={focusedTab === "index" ? colors.primary : colors.slate400}
            />
          </TabItem>
          <TabItem
            label={labels.competitions}
            focused={focusedTab === "competitions"}
            onPress={() => navigateTo("competitions")}
          >
            <TabIcon
              name="competitions"
              color={
                focusedTab === "competitions" ? colors.primary : colors.slate400
              }
            />
          </TabItem>
        </View>

        <View className="w-[72px]" />

        <View className="h-full flex-1 flex-row items-center justify-evenly">
          <TabItem
            label={labels.members}
            focused={focusedTab === "members"}
            onPress={() => navigateTo("members")}
          >
            <TabIcon
              name="members"
              color={
                focusedTab === "members" ? colors.primary : colors.slate400
              }
            />
          </TabItem>
          <TabItem
            label={labels.more}
            focused={focusedTab === "more"}
            onPress={() => navigateTo("more")}
          >
            <TabIcon
              name="more"
              color={focusedTab === "more" ? colors.primary : colors.slate400}
            />
          </TabItem>
        </View>
      </View>

      <View
        pointerEvents="box-none"
        className="absolute left-0 right-0 items-center"
        style={{ top: -22 }}
      >
        <Pressable
          accessibilityRole="button"
          accessibilityLabel={t("tabs.add")}
          onPress={() => router.push("/fast-management")}
          className="items-center gap-1"
        >
          <View
            className="size-[60px] items-center justify-center rounded-full bg-primary/20"
            style={{
              shadowColor: "#000",
              shadowOffset: { width: 0, height: 1 },
              shadowOpacity: 0.15,
              shadowRadius: 4,
              elevation: 3,
            }}
          >
            <View className="size-[45px] items-center justify-center rounded-full bg-primary">
              <Image
                source={addIcon}
                style={{ width: 24, height: 24 }}
                contentFit="contain"
              />
            </View>
          </View>
          <Text
            className="text-[12px] text-slate-400"
            style={{ fontFamily: cairo.regular }}
          >
            {t("tabs.add")}
          </Text>
        </Pressable>
      </View>
    </View>
  );
}
