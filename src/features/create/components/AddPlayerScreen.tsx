import { useTranslation } from 'react-i18next';

import AddPlayerForm from './AddPlayerForm';
import CreateFormLayout from './CreateFormLayout';

export default function AddPlayerScreen() {
  const { t } = useTranslation();

  return (
    <CreateFormLayout title={t('create.screens.addPlayer')}>
      <AddPlayerForm />
    </CreateFormLayout>
  );
}
