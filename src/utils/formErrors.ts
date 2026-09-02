import type { TFunction } from 'i18next';

import { MockApiError } from './mockApi';

export function getMockErrorMessage(error: unknown, fallbackKey: string, t: TFunction) {
  if (error instanceof MockApiError) {
    return t(error.message);
  }

  return t(fallbackKey);
}
