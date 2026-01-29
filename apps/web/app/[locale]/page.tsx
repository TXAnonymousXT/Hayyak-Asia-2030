import { useTranslations } from 'next-intl';
import { setRequestLocale } from 'next-intl/server';
import { Link } from '@/lib/i18n/navigation';
import { Button } from '@/components/ui/Button';
import { Card, CardHeader, CardBody } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Input } from '@/components/ui/Input';
import { EmergencyButton } from '@/components/ui/EmergencyButton';

interface PageProps {
  params: Promise<{ locale: string }>;
}

export default async function HomePage({ params }: PageProps) {
  const { locale } = await params;
  setRequestLocale(locale);

  return <HomePageContent />;
}

function HomePageContent() {
  const t = useTranslations('home');
  const tCommon = useTranslations('common');
  const tNav = useTranslations('navigation');

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-primary-500 via-primary-600 to-accent-500 text-white">
        <div className="absolute inset-0 bg-black/20" />
        <div className="relative container mx-auto px-4 py-16 md:py-24">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
              {t('welcome')}
            </h1>
            <p className="text-xl md:text-2xl text-white/90 mb-2">
              {t('location')}
            </p>
            <p className="text-lg text-white/80 mb-8">
              {t('tagline')}
            </p>

            {/* Search bar */}
            <div className="max-w-xl mx-auto mb-8">
              <Input
                type="search"
                placeholder={tCommon('searchPlaceholder')}
                size="lg"
                className="bg-white/10 border-white/30 text-white placeholder:text-white/60 focus:bg-white/20"
                leftElement={
                  <svg className="w-5 h-5 text-white/60" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                }
                aria-label={tCommon('search')}
              />
            </div>

            {/* Quick access buttons */}
            <div className="flex flex-wrap justify-center gap-3">
              <QuickAccessButton href="/events" icon={<EventsIcon />}>
                {t('quickAccess.events')}
              </QuickAccessButton>
              <QuickAccessButton href="/venues" icon={<VenuesIcon />}>
                {t('quickAccess.venues')}
              </QuickAccessButton>
              <QuickAccessButton href="/tickets" icon={<TicketsIcon />}>
                {t('quickAccess.tickets')}
              </QuickAccessButton>
              <QuickAccessButton href="/transport" icon={<TransportIcon />}>
                {t('quickAccess.transport')}
              </QuickAccessButton>
            </div>
          </div>
        </div>
      </section>

      {/* Live Ticker */}
      <section className="bg-gray-900 text-white py-3 overflow-hidden">
        <div className="container mx-auto px-4">
          <div className="flex items-center gap-4">
            <Badge variant="live" className="shrink-0">
              {tCommon('live')}
            </Badge>
            <div className="flex-1 overflow-hidden">
              <p className="animate-marquee whitespace-nowrap">
                {t('liveTicker.noLiveEvents')} • Check back during the games for live updates
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Recommendations Section */}
      <section className="py-12 bg-gray-50 dark:bg-gray-900">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
              {t('recommendations.title')}
            </h2>
            <Link href="/events" className="text-primary-500 hover:text-primary-600 font-medium">
              {tCommon('viewAll')} →
            </Link>
          </div>

          {/* Placeholder cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[1, 2, 3, 4].map((i) => (
              <EventCard key={i} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* Quick Access Grid */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            <QuickAccessCard
              href="/culture"
              icon={<CultureIcon />}
              title={t('culturalExplorer.title')}
              description={t('culturalExplorer.subtitle')}
              color="bg-purple-500"
            />
            <QuickAccessCard
              href="/emergency"
              icon={<EmergencyIcon />}
              title={tNav('emergency')}
              description="Get help quickly"
              color="bg-red-500"
            />
            <QuickAccessCard
              href="/transport"
              icon={<TransportIcon />}
              title={t('ecoTransport.title')}
              description="Green transport options"
              color="bg-green-500"
            />
            <QuickAccessCard
              href="/venues"
              icon={<SeatIcon />}
              title="Seat Guide"
              description="Find your perfect seat"
              color="bg-blue-500"
            />
            <QuickAccessCard
              href="/sustainability"
              icon={<SustainabilityIcon />}
              title="Sustainability"
              description="Eco initiatives"
              color="bg-teal-500"
            />
            <QuickAccessCard
              href="/tickets"
              icon={<ScheduleIcon />}
              title="My Schedule"
              description="Your events"
              color="bg-orange-500"
            />
          </div>
        </div>
      </section>

      {/* Cultural Explorer Preview */}
      <section className="py-12 bg-gradient-to-r from-purple-600 to-indigo-600 text-white">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-2xl font-bold">{t('culturalExplorer.title')}</h2>
              <p className="text-white/80">{t('culturalExplorer.subtitle')}</p>
            </div>
            <Button variant="outline" className="border-white text-white hover:bg-white/10">
              {t('culturalExplorer.explore')}
            </Button>
          </div>

          {/* Country flags carousel placeholder */}
          <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide">
            {['🇯🇵', '🇰🇷', '🇨🇳', '🇮🇳', '🇹🇭', '🇸🇦', '🇮🇩', '🇻🇳', '🇵🇭', '🇲🇾'].map((flag, i) => (
              <div
                key={i}
                className="shrink-0 w-20 h-20 bg-white/10 rounded-xl flex items-center justify-center text-4xl hover:bg-white/20 cursor-pointer transition-colors"
              >
                {flag}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Eco Transport Widget */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <Card className="bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 border-green-200 dark:border-green-800">
            <CardHeader
              title={
                <span className="flex items-center gap-2">
                  <span className="text-green-600">🌱</span>
                  {t('ecoTransport.title')}
                </span>
              }
            />
            <CardBody>
              <div className="grid grid-cols-3 gap-4 mb-4">
                <TransportOption icon="🚇" label={t('ecoTransport.metro')} time="3 min" />
                <TransportOption icon="🚌" label={t('ecoTransport.bus')} time="8 min" />
                <TransportOption icon="🚲" label={t('ecoTransport.bike')} time="15 min" />
              </div>
              <p className="text-sm text-green-700 dark:text-green-400">
                {t('ecoTransport.carbonSaved', { amount: '2.5kg CO₂' })} 🌳
              </p>
            </CardBody>
          </Card>
        </div>
      </section>

      {/* Floating Emergency Button (desktop only) */}
      <div className="hidden md:block fixed bottom-6 end-6 z-50">
        <EmergencyButton onClick={() => window.location.href = 'tel:999'} />
      </div>
    </div>
  );
}

// Helper Components

function QuickAccessButton({
  href,
  icon,
  children,
}: {
  href: string;
  icon: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <Link
      href={href}
      className="inline-flex items-center gap-2 px-4 py-2 bg-white/20 hover:bg-white/30 rounded-full text-white font-medium transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-white"
    >
      {icon}
      {children}
    </Link>
  );
}

function EventCard({ index }: { index: number }) {
  const sports = ['⚽', '🏊', '🏸', '🏃'];
  const names = ['Football', 'Swimming', 'Badminton', 'Athletics'];

  return (
    <Card variant="interactive" as="article">
      <div className="aspect-video bg-gradient-to-br from-gray-200 to-gray-300 dark:from-gray-700 dark:to-gray-800 flex items-center justify-center text-4xl">
        {sports[index - 1]}
      </div>
      <div className="p-4">
        <Badge variant="primary" size="sm" className="mb-2">
          Upcoming
        </Badge>
        <h3 className="font-semibold text-gray-900 dark:text-white">
          {names[index - 1]} Event
        </h3>
        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
          Tomorrow, 14:00 • Lusail Stadium
        </p>
        <p className="text-sm font-medium text-primary-500 mt-2">
          From 50 QAR
        </p>
      </div>
    </Card>
  );
}

function QuickAccessCard({
  href,
  icon,
  title,
  description,
  color,
}: {
  href: string;
  icon: React.ReactNode;
  title: string;
  description: string;
  color: string;
}) {
  return (
    <Link
      href={href}
      className="group p-4 rounded-xl bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 hover:border-primary-300 hover:shadow-md transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-500"
    >
      <div className={`w-12 h-12 ${color} rounded-lg flex items-center justify-center text-white mb-3`}>
        {icon}
      </div>
      <h3 className="font-semibold text-gray-900 dark:text-white group-hover:text-primary-500 transition-colors">
        {title}
      </h3>
      <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
        {description}
      </p>
    </Link>
  );
}

function TransportOption({
  icon,
  label,
  time,
}: {
  icon: string;
  label: string;
  time: string;
}) {
  return (
    <div className="text-center p-3 bg-white dark:bg-gray-800 rounded-lg">
      <div className="text-2xl mb-1">{icon}</div>
      <div className="font-medium text-gray-900 dark:text-white text-sm">{label}</div>
      <div className="text-xs text-gray-500 dark:text-gray-400">{time}</div>
    </div>
  );
}

// Icons
function EventsIcon() {
  return (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
    </svg>
  );
}

function VenuesIcon() {
  return (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
    </svg>
  );
}

function TicketsIcon() {
  return (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 5v2m0 4v2m0 4v2M5 5a2 2 0 00-2 2v3a2 2 0 110 4v3a2 2 0 002 2h14a2 2 0 002-2v-3a2 2 0 110-4V7a2 2 0 00-2-2H5z" />
    </svg>
  );
}

function TransportIcon() {
  return (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
    </svg>
  );
}

function CultureIcon() {
  return (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
    </svg>
  );
}

function EmergencyIcon() {
  return (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
    </svg>
  );
}

function SeatIcon() {
  return (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
    </svg>
  );
}

function SustainabilityIcon() {
  return (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
    </svg>
  );
}

function ScheduleIcon() {
  return (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
    </svg>
  );
}
