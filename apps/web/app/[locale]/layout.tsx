import { NextIntlClientProvider } from 'next-intl';
import { getMessages, setRequestLocale } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { Inter, Noto_Sans_Arabic } from 'next/font/google';

import { locales, isValidLocale, getDirection, type Locale } from '@/lib/i18n/config';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { BottomNavigation } from '@/components/layout/BottomNavigation';

import '../globals.css';

// Load fonts
const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

const notoSansArabic = Noto_Sans_Arabic({
  subsets: ['arabic'],
  variable: '--font-noto-sans-arabic',
  display: 'swap',
});

// Generate static params for all locales
export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

// Metadata
export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  // Get messages for metadata
  const messages = await getMessages({ locale });
  const metadata = (messages as any).metadata || {};

  return {
    title: {
      default: metadata.title || 'Hayyak Asia 2030',
      template: '%s | Hayyak Asia 2030',
    },
    description: metadata.description || 'Your guide to the 2030 Asian Games in Qatar',
    keywords: [
      'Asian Games',
      '2030',
      'Qatar',
      'Doha',
      'Sports',
      'Events',
      'Tickets',
    ],
    authors: [{ name: 'Hayyak Asia 2030 Team' }],
    openGraph: {
      title: metadata.title || 'Hayyak Asia 2030',
      description: metadata.description,
      type: 'website',
      locale: locale,
      siteName: 'Hayyak Asia 2030',
    },
    twitter: {
      card: 'summary_large_image',
      title: metadata.title || 'Hayyak Asia 2030',
      description: metadata.description,
    },
    manifest: '/manifest.json',
    icons: {
      icon: '/favicon.ico',
      apple: '/icons/apple-touch-icon.png',
    },
  };
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  // Validate locale
  if (!isValidLocale(locale)) {
    notFound();
  }

  // Enable static rendering
  setRequestLocale(locale);

  // Get messages for the locale
  const messages = await getMessages();

  // Get text direction
  const dir = getDirection(locale as Locale);

  return (
    <html
      lang={locale}
      dir={dir}
      className={`${inter.variable} ${notoSansArabic.variable}`}
      suppressHydrationWarning
    >
      <head>
        {/* Theme color for browser chrome */}
        <meta name="theme-color" content="#F97316" />
        {/* Viewport for mobile */}
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, viewport-fit=cover"
        />
      </head>
      <body
        className={`
          min-h-screen bg-white dark:bg-gray-950
          text-gray-900 dark:text-gray-100
          antialiased
          ${dir === 'rtl' ? 'font-arabic' : 'font-sans'}
        `}
      >
        <NextIntlClientProvider messages={messages}>
          {/* Accessibility: Route announcer for screen readers */}
          <div
            role="status"
            aria-live="polite"
            aria-atomic="true"
            className="sr-only"
            id="route-announcer"
          />

          {/* App shell */}
          <div className="flex flex-col min-h-screen">
            <Header />

            <main id="main-content" className="flex-1">
              {children}
            </main>

            <Footer />

            {/* Mobile bottom navigation */}
            <BottomNavigation />
          </div>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
