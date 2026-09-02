import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';

import { CREATE_ROUTES } from '@/features/create/constants/actions';
import { toDisplayDate } from '@/utils/dates';

import { useFederationState } from '../hooks/useFederationState';
import FederationListScreen from './FederationListScreen';

export default function PunishmentsScreen() {
  const { t } = useTranslation();
  const { punishments } = useFederationState();

  const rows = useMemo(
    () =>
      punishments.map((item) => ({
        id: item.id,
        title: item.name,
        subtitle: `${t(`create.options.offenderType.${item.offenderType}`)} · ${t(`create.options.penaltyType.${item.penaltyType}`)}`,
        meta: `${toDisplayDate(item.startDate)} – ${toDisplayDate(item.endDate)}`,
        badge: t(`create.options.issuedBy.${item.issuedBy}`),
      })),
    [punishments, t],
  );

  return (
    <FederationListScreen
      titleKey="more.hub.items.punishments.title"
      searchKey="federation.search.punishments"
      emptyKey="federation.empty.punishments"
      addHref={CREATE_ROUTES.addPunishment}
      addLabelKey="create.submit.addPunishment"
      rows={rows}
    />
  );
}
