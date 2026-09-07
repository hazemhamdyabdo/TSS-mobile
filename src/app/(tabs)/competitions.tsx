import { useAuthState } from '@/features/auth/hooks/useAuthState';
import CompetitionsScreen from '@/features/competitions/components/CompetitionsScreen';
import GuestCompetitionsScreen from '@/features/competitions/components/GuestCompetitionsScreen';

export default function CompetitionsRoute() {
  const { session } = useAuthState();

  if (session?.isGuest) {
    return <GuestCompetitionsScreen />;
  }

  return <CompetitionsScreen />;
}
