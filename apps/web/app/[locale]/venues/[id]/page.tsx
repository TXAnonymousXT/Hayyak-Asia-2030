'use client';

import { useParams } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { Link } from '@/lib/i18n/navigation';
import { Card, CardBody } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { getVenueById, venues } from '@/lib/data/venues';
import { getEventsByVenue } from '@/lib/data/events';

export default function VenueDetailPage() {
  const params = useParams();
  const t = useTranslations('venues');
  const tCommon = useTranslations('common');
  const tNav = useTranslations('navigation');
  const tEvents = useTranslations('events');
  const venue = getVenueById(params.id as string);
  const venueEvents = venue ? getEventsByVenue(venue.id) : [];

  if (!venue) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Card className="max-w-md w-full mx-4">
          <CardBody>
            <div className="text-center py-8">
              <span className="text-6xl mb-4 block">🏟️</span>
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                {t('title')}
              </h1>
              <p className="text-gray-500 dark:text-gray-400 mb-6">
                {t('title')}
              </p>
              <Link href="/venues">
                <Button variant="primary">{tNav('venues')}</Button>
              </Link>
            </div>
          </CardBody>
        </Card>
      </div>
    );
  }

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-US', {
      weekday: 'short',
      month: 'short',
      day: 'numeric',
    });
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'final': return 'gold';
      case 'semifinal': return 'qatar';
      case 'quarterfinal': return 'primary';
      default: return 'default';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-br from-qatar-maroon via-qatar-maroon to-qatar-maroon-dark text-white">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-qatar-gold rounded-full blur-3xl" />
        </div>

        <div className="container mx-auto px-4 py-12 relative">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-sm text-white/70 mb-6">
            <Link href="/" className="hover:text-white">{tNav('home')}</Link>
            <span>/</span>
            <Link href="/venues" className="hover:text-white">{tNav('venues')}</Link>
            <span>/</span>
            <span className="text-white">{venue.name}</span>
          </nav>

          <div className="flex flex-col lg:flex-row gap-8 items-start">
            {/* Venue Icon */}
            <div className="w-32 h-32 bg-white/10 backdrop-blur-sm rounded-2xl flex items-center justify-center flex-shrink-0">
              <span className="text-7xl">{venue.typeEmoji}</span>
            </div>

            {/* Venue Info */}
            <div className="flex-1">
              <Badge variant="glass" size="lg" className="mb-3">
                {venue.type}
              </Badge>
              <h1 className="text-4xl md:text-5xl font-bold mb-4">{venue.name}</h1>
              <p className="text-lg text-white/80 mb-6 max-w-2xl">
                {venue.description}
              </p>

              {/* Quick Stats */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4">
                  <div className="text-white/60 text-sm mb-1">👥 {t('totalCapacity')}</div>
                  <div className="font-bold text-xl">{venue.capacity.toLocaleString()}</div>
                </div>
                <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4">
                  <div className="text-white/60 text-sm mb-1">🏆 {tNav('events')}</div>
                  <div className="font-bold text-xl">{venueEvents.length}</div>
                </div>
                <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4">
                  <div className="text-white/60 text-sm mb-1">⚽ {t('sportsHosted')}</div>
                  <div className="font-bold text-xl">{venue.sports.length}</div>
                </div>
                <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4">
                  <div className="text-white/60 text-sm mb-1">📍 {t('detail.location')}</div>
                  <div className="font-semibold text-sm">Doha, Qatar</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Events at this Venue */}
            <Card>
              <CardBody>
                <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
                  📅 {t('detail.upcomingEvents')} ({venueEvents.length})
                </h2>
                {venueEvents.length > 0 ? (
                  <div className="space-y-3">
                    {venueEvents.map((event) => (
                      <Link key={event.id} href={`/events/${event.id}`}>
                        <div className="flex items-center gap-4 p-4 bg-gray-50 dark:bg-gray-800 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
                          <div className="w-14 h-14 bg-gradient-to-br from-qatar-maroon to-qatar-maroon-dark rounded-xl flex items-center justify-center flex-shrink-0">
                            <span className="text-2xl">{event.sportEmoji}</span>
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2 mb-1">
                              <Badge variant={getCategoryColor(event.category) as any} size="sm">
                                {tEvents(`types.${event.category}`)}
                              </Badge>
                              {event.isFeatured && (
                                <Badge variant="gold" size="sm">⭐ Featured</Badge>
                              )}
                            </div>
                            <h3 className="font-semibold text-gray-900 dark:text-white truncate">
                              {event.name}
                            </h3>
                            <p className="text-sm text-gray-500 dark:text-gray-400">
                              {formatDate(event.date)} • {event.time}
                            </p>
                          </div>
                          <div className="text-right flex-shrink-0">
                            <p className="font-bold text-qatar-maroon dark:text-qatar-gold">
                              {tCommon('from')} {event.price.min} QAR
                            </p>
                            <p className="text-xs text-gray-500 dark:text-gray-400">
                              {event.seatsAvailable.toLocaleString()} {tEvents('detail.seatsAvailable')}
                            </p>
                          </div>
                        </div>
                      </Link>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8 text-gray-500 dark:text-gray-400">
                    <span className="text-4xl mb-2 block">📭</span>
                    <p>{tEvents('noEventsFound')}</p>
                  </div>
                )}
              </CardBody>
            </Card>

            {/* Sports Hosted */}
            <Card>
              <CardBody>
                <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
                  🏅 {t('detail.sportsAtVenue')}
                </h2>
                <div className="flex flex-wrap gap-3">
                  {venue.sports.map((sport, i) => (
                    <div
                      key={i}
                      className="px-4 py-3 bg-gradient-to-r from-qatar-maroon/10 to-qatar-maroon/5 dark:from-qatar-gold/10 dark:to-qatar-gold/5 rounded-xl flex items-center gap-2"
                    >
                      <span className="text-xl">
                        {sport === 'Football' && '⚽'}
                        {sport === 'Athletics' && '🏃'}
                        {sport === 'Swimming' && '🏊'}
                        {sport === 'Diving' && '🤿'}
                        {sport === 'Water Polo' && '🤽'}
                        {sport === 'Basketball' && '🏀'}
                        {sport === 'Volleyball' && '🏐'}
                        {sport === 'Handball' && '🤾'}
                        {sport === 'Badminton' && '🏸'}
                        {sport === 'Tennis' && '🎾'}
                        {sport === 'Cycling' && '🚴'}
                        {sport === 'Taekwondo' && '🥋'}
                        {sport === 'Judo' && '🥋'}
                        {sport === 'Boxing' && '🥊'}
                        {sport === 'Wrestling' && '🤼'}
                        {sport === 'Karate' && '🥋'}
                        {sport === 'Equestrian' && '🐴'}
                        {sport === 'Shooting' && '🎯'}
                      </span>
                      <span className="font-medium text-gray-900 dark:text-white">{sport}</span>
                    </div>
                  ))}
                </div>
              </CardBody>
            </Card>

            {/* Facilities */}
            <Card>
              <CardBody>
                <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
                  🏢 {t('detail.facilities')}
                </h2>
                <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-3">
                  {venue.facilities.map((facility, i) => (
                    <div
                      key={i}
                      className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-gray-800 rounded-xl"
                    >
                      <div className="w-8 h-8 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center">
                        <span className="text-green-600 dark:text-green-400">✓</span>
                      </div>
                      <span className="font-medium text-gray-900 dark:text-white">{facility}</span>
                    </div>
                  ))}
                </div>
              </CardBody>
            </Card>

            {/* Accessibility */}
            <Card>
              <CardBody>
                <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
                  ♿ {t('detail.accessibility')}
                </h2>
                <div className="grid sm:grid-cols-2 gap-3">
                  {venue.accessibility.map((feature, i) => (
                    <div
                      key={i}
                      className="flex items-center gap-3 p-3 bg-blue-50 dark:bg-blue-900/20 rounded-xl"
                    >
                      <div className="w-8 h-8 bg-blue-100 dark:bg-blue-900/50 rounded-full flex items-center justify-center">
                        <span className="text-blue-600 dark:text-blue-400">♿</span>
                      </div>
                      <span className="font-medium text-gray-900 dark:text-white">{feature}</span>
                    </div>
                  ))}
                </div>
              </CardBody>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-20 space-y-6">
              {/* Map */}
              <Card>
                <CardBody>
                  <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-4">
                    🗺️ {t('detail.location')}
                  </h2>
                  <div className="aspect-square bg-gray-100 dark:bg-gray-800 rounded-xl overflow-hidden mb-4">
                    <iframe
                      src={`https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d5000!2d${venue.coordinates.lng}!3d${venue.coordinates.lat}!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zM!5e0!3m2!1sen!2sqa!4v1234567890`}
                      width="100%"
                      height="100%"
                      style={{ border: 0 }}
                      allowFullScreen
                      loading="lazy"
                      referrerPolicy="no-referrer-when-downgrade"
                      title={`Map of ${venue.name}`}
                    />
                  </div>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                    📍 {venue.address}
                  </p>
                  <a
                    href={`https://www.google.com/maps/dir/?api=1&destination=${venue.coordinates.lat},${venue.coordinates.lng}`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Button variant="primary" fullWidth>
                      🚗 {t('card.getDirections')}
                    </Button>
                  </a>
                </CardBody>
              </Card>

              {/* Transport Options */}
              <Card>
                <CardBody>
                  <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-4">
                    🚇 {t('detail.gettingThere')}
                  </h2>
                  <div className="space-y-3">
                    <div className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-gray-800 rounded-xl">
                      <span className="text-2xl">🚇</span>
                      <div>
                        <p className="font-medium text-gray-900 dark:text-white">{t('transport.metro')}</p>
                        <p className="text-sm text-gray-500 dark:text-gray-400">Red Line - {t('transport.nearestStation')}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-gray-800 rounded-xl">
                      <span className="text-2xl">🚌</span>
                      <div>
                        <p className="font-medium text-gray-900 dark:text-white">{t('transport.bus')}</p>
                        <p className="text-sm text-gray-500 dark:text-gray-400">{t('transport.eventShuttles')}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-gray-800 rounded-xl">
                      <span className="text-2xl">🅿️</span>
                      <div>
                        <p className="font-medium text-gray-900 dark:text-white">{t('transport.parking')}</p>
                        <p className="text-sm text-gray-500 dark:text-gray-400">5,000+ {t('transport.spacesAvailable')}</p>
                      </div>
                    </div>
                  </div>
                  <Link href="/transport">
                    <Button variant="outline" fullWidth className="mt-4">
                      {t('detail.planYourJourney')}
                    </Button>
                  </Link>
                </CardBody>
              </Card>
            </div>
          </div>
        </div>

        {/* Other Venues */}
        <div className="mt-12">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
            {t('detail.exploreOtherVenues')}
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {venues
              .filter(v => v.id !== venue.id)
              .slice(0, 4)
              .map((otherVenue) => (
                <Link key={otherVenue.id} href={`/venues/${otherVenue.id}`}>
                  <Card className="hover:shadow-lg transition-all hover:-translate-y-1 h-full">
                    <div className="aspect-video bg-gradient-to-br from-qatar-maroon to-qatar-maroon-dark flex items-center justify-center">
                      <span className="text-5xl">{otherVenue.typeEmoji}</span>
                    </div>
                    <CardBody>
                      <Badge variant="default" size="sm" className="mb-2">{otherVenue.type}</Badge>
                      <h3 className="font-semibold text-gray-900 dark:text-white mb-1">
                        {otherVenue.name}
                      </h3>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        {t('totalCapacity')}: {otherVenue.capacity.toLocaleString()}
                      </p>
                    </CardBody>
                  </Card>
                </Link>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
}
