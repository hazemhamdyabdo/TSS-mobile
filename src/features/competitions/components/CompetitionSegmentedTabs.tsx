import { useTranslation } from "react-i18next";
import { Pressable, Text, View } from "react-native";

import type { AuthRole } from "@/features/auth/types";
import { RTL_CONTAINER_STYLE, RTL_TEXT_STYLE } from "@/localization/direction";
import { colors } from "@/theme/colors";
import { cairo } from "@/theme/typography";

import type { CompetitionDetailTab } from "../types";

const TABS: CompetitionDetailTab[] = ["info", "participants", "results"];

type CompetitionSegmentedTabsProps = {
  value: CompetitionDetailTab;
  onChange: (tab: CompetitionDetailTab) => void;
  role?: AuthRole | null;
};

function tabLabelKey(role: AuthRole | null | undefined, tab: CompetitionDetailTab) {
  switch (role) {
    case "guest":
      return `competitions.guest.tabs.${tab}`;
    case "user":
      return `competitions.user.tabs.${tab}`;
    case "admin":
    case null:
    case undefined:
      return `competitions.tabs.${tab}`;
    default: {
      const exhaustive: never = role;
      return exhaustive;
    }
  }
}

export default function CompetitionSegmentedTabs({
  value,
  onChange,
  role = null,
}: CompetitionSegmentedTabsProps) {
  const { t } = useTranslation();
  const isGuest = role === "guest";

  return (
    <View
      className={
        isGuest
          ? "h-12 flex-row items-center gap-2 rounded-[50px] border border-slate-100 bg-white p-1"
          : "h-12 flex-row rounded-xl bg-white p-1"
      }
      style={RTL_CONTAINER_STYLE}
    >
      {TABS.map((tab) => {
        const selected = tab === value;

        return (
          <Pressable
            key={tab}
            accessibilityRole="button"
            onPress={() => onChange(tab)}
            className={
              isGuest
                ? `h-10 min-w-0 flex-1 items-center justify-center rounded-[20px] ${
                    selected ? "bg-primary/10" : ""
                  }`
                : `h-full flex-1 items-center justify-center rounded-2xl ${
                    selected ? "bg-primary/10" : ""
                  }`
            }
          >
            <Text
              className="text-xs"
              style={{
                color: selected ? colors.primary : colors.slate400,
                fontFamily: isGuest
                  ? cairo.regular
                  : selected
                    ? cairo.semiBold
                    : cairo.medium,
                ...RTL_TEXT_STYLE,
              }}
            >
              {t(tabLabelKey(role, tab))}
            </Text>
          </Pressable>
        );
      })}
    </View>
  );
}
