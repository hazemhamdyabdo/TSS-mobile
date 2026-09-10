import { useAuthState } from '@/features/auth/hooks/useAuthState';
import { getAuthRole } from '@/features/auth/utils/sessionRole';
import GuestLeaderboardScreen from '@/features/home/components/GuestLeaderboardScreen';

export default function RankingsRoute() {
  const { session } = useAuthState();
  const role = getAuthRole(session);

  return <GuestLeaderboardScreen highlightCurrentUser={role === 'user'} />;
}
