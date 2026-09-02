import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';

import { useFederationState } from '../hooks/useFederationState';
import FederationListScreen from './FederationListScreen';

export default function TransfersScreen() {
  const { t } = useTranslation();
  const { transfers } = useFederationState();

  const rows = useMemo(
    () =>
      transfers.map((item) => ({
        id: item.id,
        title: t(item.playerKey),
        subtitle: `${t(item.fromClubKey)} → ${t(item.toClubKey)}`,
        meta: t(item.dateKey),
        badge: t(`federation.transfers.status.${item.status}`),
      })),
    [t, transfers],
  );

  return (
    <FederationListScreen
      titleKey="more.hub.items.transfers.title"
      searchKey="federation.search.transfers"
      emptyKey="federation.empty.transfers"
      rows={rows}
    />
  );
}
