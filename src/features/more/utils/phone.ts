import { onlyDigits } from '@/utils/digits';

export function formatSaPhoneDisplay(national: string) {
  const digits = onlyDigits(national);
  if (digits.length === 9) {
    return `(+966) ${digits.slice(0, 2)} ${digits.slice(2, 6)} ${digits.slice(6)}`;
  }

  return digits ? `(+966) ${digits}` : '';
}
