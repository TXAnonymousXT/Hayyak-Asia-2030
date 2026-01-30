'use client';

import { useTranslations } from 'next-intl';
import { Link } from '@/lib/i18n/navigation';
import { LanguageSelector } from '@/components/ui/LanguageSelector';
import { Logo } from '@/components/ui/Logo';
import { Button } from '@/components/ui/Button';
import { useState } from 'react';
import { clsx } from 'clsx';

export function Header() {
  const t = useTranslations('navigation');
  const tA11y = useTranslations('accessibility');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 w-full bg-white/95 dark:bg-gray-900/95 backdrop-blur supports-[backdrop-filter]:bg-white/80 border-b border-gray-200 dark:border-gray-800">
      {/* Skip links for accessibility */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-2 focus:start-2 focus:z-50 focus:px-4 focus:py-2 focus:bg-qatar-maroon focus:text-white focus:rounded-lg"
      >
        {tA11y('skipToContent')}
      </a>
      <a
        href="#main-navigation"
        className="sr-only focus:not-sr-only focus:absolute focus:top-2 focus:start-40 focus:z-50 focus:px-4 focus:py-2 focus:bg-qatar-maroon focus:text-white focus:rounded-lg"
      >
        {tA11y('skipToNavigation')}
      </a>

      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link
            href="/"
            className="flex items-center gap-2 focus:outline-none focus-visible:ring-2 focus-visible:ring-qatar-maroon rounded-lg"
          >
            <Logo size="sm" />
          </Link>

          {/* Desktop Navigation */}
          <nav
            id="main-navigation"
            className="hidden md:flex items-center gap-1"
            aria-label="Main navigation"
          >
            <NavLink href="/events">{t('events')}</NavLink>
            <NavLink href="/venues">{t('venues')}</NavLink>
            <NavLink href="/tickets">{t('tickets')}</NavLink>
            <NavLink href="/transport">{t('transport')}</NavLink>
            <NavLink href="/culture">{t('culture')}</NavLink>
          </nav>

          {/* Right side actions */}
          <div className="flex items-center gap-2">
            {/* Language selector */}
            <div className="hidden sm:block">
              <LanguageSelector variant="dropdown" />
            </div>

            {/* Accessibility button */}
            <Button
              variant="ghost"
              size="icon"
              aria-label={tA11y('highContrast')}
              className="hidden sm:flex hover:bg-qatar-maroon/10 hover:text-qatar-maroon"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                />
              </svg>
            </Button>

            {/* Profile/Sign in */}
            <Link href="/profile">
              <Button
                variant="ghost"
                size="icon"
                aria-label={t('profile')}
                className="hover:bg-qatar-maroon/10 hover:text-qatar-maroon"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                  />
                </svg>
              </Button>
            </Link>

            {/* Mobile menu button */}
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-expanded={isMobileMenuOpen}
              aria-controls="mobile-menu"
              aria-label={isMobileMenuOpen ? tA11y('closeMenu') : tA11y('openMenu')}
            >
              {isMobileMenuOpen ? (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              ) : (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              )}
            </Button>
          </div>
        </div>

        {/* Mobile menu */}
        {isMobileMenuOpen && (
          <nav
            id="mobile-menu"
            className="md:hidden py-4 border-t border-gray-200 dark:border-gray-700 animate-fade-in"
            aria-label="Mobile navigation"
          >
            <div className="flex flex-col gap-1">
              <MobileNavLink href="/events" onClick={() => setIsMobileMenuOpen(false)}>
                <span className="text-lg me-3">📅</span>
                {t('events')}
              </MobileNavLink>
              <MobileNavLink href="/venues" onClick={() => setIsMobileMenuOpen(false)}>
                <span className="text-lg me-3">🏟️</span>
                {t('venues')}
              </MobileNavLink>
              <MobileNavLink href="/tickets" onClick={() => setIsMobileMenuOpen(false)}>
                <span className="text-lg me-3">🎫</span>
                {t('tickets')}
              </MobileNavLink>
              <MobileNavLink href="/transport" onClick={() => setIsMobileMenuOpen(false)}>
                <span className="text-lg me-3">🚇</span>
                {t('transport')}
              </MobileNavLink>
              <MobileNavLink href="/culture" onClick={() => setIsMobileMenuOpen(false)}>
                <span className="text-lg me-3">🌏</span>
                {t('culture')}
              </MobileNavLink>
              <MobileNavLink href="/emergency" onClick={() => setIsMobileMenuOpen(false)}>
                <span className="text-lg me-3">🚨</span>
                {t('emergency')}
              </MobileNavLink>
            </div>
            <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
              <LanguageSelector variant="minimal" />
            </div>
          </nav>
        )}
      </div>
    </header>
  );
}

// Navigation link component with Qatar styling
function NavLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <Link
      href={href}
      className={clsx(
        'px-4 py-2 text-sm font-medium rounded-lg',
        'text-gray-700 dark:text-gray-200',
        'hover:bg-qatar-maroon/10 hover:text-qatar-maroon dark:hover:bg-qatar-gold/10 dark:hover:text-qatar-gold',
        'focus:outline-none focus-visible:ring-2 focus-visible:ring-qatar-maroon',
        'transition-all duration-200'
      )}
    >
      {children}
    </Link>
  );
}

// Mobile navigation link with enhanced styling
function MobileNavLink({
  href,
  onClick,
  children,
}: {
  href: string;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <Link
      href={href}
      onClick={onClick}
      className={clsx(
        'flex items-center px-4 py-3 text-base font-medium rounded-xl',
        'text-gray-700 dark:text-gray-200',
        'hover:bg-qatar-maroon/10 hover:text-qatar-maroon dark:hover:bg-qatar-gold/10 dark:hover:text-qatar-gold',
        'focus:outline-none focus-visible:ring-2 focus-visible:ring-qatar-maroon',
        'transition-all duration-200'
      )}
    >
      {children}
    </Link>
  );
}
