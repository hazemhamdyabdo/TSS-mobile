import type { TFunction } from 'i18next';
import { Alert } from 'react-native';

import { getMockErrorMessage } from '@/utils/formErrors';

export async function submitCreateForm(
  action: () => Promise<unknown>,
  t: TFunction,
  router: { back: () => void },
  titleKey: string,
  successKey: string,
) {
  try {
    await action();
    Alert.alert(t(titleKey), t(successKey), [
      { text: t('common.ok'), onPress: () => router.back() },
    ]);
  } catch (error) {
    Alert.alert(t('create.errors.failedTitle'), getMockErrorMessage(error, 'create.errors.failed', t));
  }
}
