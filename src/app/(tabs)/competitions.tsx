import { useAuthState } from '@/features/auth/hooks/useAuthState';
import { isAdminSession } from '@/features/auth/utils/sessionRole';
import CompetitionsScreen from '@/features/competitions/components/CompetitionsScreen';
import GuestCompetitionsScreen from '@/features/competitions/components/GuestCompetitionsScreen';

export default function CompetitionsRoute() {
  const { session } = useAuthState();

  if (isAdminSession(session)) {
    return <CompetitionsScreen />;
  }

  return <GuestCompetitionsScreen />;
}
