import type { TFunction } from 'i18next';
import { z } from 'zod';

import { OTP_LENGTH } from '../constants/auth';
import { onlyDigits } from '@/utils/digits';

export function createOtpSchema(t: TFunction) {
  return z.object({
    otp: z
      .string()
      .min(1, t('auth.errors.otpRequired'))
      .refine((value) => onlyDigits(value).length === OTP_LENGTH, t('auth.errors.otpInvalid')),
  });
}

export type OtpFormValues = z.infer<ReturnType<typeof createOtpSchema>>;
