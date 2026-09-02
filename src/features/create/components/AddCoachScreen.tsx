import { useTranslation } from 'react-i18next';

import AddCoachForm from './AddCoachForm';
import CreateFormLayout from './CreateFormLayout';

export default function AddCoachScreen() {
  const { t } = useTranslation();

  return (
    <CreateFormLayout title={t('create.screens.addCoach')}>
      <AddCoachForm />
    </CreateFormLayout>
  );
}
