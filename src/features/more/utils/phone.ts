import { SA_DIAL_CODE } from '@/features/auth/constants/dummy';
import { onlyDigits } from '@/utils/digits';

export function toPhoneFieldValue(phone: string) {
  if (phone.startsWith('+')) {
    return phone;
  }

  const digits = onlyDigits(phone);
  return digits ? `+${SA_DIAL_CODE}${digits}` : '';
}

export function formatSaPhoneDisplay(value: string) {
  let digits = onlyDigits(value);
  if (digits.startsWith(SA_DIAL_CODE) && digits.length > 9) {
    digits = digits.slice(SA_DIAL_CODE.length);
  }

  if (digits.length === 9) {
    return `(+${SA_DIAL_CODE}) ${digits.slice(0, 2)} ${digits.slice(2, 6)} ${digits.slice(6)}`;
  }

  return digits ? `(+${SA_DIAL_CODE}) ${digits}` : '';
}
