import { Image } from "expo-image";
import { useRouter } from "expo-router";
import type { BottomTabBarProps } from "expo-router/js-tabs";
import { useTranslation } from "react-i18next";
import { Pressable, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import TabIcon, { type TabName } from "@/components/TabIcon";
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

type TabItemProps = {
  name: TabName;
  label: string;
  focused: boolean;
  onPress: () => void;
};

function TabItem({ name, label, focused, onPress }: TabItemProps) {
  const color = focused ? colors.primary : colors.slate400;

  return (
    <Pressable
      accessibilityRole="button"
      accessibilityState={{ selected: focused }}
      onPress={onPress}
      className="h-full  items-center justify-center gap-1"
    >
      {focused ? (
        <View className="absolute top-0 h-1 w-9 rounded-b-sm bg-tab-indicator" />
      ) : null}
      <TabIcon name={name} color={color} />
      <Text
        className="text-[12px]"
        ellipsizeMode="tail"
        numberOfLines={1}
        style={{ fontFamily: cairo.regular, color }}
      >
        {label}
      </Text>
    </Pressable>
  );
}

export default function AppTabBar({ state, navigation }: BottomTabBarProps) {
  const { t } = useTranslation();
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const focusedName = state.routes[state.index]?.name;
  const focusedTab = isTabName(focusedName ?? "") ? focusedName : null;

  const labels: Record<TabName, string> = {
    index: t("tabs.home"),
    competitions: t("tabs.competitions"),
    members: t("tabs.members"),
    more: t("tabs.more"),
  };

  function navigateTo(name: TabName) {
    const route = state.routes.find((item) => item.name === name);
    if (!route) {
      return;
    }

    const event = navigation.emit({
      type: "tabPress",
      target: route.key,
      canPreventDefault: true,
    });

    if (focusedTab !== name && !event.defaultPrevented) {
      navigation.navigate(name);
    }
  }

  return (
    <View
      className="overflow-visible bg-white"
      style={{ paddingBottom: Math.max(insets.bottom, 8) }}
    >
      <View className="h-[70px] flex-row items-center px-5">
        <View className="h-full flex-1 flex-row items-center justify-evenly">
          <TabItem
            name="index"
            label={labels.index}
            focused={focusedTab === "index"}
            onPress={() => navigateTo("index")}
          />
          <TabItem
            name="competitions"
            label={labels.competitions}
            focused={focusedTab === "competitions"}
            onPress={() => navigateTo("competitions")}
          />
        </View>

        <View className="w-[72px]" />

        <View className="h-full flex-1 flex-row items-center justify-evenly">
          <TabItem
            name="members"
            label={labels.members}
            focused={focusedTab === "members"}
            onPress={() => navigateTo("members")}
          />
          <TabItem
            name="more"
            label={labels.more}
            focused={focusedTab === "more"}
            onPress={() => navigateTo("more")}
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
