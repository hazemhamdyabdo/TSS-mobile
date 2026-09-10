import { useRouter, type Href } from "expo-router";
import { useTranslation } from "react-i18next";
import { ScrollView } from "react-native";

import ScreenSafeAreaView from "@/components/ScreenSafeAreaView";
import { useAuthState } from "@/features/auth/hooks/useAuthState";
import { getAuthRole, isGuestSession } from "@/features/auth/utils/sessionRole";
import { DUMMY_GUEST_PROFILE } from "@/features/more/constants/dummy";
import { useMoreState } from "@/features/more/hooks/useMoreState";
import { resolveProfileAvatarSource } from "@/features/more/utils/profileAvatar";
import { useNotificationsState } from "@/features/notifications/hooks/useNotificationsState";
import { useMockListFetch } from "@/hooks/useMockListFetch";

import { getHome } from "../api";
import { useHomeState } from "../hooks/useHomeState";
import { navigateToNews } from "../utils/navigateToNews";
import ChampionshipBanner from "./ChampionshipBanner";
import GuestQuickActionsSection from "./GuestQuickActionsSection";
import HomeHeader from "./HomeHeader";
import HomeRankingsPreviewSection from "./HomeRankingsPreviewSection";
import HomeSkeleton from "./HomeSkeleton";
import QuickActionsSection from "./QuickActionsSection";
import RecentTasksSection from "./RecentTasksSection";
import UpcomingCompetitionsSection from "./UpcomingCompetitionsSection";

export default function HomeScreen() {
  const router = useRouter();
  const { t } = useTranslation();
  const home = useHomeState();
  const { session } = useAuthState();
  const { profile } = useMoreState();
  const { unreadCount } = useNotificationsState();
  const isLoading = useMockListFetch(getHome);
  const role = getAuthRole(session);
  const isGuest = isGuestSession(session);

  const headerName = isGuest ? t(home.guestProfile.nameKey) : profile.name;
  const headerRoleKey = isGuest ? home.guestProfile.roleKey : profile.roleKey;
  const headerAvatarSource = resolveProfileAvatarSource(
    isGuest ? DUMMY_GUEST_PROFILE : profile,
    role,
  );

  return (
    <ScreenSafeAreaView className="flex-1 bg-background" edges={["top"]}>
      <ScrollView
        className="flex-1"
        contentContainerClassName="gap-4 px-5 pb-28 pt-2"
        showsVerticalScrollIndicator={false}
      >
        {isLoading ? (
          <HomeSkeleton />
        ) : role === "guest" ? (
          <>
            <HomeHeader
              name={headerName}
              roleKey={headerRoleKey}
              avatarSource={headerAvatarSource}
              notificationCount={unreadCount}
              welcomeKey="home.guest.welcome"
              showNotifications={false}
              avatarInitial={t("home.guest.avatarInitial")}
              onNotificationsPress={() => router.push("/inbox" as Href)}
              onAvatarPress={() => router.push("/profile" as Href)}
            />
            <ChampionshipBanner
              banners={home.banners}
              onDiscoverPress={navigateToNews}
              onBannerPress={navigateToNews}
            />
            <GuestQuickActionsSection actions={home.guestQuickActions} />
            <UpcomingCompetitionsSection
              competitions={home.upcomingCompetitions}
            />
            <HomeRankingsPreviewSection rankings={home.rankingsPreview} />
          </>
        ) : role === "user" ? (
          <>
            <HomeHeader
              name={headerName}
              roleKey={headerRoleKey}
              avatarSource={headerAvatarSource}
              notificationCount={unreadCount}
              onNotificationsPress={() => router.push("/inbox" as Href)}
              onAvatarPress={() => router.push("/profile" as Href)}
            />
            <ChampionshipBanner
              banners={home.banners}
              onDiscoverPress={() => router.push("/(tabs)/competitions")}
              onBannerPress={() => router.push("/(tabs)/competitions")}
            />
            <GuestQuickActionsSection actions={home.guestQuickActions} />
            <UpcomingCompetitionsSection
              competitions={home.upcomingCompetitions}
            />
            <HomeRankingsPreviewSection rankings={home.rankingsPreview} />
          </>
        ) : (
          <>
            <HomeHeader
              name={headerName}
              roleKey={headerRoleKey}
              avatarSource={headerAvatarSource}
              notificationCount={unreadCount}
              onNotificationsPress={() => router.push("/inbox" as Href)}
              onAvatarPress={() => router.push("/profile" as Href)}
            />
            <ChampionshipBanner
              banners={home.banners}
              onDiscoverPress={() => router.push("/(tabs)/competitions")}
            />
            <QuickActionsSection actions={home.quickActions} />
            <RecentTasksSection
              tasks={home.tasks}
              onViewAll={() => router.push("/transfers" as Href)}
            />
          </>
        )}
      </ScrollView>
    </ScreenSafeAreaView>
  );
}
