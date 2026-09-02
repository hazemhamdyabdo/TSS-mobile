import { isValidPhoneNumber } from 'libphonenumber-js';
import type { TFunction } from 'i18next';
import { z } from 'zod';

import { SA_DIAL_CODE } from '../constants/dummy';
import { onlyDigits } from '@/utils/digits';

export function createLoginSchema(t: TFunction) {
  return z.object({
    phone: z
      .string()
      .min(1, t('auth.errors.phoneRequired'))
      .refine((value) => isValidSaPhone(value), t('auth.errors.phoneInvalid')),
  });
}

export type LoginFormValues = z.infer<ReturnType<typeof createLoginSchema>>;

export function isValidSaPhone(value: string) {
  const digits = onlyDigits(value);
  if (!digits) {
    return false;
  }

  if (digits.startsWith(SA_DIAL_CODE) && digits.length > 9) {
    return isValidPhoneNumber(`+${digits}`);
  }

  return (
    isValidPhoneNumber(digits, 'SA') ||
    isValidPhoneNumber(`+${SA_DIAL_CODE}${digits}`, 'SA')
  );
}

export function toNationalSaPhone(value: string) {
  const digits = onlyDigits(value);
  if (digits.startsWith(SA_DIAL_CODE) && digits.length > 9) {
    return digits.slice(SA_DIAL_CODE.length);
  }

  if (digits.startsWith('0')) {
    return digits.slice(1);
  }

  return digits;
}
