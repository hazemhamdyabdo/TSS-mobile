import { useTranslation } from 'react-i18next';

export function isRtlLanguage(language?: string): boolean {
  return (language ?? 'ar').toLowerCase().startsWith('ar');
}

/** Physical start-edge alignment for the active language (ar → right, en → left). */
export function textStartAlign(language?: string): 'left' | 'right' {
  return isRtlLanguage(language) ? 'right' : 'left';
}

export function writingDirectionFor(language?: string): 'rtl' | 'ltr' {
  return isRtlLanguage(language) ? 'rtl' : 'ltr';
}

export function useTextStartAlign(): 'left' | 'right' {
  const { i18n } = useTranslation();
  return textStartAlign(i18n.language);
}

export function useWritingDirection(): 'rtl' | 'ltr' {
  const { i18n } = useTranslation();
  return writingDirectionFor(i18n.language);
}
