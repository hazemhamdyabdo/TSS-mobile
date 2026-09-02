import { useTranslation } from 'react-i18next';

import AddAdministratorForm from './AddAdministratorForm';
import CreateFormLayout from './CreateFormLayout';

export default function AddAdministratorScreen() {
  const { t } = useTranslation();

  return (
    <CreateFormLayout title={t('create.screens.addAdministrator')}>
      <AddAdministratorForm />
    </CreateFormLayout>
  );
}
