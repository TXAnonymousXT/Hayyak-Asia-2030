import { useTranslations } from 'next-intl';
import { setRequestLocale } from 'next-intl/server';
import { Link } from '@/lib/i18n/navigation';
import { Button } from '@/components/ui/Button';
import { Card, CardHeader, CardBody } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Input } from '@/components/ui/Input';
import { Logo } from '@/components/ui/Logo';
import { FloatingEmergencyButton } from '@/components/features/FloatingEmergencyButton';

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
    <div className="flex flex-col min-h-screen">
      {/* Hero Section - Stunning Qatar-themed */}
      <section className="relative overflow-hidden">
        {/* Animated gradient background */}
        <div className="absolute inset-0 bg-gradient-qatar" />

        {/* Decorative patterns */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 start-0 w-96 h-96 bg-white/20 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
          <div className="absolute bottom-0 end-0 w-96 h-96 bg-qatar-gold/30 rounded-full blur-3xl translate-x-1/2 translate-y-1/2" />
          <div className="absolute top-1/2 start-1/2 w-64 h-64 bg-white/10 rounded-full blur-2xl -translate-x-1/2 -translate-y-1/2" />
        </div>

        {/* Qatar serrated pattern on side */}
        <div className="absolute start-0 top-0 bottom-0 w-8 md:w-16 overflow-hidden opacity-20">
          <svg className="h-full w-full" preserveAspectRatio="none" viewBox="0 0 40 800">
            <path
              d="M0,0 L40,30 L0,60 L40,90 L0,120 L40,150 L0,180 L40,210 L0,240 L40,270 L0,300 L40,330 L0,360 L40,390 L0,420 L40,450 L0,480 L40,510 L0,540 L40,570 L0,600 L40,630 L0,660 L40,690 L0,720 L40,750 L0,780 L40,810 L0,840"
              fill="white"
              stroke="none"
            />
          </svg>
        </div>

        <div className="relative container mx-auto px-4 py-20 md:py-32">
          <div className="max-w-4xl mx-auto text-center">
            {/* Countdown or Logo badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full text-white/90 text-sm mb-8 animate-fade-in-down">
              <span className="w-2 h-2 bg-qatar-gold rounded-full animate-pulse" />
              <span>The 2030 Asian Games</span>
              <span className="text-qatar-gold font-semibold">Coming Soon</span>
            </div>

            {/* Main heading with gradient */}
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6 animate-fade-in-up">
              <span className="text-white drop-shadow-lg">
                {t('welcome')}
              </span>
            </h1>

            {/* Location with gold accent */}
            <div className="flex items-center justify-center gap-3 mb-4 animate-fade-in">
              <div className="h-px w-12 bg-gradient-to-r from-transparent to-qatar-gold" />
              <p className="text-2xl md:text-3xl font-light text-qatar-gold">
                {t('location')}
              </p>
              <div className="h-px w-12 bg-gradient-to-l from-transparent to-qatar-gold" />
            </div>

            <p className="text-lg md:text-xl text-white/80 mb-10 max-w-2xl mx-auto animate-fade-in">
              {t('tagline')}
            </p>

            {/* Search bar with glass effect */}
            <div className="max-w-2xl mx-auto mb-10 animate-fade-in-up">
              <div className="relative group">
                <div className="absolute -inset-1 bg-gradient-to-r from-qatar-gold/50 via-white/30 to-qatar-gold/50 rounded-2xl blur opacity-30 group-hover:opacity-50 transition duration-500" />
                <div className="relative">
                  <Input
                    type="search"
                    placeholder={tCommon('searchPlaceholder')}
                    size="lg"
                    className="bg-white/10 backdrop-blur-md border-white/20 text-white placeholder:text-white/50 focus:bg-white/20 focus:border-qatar-gold/50 rounded-xl h-14 ps-14 text-lg"
                    aria-label={tCommon('search')}
                  />
                  <div className="absolute start-5 top-1/2 -translate-y-1/2">
                    <svg className="w-5 h-5 text-white/60" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick access buttons with hover effects */}
            <div className="flex flex-wrap justify-center gap-4 animate-fade-in-up">
              <QuickAccessButton href="/events" icon={<EventsIcon />} primary>
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

        {/* Wave separator */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full">
            <path
              d="M0 120L48 110C96 100 192 80 288 75C384 70 480 80 576 85C672 90 768 90 864 85C960 80 1056 70 1152 70C1248 70 1344 80 1392 85L1440 90V120H1392C1344 120 1248 120 1152 120C1056 120 960 120 864 120C768 120 672 120 576 120C480 120 384 120 288 120C192 120 96 120 48 120H0Z"
              className="fill-gray-50 dark:fill-gray-900"
            />
          </svg>
        </div>
      </section>

      {/* Live Ticker - Enhanced */}
      <section className="bg-gray-900 text-white py-4 overflow-hidden relative">
        <div className="absolute inset-0 bg-gradient-to-r from-qatar-maroon-dark/50 via-transparent to-qatar-maroon-dark/50" />
        <div className="container mx-auto px-4 relative">
          <div className="flex items-center gap-4">
            <Badge className="shrink-0 bg-red-500 text-white animate-pulse px-3 py-1">
              <span className="flex items-center gap-2">
                <span className="w-2 h-2 bg-white rounded-full" />
                {tCommon('live')}
              </span>
            </Badge>
            <div className="flex-1 overflow-hidden">
              <p className="whitespace-nowrap text-gray-300">
                {t('liveTicker.noLiveEvents')} • Check back during the games for live updates
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Recommendations Section - Enhanced cards */}
      <section className="py-16 bg-gray-50 dark:bg-gray-900">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                {t('recommendations.title')}
              </h2>
              <p className="text-gray-500 dark:text-gray-400">{t('recommendations.empty')}</p>
            </div>
            <Link
              href="/events"
              className="hidden md:inline-flex items-center gap-2 text-qatar-maroon dark:text-qatar-gold hover:gap-3 font-semibold transition-all"
            >
              {tCommon('viewAll')}
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </div>

          {/* Event cards with stunning styling */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[1, 2, 3, 4].map((i) => (
              <EventCard key={i} index={i} />
            ))}
          </div>

          <div className="mt-8 text-center md:hidden">
            <Link
              href="/events"
              className="inline-flex items-center gap-2 text-qatar-maroon dark:text-qatar-gold font-semibold"
            >
              {tCommon('viewAll')}
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </div>
        </div>
      </section>

      {/* Quick Access Grid - Premium cards */}
      <section className="py-16 bg-white dark:bg-gray-800">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2 text-center">
            {t('exploreGames')}
          </h2>
          <p className="text-gray-500 dark:text-gray-400 text-center mb-10">
            {t('everythingYouNeed')}
          </p>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
            <QuickAccessCard
              href="/culture"
              icon={<CultureIcon />}
              title={t('culturalExplorer.title')}
              description={t('culturalExplorer.subtitle')}
              gradient="from-qatar-maroon-dark to-qatar-maroon"
            />
            <QuickAccessCard
              href="/emergency"
              icon={<EmergencyIcon />}
              title={tNav('emergency')}
              description="Get help quickly"
              gradient="from-red-700 to-red-900"
            />
            <QuickAccessCard
              href="/transport"
              icon={<TransportIcon />}
              title={t('ecoTransport.title')}
              description="Green transport options"
              gradient="from-gray-700 to-gray-900"
            />
            <QuickAccessCard
              href="/venues"
              icon={<SeatIcon />}
              title="Seat Guide"
              description="Find your perfect seat"
              gradient="from-slate-700 to-slate-900"
            />
            <QuickAccessCard
              href="/sustainability"
              icon={<SustainabilityIcon />}
              title="Sustainability"
              description="Eco initiatives"
              gradient="from-gray-800 to-gray-950"
            />
            <QuickAccessCard
              href="/tickets"
              icon={<ScheduleIcon />}
              title="My Schedule"
              description="Your events"
              gradient="from-qatar-maroon to-qatar-maroon-dark"
            />
          </div>
        </div>
      </section>

      {/* Cultural Explorer Preview - Qatar-themed dark gradient */}
      <section className="py-16 relative overflow-hidden">
        {/* Background with dark Qatar gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-qatar-maroon-dark to-gray-900" />
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-0 end-0 w-96 h-96 bg-qatar-gold/40 rounded-full blur-3xl" />
          <div className="absolute bottom-0 start-0 w-96 h-96 bg-qatar-maroon/30 rounded-full blur-3xl" />
        </div>

        <div className="container mx-auto px-4 relative">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-8 gap-4">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-2">{t('culturalExplorer.title')}</h2>
              <p className="text-white/70 text-lg">{t('culturalExplorer.subtitle')}</p>
            </div>
            <Link href="/culture">
              <Button
                variant="primary"
                size="lg"
                className="bg-qatar-gold text-gray-900 hover:bg-qatar-gold-light font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
              >
                {t('culturalExplorer.explore')}
              </Button>
            </Link>
          </div>

          {/* Country flags carousel with glass cards */}
          <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide -mx-4 px-4">
            {[
              { flag: '🇯🇵', name: 'Japan' },
              { flag: '🇰🇷', name: 'Korea' },
              { flag: '🇨🇳', name: 'China' },
              { flag: '🇮🇳', name: 'India' },
              { flag: '🇹🇭', name: 'Thailand' },
              { flag: '🇶🇦', name: 'Qatar' },
              { flag: '🇸🇦', name: 'Saudi Arabia' },
              { flag: '🇮🇩', name: 'Indonesia' },
              { flag: '🇻🇳', name: 'Vietnam' },
              { flag: '🇵🇭', name: 'Philippines' },
            ].map((country, i) => (
              <Link
                key={i}
                href="/culture"
                className="shrink-0 group animate-in"
                style={{ animationDelay: `${i * 0.05}s` }}
              >
                <div className="w-24 h-28 bg-white/10 backdrop-blur-sm rounded-2xl flex flex-col items-center justify-center hover:bg-white/25 hover:scale-110 hover:-translate-y-2 cursor-pointer transition-all duration-300 ease-out border border-white/10 hover:border-white/30 hover:shadow-xl active:scale-100">
                  <span className="text-4xl mb-2 group-hover:scale-125 group-hover:rotate-6 transition-all duration-300">{country.flag}</span>
                  <span className="text-white/80 text-xs font-medium group-hover:text-white transition-colors duration-300">{country.name}</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Eco Transport Widget - Enhanced */}
      <section className="py-16 bg-gray-50 dark:bg-gray-900">
        <div className="container mx-auto px-4">
          <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-gray-800 via-gray-900 to-gray-950 p-8 md:p-12">
            {/* Decorative elements */}
            <div className="absolute top-0 end-0 w-64 h-64 bg-qatar-gold/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
            <div className="absolute bottom-0 start-0 w-48 h-48 bg-qatar-maroon/15 rounded-full blur-2xl translate-y-1/2 -translate-x-1/2" />

            <div className="relative">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6 mb-8">
                <div>
                  <div className="flex items-center gap-3 mb-3">
                    <span className="text-4xl">🌱</span>
                    <h2 className="text-2xl md:text-3xl font-bold text-white">
                      {t('ecoTransport.title')}
                    </h2>
                  </div>
                  <p className="text-white/80">Choose green, travel clean</p>
                </div>
                <div className="flex items-center gap-3 px-5 py-3 bg-qatar-gold/10 border border-qatar-gold/20 backdrop-blur-sm rounded-xl">
                  <span className="text-2xl">🌳</span>
                  <div>
                    <p className="text-gray-400 text-sm">Carbon saved today</p>
                    <p className="text-qatar-gold font-bold text-xl">2.5 kg CO₂</p>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <TransportOption icon="🚇" label={t('ecoTransport.metro')} time="3 min" eco="A+" />
                <TransportOption icon="🚌" label={t('ecoTransport.bus')} time="8 min" eco="A" />
                <TransportOption icon="🚲" label={t('ecoTransport.bike')} time="15 min" eco="A+" />
                <TransportOption icon="🚶" label="Walk" time="25 min" eco="A+" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white dark:bg-gray-800 overflow-hidden">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { number: '45', label: 'Sports', suffix: '+', icon: '🏆' },
              { number: '12', label: 'Venues', suffix: '', icon: '🏟️' },
              { number: '46', label: 'Countries', suffix: '', icon: '🌏' },
              { number: '10K', label: 'Athletes', suffix: '+', icon: '🏃' },
            ].map((stat, i) => (
              <div 
                key={i} 
                className="text-center group animate-in cursor-default" 
                style={{ animationDelay: `${i * 0.15}s` }}
              >
                <div className="relative inline-block mb-3">
                  <span className="text-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 absolute -top-2 -right-2">{stat.icon}</span>
                  <div className="text-4xl md:text-5xl lg:text-6xl font-bold bg-gradient-to-r from-qatar-maroon to-qatar-maroon-light bg-clip-text text-transparent group-hover:scale-110 transition-transform duration-500">
                    {stat.number}{stat.suffix}
                  </div>
                </div>
                <div className="text-gray-500 dark:text-gray-400 font-medium group-hover:text-qatar-maroon dark:group-hover:text-qatar-gold transition-colors duration-300">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Floating Emergency Button (desktop only) */}
      <FloatingEmergencyButton />
    </div>
  );
}

