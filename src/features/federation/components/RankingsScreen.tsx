import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';

import { useFederationState } from '../hooks/useFederationState';
import FederationListScreen from './FederationListScreen';

export default function RankingsScreen() {
  const { t } = useTranslation();
  const { rankings } = useFederationState();

  const rows = useMemo(
    () =>
      rankings.map((item) => ({
        id: item.id,
        title: t(item.nameKey),
        subtitle: t(item.clubKey),
        badge: String(item.rank),
        meta: t('federation.rankings.points', { count: item.points }),
      })),
    [rankings, t],
  );

  return (
    <FederationListScreen
      titleKey="more.hub.items.rankings.title"
      searchKey="federation.search.rankings"
      emptyKey="federation.empty.rankings"
      rows={rows}
      embeddedInTabs
    />
  );
}
