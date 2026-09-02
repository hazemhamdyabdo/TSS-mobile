import { useLocalSearchParams } from 'expo-router';
import { useTranslation } from 'react-i18next';

import AddCompetitionForm from './AddCompetitionForm';
import CreateFormLayout from './CreateFormLayout';

export default function AddCompetitionScreen() {
  const { t } = useTranslation();
  const rawId = useLocalSearchParams<{ id?: string | string[] }>().id;
  const competitionId = Array.isArray(rawId) ? rawId[0] : rawId;

  return (
    <CreateFormLayout
      title={t(competitionId ? 'create.screens.editCompetition' : 'create.screens.addCompetition')}>
      <AddCompetitionForm competitionId={competitionId} />
    </CreateFormLayout>
  );
}
