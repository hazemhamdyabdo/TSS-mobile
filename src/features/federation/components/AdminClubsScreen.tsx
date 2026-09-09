import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';

import { CREATE_ROUTES } from '@/features/create/constants/actions';

import { useFederationState } from '../hooks/useFederationState';
import FederationListScreen from './FederationListScreen';

export default function AdminClubsScreen() {
  const { t } = useTranslation();
  const { clubs } = useFederationState();

  const rows = useMemo(
    () =>
      clubs.map((club) => ({
        id: club.id,
        title: club.name || (club.nameKey ? t(club.nameKey) : club.id),
        subtitle: `${t(`create.options.region.${club.region}`)} · ${t(`create.options.clubCategory.${club.category}`)}`,
        badge: t('federation.clubs.playerCount', { count: Number(club.playerCount) || 0 }),
      })),
    [clubs, t],
  );

  return (
    <FederationListScreen
      titleKey="more.hub.items.clubs.title"
      searchKey="federation.search.clubs"
      emptyKey="federation.empty.clubs"
      addHref={CREATE_ROUTES.addClub}
      addLabelKey="create.submit.addClub"
      rows={rows}
    />
  );
}