// Enhanced Helper Components

function QuickAccessButton({
  href,
  icon,
  children,
  primary = false,
}: {
  href: string;
  icon: React.ReactNode;
  children: React.ReactNode;
  primary?: boolean;
}) {
  return (
    <Link
      href={href}
      className={`
        inline-flex items-center gap-2 px-6 py-3 rounded-xl font-semibold transition-all duration-300
        focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-qatar-maroon
        ${primary
          ? 'bg-qatar-gold text-qatar-maroon-dark hover:bg-qatar-gold-light hover:shadow-lg hover:shadow-qatar-gold/30 hover:-translate-y-0.5'
          : 'bg-white/10 backdrop-blur-sm text-white border border-white/20 hover:bg-white/20 hover:border-white/40'
        }
      `}
    >
      {icon}
      {children}
    </Link>
  );
}

function EventCard({ index }: { index: number }) {
  const events = [
    { sport: '⚽', name: 'Football Finals', venue: 'Lusail Stadium', price: '150', badge: 'Final', badgeColor: 'bg-qatar-gold text-qatar-maroon-dark' },
    { sport: '🏊', name: 'Swimming 100m', venue: 'Aquatics Centre', price: '80', badge: 'Medal Event', badgeColor: 'bg-amber-600 text-white' },
    { sport: '🏸', name: 'Badminton Mixed', venue: 'Indoor Arena', price: '50', badge: 'Semi-Final', badgeColor: 'bg-slate-600 text-white' },
    { sport: '🏃', name: 'Marathon', venue: 'Doha Corniche', price: '30', badge: 'Popular', badgeColor: 'bg-gray-700 text-white' },
  ];

  const event = events[index - 1];

  return (
    <Link href="/events" className="group block animate-in" style={{ animationDelay: `${index * 0.1}s` }}>
      <div className="card-glow">
        <Card className="overflow-hidden border-0 shadow-lg hover:shadow-2xl transition-all duration-500 ease-out hover:-translate-y-3 hover:scale-[1.02] bg-white dark:bg-gray-800 active:scale-[0.98]">
          {/* Image area with gradient overlay */}
          <div className="relative aspect-[4/3] bg-gradient-to-br from-qatar-maroon via-qatar-maroon to-qatar-maroon-dark overflow-hidden">
            {/* Animated background pattern */}
            <div className="absolute inset-0 opacity-20">
              <div className="absolute -top-10 -right-10 w-40 h-40 bg-qatar-gold/30 rounded-full blur-2xl group-hover:scale-150 transition-transform duration-700" />
              <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-white/20 rounded-full blur-2xl group-hover:scale-150 transition-transform duration-700 delay-100" />
            </div>
            
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-6xl group-hover:scale-125 group-hover:rotate-6 transition-all duration-500 ease-out drop-shadow-lg">{event.sport}</span>
            </div>
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

            {/* Badge with pulse animation */}
            <div className="absolute top-3 end-3">
              <span className={`px-3 py-1.5 rounded-full text-xs font-bold shadow-lg ${event.badgeColor} group-hover:scale-110 transition-transform duration-300`}>
                {event.badge}
              </span>
            </div>

            {/* Event info overlay with slide up effect */}
            <div className="absolute bottom-0 inset-x-0 p-4 translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
              <h3 className="font-bold text-white text-lg mb-1 group-hover:text-qatar-gold transition-colors duration-300">
                {event.name}
              </h3>
              <p className="text-white/80 text-sm flex items-center gap-1.5 opacity-80 group-hover:opacity-100 transition-opacity duration-300">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                </svg>
                {event.venue}
              </p>
            </div>
          </div>

          {/* Card footer with enhanced interactions */}
          <div className="p-4 flex items-center justify-between bg-white dark:bg-gray-800">
            <div>
              <p className="text-gray-500 dark:text-gray-400 text-sm">Tomorrow, 14:00</p>
              <p className="text-qatar-maroon dark:text-qatar-gold font-bold text-lg group-hover:scale-105 transition-transform duration-300 origin-left">
                From {event.price} QAR
              </p>
            </div>
            <div className="w-11 h-11 rounded-full bg-qatar-maroon/10 dark:bg-qatar-gold/10 flex items-center justify-center group-hover:bg-qatar-maroon group-hover:text-white dark:group-hover:bg-qatar-gold dark:group-hover:text-qatar-maroon-dark transition-all duration-300 group-hover:scale-110 group-hover:shadow-lg">
              <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </div>
          </div>
        </Card>
      </div>
    </Link>
  );
}

