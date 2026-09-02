import type { TFunction } from 'i18next';
import { z } from 'zod';

import {
  OPTIONAL_ATTACHMENT_MAX_BYTES,
  attachmentFields,
  refineAttachment,
  requiredSelect,
  requiredText,
} from './helpers';
import { isValidSaPhone } from '@/features/auth/schemas/loginSchema';

export function createAddAdministratorSchema(t: TFunction) {
  return z
    .object({
      name: requiredText(t),
      club: requiredSelect(t),
      role: requiredSelect(t),
      phone: z
        .string()
        .trim()
        .min(1, t('create.errors.required'))
        .refine((value) => isValidSaPhone(value), t('create.errors.invalidPhone')),
      email: z
        .string()
        .trim()
        .min(1, t('create.errors.required'))
        .refine((value) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value), t('create.errors.invalidEmail')),
      status: requiredSelect(t),
      ...attachmentFields,
    })
    .superRefine((values, ctx) => {
      refineAttachment(t, values, ctx, {
        required: false,
        maxBytes: OPTIONAL_ATTACHMENT_MAX_BYTES,
      });
    });
}

export type AddAdministratorFormValues = z.infer<ReturnType<typeof createAddAdministratorSchema>>;
