import { Image } from "expo-image";
import { useTranslation } from "react-i18next";
import { Pressable, Text, View } from "react-native";

import { cairo } from "@/theme/typography";

import type { RecentTask, RelativeTimeUnit, TaskType } from "../types";
import TaskStatusBadge from "./TaskStatusBadge";

const transferIcon = require("@/assets/images/home/icons/task-transfer.png");
const competitionIcon = require("@/assets/images/home/icons/task-competition.png");
const coachIcon = require("@/assets/images/home/icons/task-coach.png");
const refereeIcon = require("@/assets/images/home/icons/task-referee.png");

type RecentTasksSectionProps = {
  tasks: RecentTask[];
  onViewAll: () => void;
};

function taskTypeIcon(type: TaskType) {
  switch (type) {
    case "transfer":
      return transferIcon;
    case "competition":
      return competitionIcon;
    case "coach":
      return coachIcon;
    case "referee":
      return refereeIcon;
    default: {
      const exhaustive: never = type;
      throw new Error(`Unhandled task type: ${exhaustive}`);
    }
  }
}

function relativeTimeKey(unit: RelativeTimeUnit, count: number) {
  switch (unit) {
    case "minutes":
      return "home.relative.minutesAgo";
    case "hours":
      return count === 1 ? "home.relative.hourAgo" : "home.relative.hoursAgo";
    default: {
      const exhaustive: never = unit;
      throw new Error(`Unhandled time unit: ${exhaustive}`);
    }
  }
}

export default function RecentTasksSection({
  tasks,
  onViewAll,
}: RecentTasksSectionProps) {
  const { t } = useTranslation();

  return (
    <View className="w-full gap-4">
      <View className="flex-row items-center justify-between">
        <Text
          className="text-sm text-label"
          style={{ fontFamily: cairo.semiBold }}
        >
          {t("home.recentTasks.title")}
        </Text>
        <Pressable accessibilityRole="button" onPress={onViewAll}>
          <Text
            className="text-[10px] text-primary"
            style={{ fontFamily: cairo.semiBold }}
          >
            {t("home.viewAll")}
          </Text>
        </Pressable>
      </View>

      <View className="overflow-hidden rounded-lg border border-slate-100 bg-white p-2">
        <View className="gap-1">
          {tasks.map((task) => (
            <View key={task.id} className="rounded-xl bg-background p-4">
              <View className="flex-row items-center justify-between">
                <View className="min-w-0 flex-1 flex-row items-center gap-2">
                  <View className="size-7 items-center justify-center overflow-hidden rounded-md bg-primary/10 p-[7px]">
                    <Image
                      source={taskTypeIcon(task.type)}
                      style={{ width: 15, height: 15 }}
                      contentFit="contain"
                    />
                  </View>
                  <View className="min-w-0 flex-1 items-start gap-1 ">
                    <Text
                      className="text-xs text-accent"
                      style={{ fontFamily: cairo.medium }}
                      numberOfLines={1}
                    >
                      {t(task.titleKey)}
                    </Text>
                    <Text
                      className="text-[10px] text-slate-400"
                      style={{ fontFamily: cairo.regular }}
                      numberOfLines={1}
                    >
                      {t(task.subtitleKey)}
                    </Text>
                  </View>
                </View>

                <View className="shrink-0 items-end gap-1">
                  <TaskStatusBadge status={task.status} />
                  <Text
                    className="text-[10px] text-accent"
                    style={{ fontFamily: cairo.regular }}
                  >
                    {t(
                      relativeTimeKey(
                        task.relativeTimeUnit,
                        task.relativeTimeCount,
                      ),
                      {
                        count: task.relativeTimeCount,
                      },
                    )}
                  </Text>
                </View>
              </View>
            </View>
          ))}
        </View>
      </View>
    </View>
  );
}
