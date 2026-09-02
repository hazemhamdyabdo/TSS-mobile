import { useTranslation } from 'react-i18next';

import AddRefereeForm from './AddRefereeForm';
import CreateFormLayout from './CreateFormLayout';

export default function AddRefereeScreen() {
  const { t } = useTranslation();

  return (
    <CreateFormLayout title={t('create.screens.addReferee')}>
      <AddRefereeForm />
    </CreateFormLayout>
  );
}
