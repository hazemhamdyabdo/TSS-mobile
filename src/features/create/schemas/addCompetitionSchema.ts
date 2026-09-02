import type { TFunction } from 'i18next';
import { z } from 'zod';

import {
  OPTIONAL_ATTACHMENT_MAX_BYTES,
  attachmentFields,
  refineAttachment,
  requiredDate,
  requiredNumber,
  requiredSelect,
  requiredText,
} from './helpers';

export function createAddCompetitionSchema(t: TFunction) {
  return z
    .object({
      eventName: requiredText(t),
      hostLocation: requiredText(t),
      registrationDeadline: requiredDate(t),
      startDate: requiredDate(t),
      endDate: requiredDate(t),
      weapon: requiredSelect(t),
      gender: requiredSelect(t),
      ageCategory: requiredSelect(t),
      category: requiredSelect(t),
      capacity: requiredNumber(t),
      status: requiredSelect(t),
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

      if (
        values.registrationDeadline &&
        values.startDate &&
        values.registrationDeadline > values.startDate
      ) {
        ctx.addIssue({
          code: 'custom',
          path: ['registrationDeadline'],
          message: t('create.errors.deadlineBeforeStart'),
        });
      }

      refineAttachment(t, values, ctx, {
        required: false,
        maxBytes: OPTIONAL_ATTACHMENT_MAX_BYTES,
      });
    });
}

export type AddCompetitionFormValues = z.infer<ReturnType<typeof createAddCompetitionSchema>>;
