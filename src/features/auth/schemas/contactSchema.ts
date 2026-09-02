import type { TFunction } from 'i18next';
import { z } from 'zod';

import { createLoginSchema } from './loginSchema';

const IMAGE_TYPES = new Set(['image/jpeg', 'image/jpg', 'image/png']);
const MAX_ATTACHMENT_BYTES = 1024 * 1024;

export function createContactSchema(t: TFunction) {
  return createLoginSchema(t).extend({
    subject: z.string().min(1, t('auth.errors.subjectRequired')),
    attachmentUri: z.string().optional(),
    attachmentType: z.string().optional(),
    attachmentSize: z.number().optional(),
  }).superRefine((values, ctx) => {
    if (!values.attachmentUri) {
      return;
    }

    if (values.attachmentType && !IMAGE_TYPES.has(values.attachmentType)) {
      ctx.addIssue({
        code: 'custom',
        path: ['attachmentUri'],
        message: t('auth.errors.attachmentType'),
      });
    }

    if (values.attachmentSize && values.attachmentSize > MAX_ATTACHMENT_BYTES) {
      ctx.addIssue({
        code: 'custom',
        path: ['attachmentUri'],
        message: t('auth.errors.attachmentTooLarge'),
      });
    }
  });
}

export type ContactFormValues = z.infer<ReturnType<typeof createContactSchema>>;
