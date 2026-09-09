import { useAuthState } from '@/features/auth/hooks/useAuthState';
import { isAdminSession } from '@/features/auth/utils/sessionRole';
import PunishmentsScreen from '@/features/federation/components/PunishmentsScreen';
import GuestPunishmentsScreen from '@/features/punishments/components/GuestPunishmentsScreen';

export default function PunishmentsRoute() {
  const { session } = useAuthState();

  if (isAdminSession(session)) {
    return <PunishmentsScreen />;
  }

  return <GuestPunishmentsScreen />;
}