function QuickAccessCard({
  href,
  icon,
  title,
  description,
  gradient,
}: {
  href: string;
  icon: React.ReactNode;
  title: string;
  description: string;
  gradient: string;
}) {
  return (
    <Link
      href={href}
      className="group relative overflow-hidden p-5 md:p-6 rounded-2xl bg-white dark:bg-gray-700 border border-gray-100 dark:border-gray-600 hover:border-transparent hover:shadow-2xl transition-all duration-500 ease-out hover:-translate-y-2 hover:scale-[1.02] active:scale-[0.98]"
    >
      {/* Gradient overlay on hover with smooth expansion */}
      <div className={`absolute inset-0 bg-gradient-to-br ${gradient} opacity-0 group-hover:opacity-100 transition-all duration-500 ease-out scale-95 group-hover:scale-100`} />
      
      {/* Animated glow behind */}
      <div className={`absolute -inset-2 bg-gradient-to-br ${gradient} opacity-0 group-hover:opacity-30 blur-xl transition-opacity duration-500`} />

      <div className="relative">
        <div className={`w-14 h-14 bg-gradient-to-br ${gradient} rounded-xl flex items-center justify-center text-white mb-4 group-hover:scale-110 group-hover:rotate-3 group-hover:shadow-xl transition-all duration-500 ease-out`}>
          <span className="group-hover:scale-110 transition-transform duration-300">{icon}</span>
        </div>
        <h3 className="font-bold text-gray-900 dark:text-white group-hover:text-white transition-colors duration-300 text-lg mb-1">
          {title}
        </h3>
        <p className="text-sm text-gray-500 dark:text-gray-400 group-hover:text-white/90 transition-colors duration-300">
          {description}
        </p>
        
        {/* Arrow indicator that appears on hover */}
        <div className="absolute bottom-5 right-5 w-8 h-8 rounded-full bg-white/20 flex items-center justify-center opacity-0 group-hover:opacity-100 translate-x-2 group-hover:translate-x-0 transition-all duration-300">
          <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </div>
      </div>
    </Link>
  );
}

function TransportOption({
  icon,
  label,
  time,
  eco,
}: {
  icon: string;
  label: string;
  time: string;
  eco: string;
}) {
  return (
    <div className="bg-white/20 backdrop-blur-sm rounded-xl p-4 hover:bg-white/30 transition-all duration-300 cursor-pointer group hover:-translate-y-1 hover:shadow-lg active:scale-[0.97]">
      <div className="flex items-start justify-between mb-2">
        <span className="text-3xl group-hover:scale-125 group-hover:rotate-12 transition-all duration-300">{icon}</span>
        <span className="text-xs font-bold bg-white/30 px-2.5 py-1 rounded-full text-white group-hover:bg-white/50 group-hover:scale-105 transition-all duration-300">
          {eco}
        </span>
      </div>
      <div className="font-semibold text-white group-hover:translate-x-0.5 transition-transform duration-300">{label}</div>
      <div className="text-sm text-white/70 group-hover:text-white/90 transition-colors duration-300">{time} away</div>
    </div>
  );
}

// Icons with consistent styling
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
