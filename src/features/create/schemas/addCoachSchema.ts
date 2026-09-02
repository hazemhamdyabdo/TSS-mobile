import type { TFunction } from 'i18next';
import { z } from 'zod';

import {
  OPTIONAL_ATTACHMENT_MAX_BYTES,
  attachmentFields,
  refineAttachment,
  requiredNumber,
  requiredSelect,
  requiredText,
} from './helpers';

export function createAddCoachSchema(t: TFunction) {
  return z
    .object({
      name: requiredText(t),
      club: requiredSelect(t),
      role: requiredSelect(t),
      level: requiredSelect(t),
      weapon: requiredSelect(t),
      championships: requiredNumber(t),
      matches: requiredNumber(t),
      ...attachmentFields,
    })
    .superRefine((values, ctx) => {
      refineAttachment(t, values, ctx, {
        required: false,
        maxBytes: OPTIONAL_ATTACHMENT_MAX_BYTES,
      });
    });
}

export type AddCoachFormValues = z.infer<ReturnType<typeof createAddCoachSchema>>;
