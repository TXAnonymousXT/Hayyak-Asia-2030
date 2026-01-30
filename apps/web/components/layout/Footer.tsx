'use client';

import { useTranslations } from 'next-intl';
import { Link } from '@/lib/i18n/navigation';

export function Footer() {
  const t = useTranslations('footer');
  const tNav = useTranslations('navigation');
  const tSustainability = useTranslations('sustainability');

  return (
    <footer className="bg-gray-900 border-t border-gray-800 pb-20 md:pb-0">
      <div className="container mx-auto px-4 py-8">
        {/* Main footer content */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-8">
          {/* About section */}
          <div>
            <h3 className="font-semibold text-white mb-4">
              Hayyak Asia 2030
            </h3>
            <p className="text-sm text-gray-400">
              {t('about')}
            </p>
          </div>

          {/* Quick links */}
          <div>
            <h3 className="font-semibold text-white mb-4">
              {t('quickLinks')}
            </h3>
            <ul className="space-y-2">
              <li>
                <FooterLink href="/events">{tNav('events')}</FooterLink>
              </li>
              <li>
                <FooterLink href="/venues">{tNav('venues')}</FooterLink>
              </li>
              <li>
                <FooterLink href="/tickets">{tNav('tickets')}</FooterLink>
              </li>
              <li>
                <FooterLink href="/transport">{tNav('transport')}</FooterLink>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="font-semibold text-white mb-4">
              {t('support')}
            </h3>
            <ul className="space-y-2">
              <li>
                <FooterLink href="/help">{tNav('help')}</FooterLink>
              </li>
              <li>
                <FooterLink href="/contact">{t('contact')}</FooterLink>
              </li>
              <li>
                <FooterLink href="/accessibility">{t('accessibility')}</FooterLink>
              </li>
              <li>
                <FooterLink href="/emergency">{tNav('emergency')}</FooterLink>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="font-semibold text-white mb-4">
              {t('legal')}
            </h3>
            <ul className="space-y-2">
              <li>
                <FooterLink href="/privacy">{t('privacy')}</FooterLink>
              </li>
              <li>
                <FooterLink href="/terms">{t('terms')}</FooterLink>
              </li>
              <li>
                <FooterLink href="/cookies">{t('cookies')}</FooterLink>
              </li>
            </ul>
          </div>
        </div>

        {/* Sustainability badge */}
        <div className="flex items-center justify-center gap-2 py-4 border-t border-b border-gray-700 mb-4">
          <span className="inline-flex items-center gap-2 text-sm text-qatar-gold">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"
              />
            </svg>
            {tSustainability('subtitle')}
          </span>
        </div>

        {/* Copyright */}
        <div className="text-center text-sm text-gray-400">
          <p>{t('copyright')}</p>
        </div>
      </div>
    </footer>
  );
}

function FooterLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <Link
      href={href}
      className="text-sm text-gray-400 hover:text-qatar-gold transition-colors focus:outline-none focus-visible:underline"
    >
      {children}
    </Link>
  );
}
