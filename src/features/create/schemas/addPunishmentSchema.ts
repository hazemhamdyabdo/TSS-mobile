import type { TFunction } from 'i18next';
import { z } from 'zod';

import {
  OPTIONAL_ATTACHMENT_MAX_BYTES,
  attachmentFields,
  refineAttachment,
  requiredDate,
  requiredSelect,
  requiredText,
} from './helpers';

export function createAddPunishmentSchema(t: TFunction) {
  return z
    .object({
      offenderType: requiredSelect(t),
      name: requiredText(t),
      penaltyType: requiredSelect(t),
      reason: requiredText(t),
      startDate: requiredDate(t),
      endDate: requiredDate(t),
      issuedBy: requiredSelect(t),
      ...attachmentFields,
    })
    .superRefine((values, ctx) => {
      if (values.startDate && values.endDate && values.endDate < values.startDate) {
        ctx.addIssue({
          code: 'custom',
          path: ['endDate'],
          message: t('create.errors.endAfterStart'),
        });
      }

      refineAttachment(t, values, ctx, {
        required: false,
        maxBytes: OPTIONAL_ATTACHMENT_MAX_BYTES,
      });
    });
}

export type AddPunishmentFormValues = z.infer<ReturnType<typeof createAddPunishmentSchema>>;
