/**
 * Internationalization Configuration
 *
 * Supports multiple Asian languages with RTL handling for Arabic, Farsi, Urdu, and Hebrew.
 * Uses next-intl for routing and translations.
 *
 * Currently supported: English and Arabic
 * More languages can be added by creating translation files in /messages
 */

export const locales = [
  'en',    // English (default)
  'ar',    // Arabic (RTL)
] as const;

export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = 'en';

// RTL languages
export const rtlLocales: Locale[] = ['ar'];

// Language display names (in their native script)
export const languageNames: Record<Locale, string> = {
  en: 'English',
  ar: 'العربية',
};

// Language display names in English (for accessibility)
export const languageNamesEnglish: Record<Locale, string> = {
  en: 'English',
  ar: 'Arabic',
};

// Helper functions
export function isRTL(locale: Locale): boolean {
  return rtlLocales.includes(locale);
}

export function getDirection(locale: Locale): 'ltr' | 'rtl' {
  return isRTL(locale) ? 'rtl' : 'ltr';
}

export function isValidLocale(locale: string): locale is Locale {
  return locales.includes(locale as Locale);
}
