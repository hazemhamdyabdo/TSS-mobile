import { StatusBar } from "expo-status-bar";
import { ScrollView } from "react-native";

import ScreenSafeAreaView from "@/components/ScreenSafeAreaView";
import { useMockListFetch } from "@/hooks/useMockListFetch";

import { getHome } from "../api";
import { useHomeState } from "../hooks/useHomeState";
import ChampionshipBanner from "./ChampionshipBanner";
import HomeHeader from "./HomeHeader";
import HomeSkeleton from "./HomeSkeleton";
import QuickActionsSection from "./QuickActionsSection";
import RecentTasksSection from "./RecentTasksSection";

export default function HomeScreen() {
  const home = useHomeState();
  const isLoading = useMockListFetch(getHome);

  return (
    <ScreenSafeAreaView className="flex-1 bg-background" edges={["top"]}>
      <StatusBar style="dark" />
      <ScrollView
        className="flex-1"
        contentContainerClassName="gap-4 px-5 pb-28 pt-2"
        showsVerticalScrollIndicator={false}
      >
        {isLoading ? (
          <HomeSkeleton />
        ) : (
          <>
            <HomeHeader profile={home.profile} />
            <ChampionshipBanner banners={home.banners} />
            <QuickActionsSection actions={home.quickActions} />
            <RecentTasksSection tasks={home.tasks} />
          </>
        )}
      </ScrollView>
    </ScreenSafeAreaView>
  );
}
