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

export function createAddClubSchema(t: TFunction) {
  return z
    .object({
      clubName: requiredText(t),
      region: requiredSelect(t),
      category: requiredSelect(t),
      playerCount: requiredNumber(t),
      ...attachmentFields,
    })
    .superRefine((values, ctx) => {
      refineAttachment(t, values, ctx, {
        required: false,
        maxBytes: OPTIONAL_ATTACHMENT_MAX_BYTES,
      });
    });
}

export type AddClubFormValues = z.infer<ReturnType<typeof createAddClubSchema>>;
