import type { TFunction } from 'i18next';
import { z } from 'zod';

import { onlyDigits } from '@/utils/digits';

export function createProfileSchema(t: TFunction) {
  return z.object({
    name: z.string().trim().min(1, t('more.errors.required')),
    email: z
      .string()
      .trim()
      .min(1, t('more.errors.required'))
      .refine((value) => value.includes('@'), t('more.errors.invalidEmail')),
    phone: z
      .string()
      .trim()
      .min(1, t('more.errors.required'))
      .refine((value) => onlyDigits(value).length >= 9, t('more.errors.invalidPhone')),
  });
}

export type ProfileSchemaValues = z.infer<ReturnType<typeof createProfileSchema>>;
