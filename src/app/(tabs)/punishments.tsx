import { useAuthState } from '@/features/auth/hooks/useAuthState';
import PunishmentsScreen from '@/features/federation/components/PunishmentsScreen';
import GuestPunishmentsScreen from '@/features/punishments/components/GuestPunishmentsScreen';

export default function PunishmentsRoute() {
  const { session } = useAuthState();

  if (session?.isGuest) {
    return <GuestPunishmentsScreen />;
  }

  return <PunishmentsScreen />;
}
