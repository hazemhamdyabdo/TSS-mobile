import { useTranslation } from 'react-i18next';

import AddCompetitionForm from './AddCompetitionForm';
import CreateFormLayout from './CreateFormLayout';

export default function AddCompetitionScreen() {
  const { t } = useTranslation();

  return (
    <CreateFormLayout title={t('create.screens.addCompetition')}>
      <AddCompetitionForm />
    </CreateFormLayout>
  );
}
