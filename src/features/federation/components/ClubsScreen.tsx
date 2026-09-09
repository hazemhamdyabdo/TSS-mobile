import { useAuthState } from '@/features/auth/hooks/useAuthState';
import { isAdminSession } from '@/features/auth/utils/sessionRole';

import AdminClubsScreen from './AdminClubsScreen';
import BrowseClubsScreen from './BrowseClubsScreen';

export default function ClubsScreen() {
  const { session } = useAuthState();

  if (isAdminSession(session)) {
    return <AdminClubsScreen />;
  }

  return <BrowseClubsScreen />;
}
