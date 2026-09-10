import { useAuthState } from '@/features/auth/hooks/useAuthState';
import { isGuestSession } from '@/features/auth/utils/sessionRole';
import GuestPlayersScreen from '@/features/members/components/GuestPlayersScreen';
import MembersScreen from '@/features/members/components/MembersScreen';

export default function MembersRoute() {
  const { session } = useAuthState();
  return isGuestSession(session) ? <GuestPlayersScreen /> : <MembersScreen />;
}
