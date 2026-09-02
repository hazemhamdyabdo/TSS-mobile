import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';

import { useFederationState } from '../hooks/useFederationState';
import FederationListScreen from './FederationListScreen';

export default function ResultsScreen() {
  const { t } = useTranslation();
  const { results } = useFederationState();

  const rows = useMemo(
    () =>
      results.map((item) => ({
        id: item.id,
        title: t(item.competitionKey),
        subtitle: t(item.winnerKey),
        meta: t(item.dateKey),
        badge: item.score,
      })),
    [results, t],
  );

  return (
    <FederationListScreen
      titleKey="more.hub.items.results.title"
      searchKey="federation.search.results"
      emptyKey="federation.empty.results"
      rows={rows}
    />
  );
}
