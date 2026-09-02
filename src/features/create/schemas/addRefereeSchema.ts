import type { TFunction } from 'i18next';
import { z } from 'zod';

import {
  OPTIONAL_ATTACHMENT_MAX_BYTES,
  attachmentFields,
  refineAttachment,
  requiredSelect,
  requiredText,
} from './helpers';

export function createAddRefereeSchema(t: TFunction) {
  return z
    .object({
      name: requiredText(t),
      category: requiredSelect(t),
      weapon: requiredSelect(t),
      region: requiredSelect(t),
      entity: requiredSelect(t),
      ...attachmentFields,
    })
    .superRefine((values, ctx) => {
      refineAttachment(t, values, ctx, {
        required: false,
        maxBytes: OPTIONAL_ATTACHMENT_MAX_BYTES,
      });
    });
}

export type AddRefereeFormValues = z.infer<ReturnType<typeof createAddRefereeSchema>>;
