'use client';

import { useTranslations } from 'next-intl';
import { Link } from '@/lib/i18n/navigation';

export function Footer() {
  const t = useTranslations('footer');

  return (
    <footer className="bg-gray-50 dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800 pb-20 md:pb-0">
      <div className="container mx-auto px-4 py-8">
        {/* Main footer content */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-8">
          {/* About section */}
          <div>
            <h3 className="font-semibold text-gray-900 dark:text-white mb-4">
              Hayyak Asia 2030
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Your guide to the 2030 Asian Games in Qatar.
            </p>
          </div>

          {/* Quick links */}
          <div>
            <h3 className="font-semibold text-gray-900 dark:text-white mb-4">
              Quick Links
            </h3>
            <ul className="space-y-2">
              <li>
                <FooterLink href="/events">Events</FooterLink>
              </li>
              <li>
                <FooterLink href="/venues">Venues</FooterLink>
              </li>
              <li>
                <FooterLink href="/tickets">Tickets</FooterLink>
              </li>
              <li>
                <FooterLink href="/transport">Transport</FooterLink>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="font-semibold text-gray-900 dark:text-white mb-4">
              Support
            </h3>
            <ul className="space-y-2">
              <li>
                <FooterLink href="/help">Help Center</FooterLink>
              </li>
              <li>
                <FooterLink href="/contact">{t('contact')}</FooterLink>
              </li>
              <li>
                <FooterLink href="/accessibility">{t('accessibility')}</FooterLink>
              </li>
              <li>
                <FooterLink href="/emergency">Emergency</FooterLink>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="font-semibold text-gray-900 dark:text-white mb-4">
              Legal
            </h3>
            <ul className="space-y-2">
              <li>
                <FooterLink href="/privacy">{t('privacy')}</FooterLink>
              </li>
              <li>
                <FooterLink href="/terms">{t('terms')}</FooterLink>
              </li>
              <li>
                <FooterLink href="/cookies">Cookies</FooterLink>
              </li>
            </ul>
          </div>
        </div>

        {/* Sustainability badge */}
        <div className="flex items-center justify-center gap-2 py-4 border-t border-b border-gray-200 dark:border-gray-700 mb-4">
          <span className="inline-flex items-center gap-2 text-sm text-green-600 dark:text-green-400">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"
              />
            </svg>
            Committed to sustainable games
          </span>
        </div>

        {/* Copyright */}
        <div className="text-center text-sm text-gray-500 dark:text-gray-400">
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
      className="text-sm text-gray-600 dark:text-gray-400 hover:text-primary-500 dark:hover:text-primary-400 transition-colors focus:outline-none focus-visible:underline"
    >
      {children}
    </Link>
  );
}
