import type { TFunction } from 'i18next';
import { z } from 'zod';

import { isIsoDate } from '@/utils/dates';
import { toWesternDigits } from '@/utils/digits';

const IMAGE_TYPES = new Set(['image/jpeg', 'image/jpg', 'image/png']);

export const OPTIONAL_ATTACHMENT_MAX_BYTES = 1024 * 1024;
export const PASSPORT_ATTACHMENT_MAX_BYTES = 10 * 1024 * 1024;

export function requiredText(t: TFunction) {
  return z.string().trim().min(1, t('create.errors.required'));
}

export function requiredSelect(t: TFunction) {
  return z.string().trim().min(1, t('create.errors.required'));
}

export function requiredDate(t: TFunction) {
  return z
    .string()
    .trim()
    .min(1, t('create.errors.required'))
    .refine((value) => isIsoDate(value), t('create.errors.invalidDate'));
}

export function requiredNumber(t: TFunction) {
  return z
    .string()
    .trim()
    .min(1, t('create.errors.required'))
    .transform(toWesternDigits)
    .refine((value) => Number.isFinite(Number(value)) && Number(value) >= 0, t('create.errors.invalidNumber'));
}

export const attachmentFields = {
  attachmentUri: z.string().optional(),
  attachmentType: z.string().optional(),
  attachmentSize: z.number().optional(),
};

type AttachmentValues = {
  attachmentUri?: string;
  attachmentType?: string;
  attachmentSize?: number;
};

export function refineAttachment(
  t: TFunction,
  values: AttachmentValues,
  ctx: z.RefinementCtx,
  options: { required: boolean; maxBytes: number; requiredMessage?: string },
) {
  if (!values.attachmentUri) {
    if (options.required) {
      ctx.addIssue({
        code: 'custom',
        path: ['attachmentUri'],
        message: options.requiredMessage ?? t('create.errors.required'),
      });
    }
    return;
  }

  if (values.attachmentType && !IMAGE_TYPES.has(values.attachmentType)) {
    ctx.addIssue({
      code: 'custom',
      path: ['attachmentUri'],
      message: t('create.errors.attachmentType'),
    });
  }

  if (values.attachmentSize && values.attachmentSize > options.maxBytes) {
    ctx.addIssue({
      code: 'custom',
      path: ['attachmentUri'],
      message: t('create.errors.attachmentTooLarge', {
        size: options.maxBytes / (1024 * 1024),
      }),
    });
  }
}
