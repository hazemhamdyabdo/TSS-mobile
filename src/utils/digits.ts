const ARABIC_INDIC = '٠١٢٣٤٥٦٧٨٩';

export function toWesternDigits(value: string) {
  return value.replace(/[٠-٩]/g, (digit) => String(ARABIC_INDIC.indexOf(digit)));
}

export function toArabicIndicDigits(value: string) {
  return value.replace(/\d/g, (digit) => ARABIC_INDIC[Number(digit)] ?? digit);
}

export function onlyDigits(value: string) {
  return toWesternDigits(value).replace(/\D/g, '');
}
