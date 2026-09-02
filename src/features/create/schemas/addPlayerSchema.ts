import type { TFunction } from 'i18next';
import { z } from 'zod';

import {
  PASSPORT_ATTACHMENT_MAX_BYTES,
  attachmentFields,
  refineAttachment,
  requiredDate,
  requiredNumber,
  requiredSelect,
  requiredText,
} from './helpers';

export function createAddPlayerSchema(t: TFunction) {
  return z
    .object({
      name: requiredText(t),
      club: requiredSelect(t),
      birthDate: requiredDate(t),
      weapon: requiredSelect(t),
      gender: requiredSelect(t),
      ageCategory: requiredSelect(t),
      rating: requiredNumber(t),
      nationality: requiredSelect(t),
      nationalTeam: requiredSelect(t),
      contractStart: requiredDate(t),
      contractEnd: requiredDate(t),
      ...attachmentFields,
    })
    .superRefine((values, ctx) => {
      if (values.contractStart && values.contractEnd && values.contractEnd < values.contractStart) {
        ctx.addIssue({
          code: 'custom',
          path: ['contractEnd'],
          message: t('create.errors.endAfterStart'),
        });
      }

      refineAttachment(t, values, ctx, {
        required: true,
        maxBytes: PASSPORT_ATTACHMENT_MAX_BYTES,
        requiredMessage: t('create.errors.passportRequired'),
      });
    });
}

export type AddPlayerFormValues = z.infer<ReturnType<typeof createAddPlayerSchema>>;
