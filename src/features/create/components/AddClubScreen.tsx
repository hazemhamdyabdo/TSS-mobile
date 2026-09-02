import { useTranslation } from 'react-i18next';

import AddClubForm from './AddClubForm';
import CreateFormLayout from './CreateFormLayout';

export default function AddClubScreen() {
  const { t } = useTranslation();

  return (
    <CreateFormLayout title={t('create.screens.addClub')}>
      <AddClubForm />
    </CreateFormLayout>
  );
}
