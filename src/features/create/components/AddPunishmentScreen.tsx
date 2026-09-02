import { useTranslation } from 'react-i18next';

import AddPunishmentForm from './AddPunishmentForm';
import CreateFormLayout from './CreateFormLayout';

export default function AddPunishmentScreen() {
  const { t } = useTranslation();

  return (
    <CreateFormLayout title={t('create.screens.addPunishment')}>
      <AddPunishmentForm />
    </CreateFormLayout>
  );
}
