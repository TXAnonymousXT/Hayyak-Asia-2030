/**
 * Internationalization Configuration
 *
 * Supports 20+ Asian languages with RTL handling for Arabic, Farsi, Urdu, and Hebrew.
 * Uses next-intl for routing and translations.
 */

export const locales = [
  'en',    // English (default)
  'ar',    // Arabic (RTL)
  'zh',    // Chinese (Simplified)
  'ja',    // Japanese
  'ko',    // Korean
  'hi',    // Hindi
  'th',    // Thai
  'vi',    // Vietnamese
  'id',    // Indonesian
  'ms',    // Malay
  'fa',    // Farsi/Persian (RTL)
  'ur',    // Urdu (RTL)
  'bn',    // Bengali
  'ta',    // Tamil
  'tl',    // Filipino/Tagalog
  'my',    // Myanmar/Burmese
  'km',    // Khmer
  'lo',    // Lao
  'ne',    // Nepali
  'si',    // Sinhala
] as const;

export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = 'en';

// RTL languages
export const rtlLocales: Locale[] = ['ar', 'fa', 'ur'];

// Language display names (in their native script)
export const languageNames: Record<Locale, string> = {
  en: 'English',
  ar: 'العربية',
  zh: '中文',
  ja: '日本語',
  ko: '한국어',
  hi: 'हिन्दी',
  th: 'ไทย',
  vi: 'Tiếng Việt',
  id: 'Bahasa Indonesia',
  ms: 'Bahasa Melayu',
  fa: 'فارسی',
  ur: 'اردو',
  bn: 'বাংলা',
  ta: 'தமிழ்',
  tl: 'Filipino',
  my: 'မြန်မာ',
  km: 'ភាសាខ្មែរ',
  lo: 'ລາວ',
  ne: 'नेपाली',
  si: 'සිංහල',
};

// Language display names in English (for accessibility)
export const languageNamesEnglish: Record<Locale, string> = {
  en: 'English',
  ar: 'Arabic',
  zh: 'Chinese',
  ja: 'Japanese',
  ko: 'Korean',
  hi: 'Hindi',
  th: 'Thai',
  vi: 'Vietnamese',
  id: 'Indonesian',
  ms: 'Malay',
  fa: 'Persian',
  ur: 'Urdu',
  bn: 'Bengali',
  ta: 'Tamil',
  tl: 'Filipino',
  my: 'Burmese',
  km: 'Khmer',
  lo: 'Lao',
  ne: 'Nepali',
  si: 'Sinhala',
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
