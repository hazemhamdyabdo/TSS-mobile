import { useAuthState } from '@/features/auth/hooks/useAuthState';
import RankingsScreen from '@/features/federation/components/RankingsScreen';
import GuestLeaderboardScreen from '@/features/home/components/GuestLeaderboardScreen';

export default function RankingsRoute() {
  const { session } = useAuthState();

  if (session?.isGuest) {
    return <GuestLeaderboardScreen />;
  }

  return <RankingsScreen />;
}
