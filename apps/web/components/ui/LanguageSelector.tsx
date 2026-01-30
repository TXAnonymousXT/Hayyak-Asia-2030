'use client';

import { useLocale, useTranslations } from 'next-intl';
import { useRouter, usePathname } from '@/lib/i18n/navigation';
import { useState, useRef, useEffect } from 'react';
import { clsx } from 'clsx';
import {
  locales,
  languageNames,
  languageNamesEnglish,
  isRTL,
  type Locale,
} from '@/lib/i18n/config';

export interface LanguageSelectorProps {
  /** Show only common languages initially */
  showCommon?: boolean;
  /** Common languages to prioritize */
  commonLanguages?: Locale[];
  /** Variant style */
  variant?: 'dropdown' | 'inline' | 'minimal';
}

/**
 * Language Selector component for switching between supported languages.
 *
 * Features:
 * - Keyboard accessible (arrow keys, Enter, Escape)
 * - Screen reader announcements
 * - RTL/LTR indicator
 * - Prioritizes common languages
 */
export function LanguageSelector({
  showCommon = false,
  commonLanguages = ['en', 'ar'],
  variant = 'dropdown',
}: LanguageSelectorProps) {
  const locale = useLocale() as Locale;
  const router = useRouter();
  const pathname = usePathname();
  const t = useTranslations('accessibility');

  const [isOpen, setIsOpen] = useState(false);
  const [focusedIndex, setFocusedIndex] = useState(-1);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  // Organize languages
  const displayedLocales = showCommon
    ? [...commonLanguages, ...locales.filter((l) => !commonLanguages.includes(l))]
    : [...locales];

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Handle keyboard navigation
  const handleKeyDown = (event: React.KeyboardEvent) => {
    switch (event.key) {
      case 'Escape':
        setIsOpen(false);
        buttonRef.current?.focus();
        break;
      case 'ArrowDown':
        event.preventDefault();
        if (!isOpen) {
          setIsOpen(true);
          setFocusedIndex(0);
        } else {
          setFocusedIndex((prev) =>
            prev < displayedLocales.length - 1 ? prev + 1 : 0
          );
        }
        break;
      case 'ArrowUp':
        event.preventDefault();
        if (isOpen) {
          setFocusedIndex((prev) =>
            prev > 0 ? prev - 1 : displayedLocales.length - 1
          );
        }
        break;
      case 'Enter':
      case ' ':
        event.preventDefault();
        if (isOpen && focusedIndex >= 0) {
          handleLanguageChange(displayedLocales[focusedIndex]);
        } else {
          setIsOpen(!isOpen);
        }
        break;
    }
  };

  const handleLanguageChange = (newLocale: Locale) => {
    router.replace(pathname, { locale: newLocale });
    setIsOpen(false);
    buttonRef.current?.focus();
  };

  if (variant === 'inline') {
    return (
      <div className="flex items-center gap-1 flex-wrap" role="radiogroup" aria-label={t('languageSelector')}>
        {commonLanguages.map((lang) => (
          <button
            key={lang}
            type="button"
            role="radio"
            aria-checked={locale === lang}
            onClick={() => handleLanguageChange(lang)}
            className={clsx(
              'px-2 py-1 text-sm rounded transition-colors',
              'focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-500',
              locale === lang
                ? 'bg-primary-500 text-white font-medium'
                : 'text-gray-600 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800'
            )}
          >
            {languageNames[lang]}
          </button>
        ))}
      </div>
    );
  }

  if (variant === 'minimal') {
    return (
      <select
        value={locale}
        onChange={(e) => handleLanguageChange(e.target.value as Locale)}
        className={clsx(
          'bg-transparent border border-gray-300 dark:border-gray-600 rounded-lg',
          'px-2 py-1 text-sm',
          'focus:outline-none focus:ring-2 focus:ring-primary-500'
        )}
        aria-label={t('languageSelector')}
      >
        {displayedLocales.map((lang) => (
          <option key={lang} value={lang}>
            {languageNames[lang]}
          </option>
        ))}
      </select>
    );
  }

  // Default: dropdown variant
  return (
    <div ref={dropdownRef} className="relative">
      <button
        ref={buttonRef}
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        onKeyDown={handleKeyDown}
        className={clsx(
          'inline-flex items-center gap-2 px-3 py-2 rounded-lg',
          'bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600',
          'text-sm font-medium text-gray-700 dark:text-gray-200',
          'hover:bg-gray-50 dark:hover:bg-gray-700',
          'focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-500',
          'transition-colors'
        )}
        aria-expanded={isOpen}
        aria-haspopup="listbox"
        aria-label={t('currentLanguage', { language: languageNamesEnglish[locale] })}
      >
        {/* Globe icon */}
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9"
          />
        </svg>

        <span>{languageNames[locale]}</span>

        {/* Chevron */}
        <svg
          className={clsx('w-4 h-4 transition-transform', isOpen && 'rotate-180')}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {/* Dropdown menu */}
      {isOpen && (
        <div
          className={clsx(
            'absolute z-50 mt-2 w-56 max-h-80 overflow-auto',
            'bg-white dark:bg-gray-800 rounded-lg shadow-lg',
            'border border-gray-200 dark:border-gray-700',
            'py-1',
            // Position based on RTL
            isRTL(locale) ? 'left-0' : 'right-0'
          )}
          role="listbox"
          aria-label={t('languageSelector')}
        >
          {showCommon && (
            <div className="px-3 py-1.5 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase">
              Common
            </div>
          )}

          {displayedLocales.map((lang, index) => {
            const isCommon = commonLanguages.includes(lang);
            const showDivider = showCommon && index === commonLanguages.length;

            return (
              <div key={lang}>
                {showDivider && (
                  <>
                    <div className="my-1 border-t border-gray-200 dark:border-gray-700" />
                    <div className="px-3 py-1.5 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase">
                      All Languages
                    </div>
                  </>
                )}
                <button
                  type="button"
                  role="option"
                  aria-selected={locale === lang}
                  onClick={() => handleLanguageChange(lang)}
                  onKeyDown={handleKeyDown}
                  className={clsx(
                    'w-full flex items-center justify-between px-3 py-2 text-sm',
                    'transition-colors',
                    locale === lang
                      ? 'bg-primary-50 dark:bg-primary-900/30 text-primary-700 dark:text-primary-300'
                      : 'text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700',
                    focusedIndex === index && 'ring-2 ring-inset ring-primary-500'
                  )}
                >
                  <span className="flex items-center gap-2">
                    <span className="font-medium">{languageNames[lang]}</span>
                    <span className="text-gray-500 dark:text-gray-400">
                      ({languageNamesEnglish[lang]})
                    </span>
                  </span>

                  {/* RTL indicator */}
                  {isRTL(lang) && (
                    <span className="text-xs text-gray-400 dark:text-gray-500">RTL</span>
                  )}

                  {/* Checkmark for selected */}
                  {locale === lang && (
                    <svg className="w-4 h-4 text-primary-500" fill="currentColor" viewBox="0 0 20 20">
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                  )}
                </button>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
