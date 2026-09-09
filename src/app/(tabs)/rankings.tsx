import { useAuthState } from '@/features/auth/hooks/useAuthState';
import { getAuthRole } from '@/features/auth/utils/sessionRole';
import RankingsScreen from '@/features/federation/components/RankingsScreen';
import GuestLeaderboardScreen from '@/features/home/components/GuestLeaderboardScreen';

export default function RankingsRoute() {
  const { session } = useAuthState();
  const role = getAuthRole(session);

  if (role === 'admin') {
    return <RankingsScreen />;
  }

  return (
    <GuestLeaderboardScreen highlightCurrentUser={role === 'user'} />
  );
}
