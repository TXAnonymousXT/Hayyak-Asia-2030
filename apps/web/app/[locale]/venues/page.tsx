'use client';

import { useTranslations } from 'next-intl';
import { Link } from '@/lib/i18n/navigation';
import { Card, CardBody } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { venues } from '@/lib/data/venues';
import { getEventsByVenue } from '@/lib/data/events';

export default function VenuesPage() {
  const t = useTranslations('venues');

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <div className="bg-gradient-to-r from-qatar-maroon to-qatar-maroon-dark text-white py-12">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl md:text-4xl font-bold mb-2">{t('title')}</h1>
          <p className="text-white/70">{t('subtitle')}</p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <Card>
            <CardBody>
              <div className="text-center">
                <p className="text-3xl font-bold text-qatar-maroon dark:text-qatar-gold">{venues.length}</p>
                <p className="text-sm text-gray-500 dark:text-gray-400">{t('worldClassVenues')}</p>
              </div>
            </CardBody>
          </Card>
          <Card>
            <CardBody>
              <div className="text-center">
                <p className="text-3xl font-bold text-qatar-maroon dark:text-qatar-gold">
                  {venues.reduce((sum, v) => sum + v.capacity, 0).toLocaleString()}
                </p>
                <p className="text-sm text-gray-500 dark:text-gray-400">{t('totalCapacity')}</p>
              </div>
            </CardBody>
          </Card>
          <Card>
            <CardBody>
              <div className="text-center">
                <p className="text-3xl font-bold text-qatar-maroon dark:text-qatar-gold">
                  {Array.from(new Set(venues.flatMap(v => v.sports))).length}
                </p>
                <p className="text-sm text-gray-500 dark:text-gray-400">{t('sportsHosted')}</p>
              </div>
            </CardBody>
          </Card>
          <Card>
            <CardBody>
              <div className="text-center">
                <p className="text-3xl font-bold text-qatar-maroon dark:text-qatar-gold">100%</p>
                <p className="text-sm text-gray-500 dark:text-gray-400">{t('accessible')}</p>
              </div>
            </CardBody>
          </Card>
        </div>

        {/* Venues Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {venues.map((venue) => {
            const venueEvents = getEventsByVenue(venue.id);
            return (
              <Link key={venue.id} href={`/venues/${venue.id}`}>
                <Card className="h-full overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-2 group">
                  <div className="aspect-video bg-gradient-to-br from-qatar-maroon via-qatar-maroon to-qatar-maroon-dark flex items-center justify-center relative overflow-hidden">
                    <span className="text-6xl group-hover:scale-110 transition-transform duration-300">
                      {venue.typeEmoji}
                    </span>
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                    <Badge variant="glass" size="sm" className="absolute top-3 left-3">
                      {venue.type}
                    </Badge>
                  </div>
                  <CardBody>
                    <h3 className="font-bold text-lg text-gray-900 dark:text-white group-hover:text-qatar-maroon dark:group-hover:text-qatar-gold transition-colors mb-2">
                      {venue.name}
                    </h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mb-3">
                      {t('totalCapacity')}: {venue.capacity.toLocaleString()}
                    </p>
                    <div className="flex flex-wrap gap-1 mb-4">
                      {venue.sports.slice(0, 3).map((sport, i) => (
                        <span key={i} className="text-xs bg-qatar-maroon/10 dark:bg-qatar-gold/10 text-qatar-maroon dark:text-qatar-gold px-2 py-1 rounded-full">
                          {sport}
                        </span>
                      ))}
                      {venue.sports.length > 3 && (
                        <span className="text-xs bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded-full">
                          +{venue.sports.length - 3}
                        </span>
                      )}
                    </div>
                    <div className="flex items-center justify-between pt-3 border-t border-gray-100 dark:border-gray-700">
                      <span className="text-sm text-gray-500 dark:text-gray-400">
                        {venueEvents.length} {t('upcomingEvents')}
                      </span>
                      <Button size="sm" variant="outline">
                        {t('viewDetails')}
                      </Button>
                    </div>
                  </CardBody>
                </Card>
              </Link>
            );
          })}
        </div>

        {/* Map Section */}
        <Card className="mt-12">
          <CardBody>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              🗺️ {t('venuesMap')}
            </h2>
            <div className="aspect-video bg-gray-100 dark:bg-gray-800 rounded-xl overflow-hidden">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d230000!2d51.4!3d25.3!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3e45c534ffdce87f%3A0x44d9319f78cfd4b1!2sDoha%2C%20Qatar!5e0!3m2!1sen!2s!4v1234567890"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Qatar Venues Map"
              />
            </div>
          </CardBody>
        </Card>
      </div>
    </div>
  );
}
