'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { Link } from '@/lib/i18n/navigation';
import { Card, CardBody } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { events, Event } from '@/lib/data/events';

export default function EventsPage() {
  const t = useTranslations('events');
  const tCommon = useTranslations('common');
  const [selectedSport, setSelectedSport] = useState<string>('all');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const sports = ['all', ...Array.from(new Set(events.map(e => e.sport)))];
  const categories = ['all', 'final', 'semifinal', 'quarterfinal', 'group', 'preliminary'];

  const filteredEvents = events.filter(event => {
    const sportMatch = selectedSport === 'all' || event.sport === selectedSport;
    const categoryMatch = selectedCategory === 'all' || event.category === selectedCategory;
    return sportMatch && categoryMatch;
  });

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-US', {
      weekday: 'short',
      month: 'short',
      day: 'numeric',
    });
  };

  const getCategoryColor = (category: string): 'gold' | 'qatar' | 'primary' | 'default' => {
    switch (category) {
      case 'final': return 'gold';
      case 'semifinal': return 'qatar';
      case 'quarterfinal': return 'primary';
      default: return 'default';
    }
  };

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
        {/* Filters */}
        <div className="mb-8">
          <div className="flex flex-col sm:flex-row gap-4">
            {/* Sport Filter */}
            <div className="flex-1">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                {t('filterBySport')}
              </label>
              <div className="flex flex-wrap gap-2">
                {sports.map(sport => (
                  <button
                    key={sport}
                    onClick={() => setSelectedSport(sport)}
                    className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                      selectedSport === sport
                        ? 'bg-qatar-maroon text-white dark:bg-qatar-gold dark:text-qatar-maroon-dark'
                        : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 border border-gray-200 dark:border-gray-700 hover:border-qatar-maroon dark:hover:border-qatar-gold'
                    }`}
                  >
                    {sport === 'all' ? t('allSports') : sport}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Category Filter */}
          <div className="mt-4">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              {t('filterByCategory')}
            </label>
            <div className="flex flex-wrap gap-2">
              {categories.map(category => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                    selectedCategory === category
                      ? 'bg-qatar-maroon text-white dark:bg-qatar-gold dark:text-qatar-maroon-dark'
                      : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 border border-gray-200 dark:border-gray-700 hover:border-qatar-maroon dark:hover:border-qatar-gold'
                  }`}
                >
                  {category === 'all' ? t('allCategories') : t(`types.${category}`)}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Results Count */}
        <p className="text-gray-500 dark:text-gray-400 mb-6">
          {t('showingEvents', { count: filteredEvents.length })}
        </p>

        {/* Events Grid */}
        {filteredEvents.length > 0 ? (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredEvents.map((event) => (
              <EventCard key={event.id} event={event} formatDate={formatDate} getCategoryColor={getCategoryColor} t={t} tCommon={tCommon} />
            ))}
          </div>
        ) : (
          <Card>
            <CardBody>
              <div className="text-center py-12">
                <span className="text-6xl mb-4 block">🔍</span>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                  {t('noEventsFound')}
                </h3>
                <p className="text-gray-500 dark:text-gray-400 mb-4">
                  {t('noEventsFound')}
                </p>
                <Button variant="outline" onClick={() => { setSelectedSport('all'); setSelectedCategory('all'); }}>
                  {t('clearFilters')}
                </Button>
              </div>
            </CardBody>
          </Card>
        )}
      </div>
    </div>
  );
}

function EventCard({
  event,
  formatDate,
  getCategoryColor,
  t,
  tCommon
}: {
  event: Event;
  formatDate: (date: string) => string;
  getCategoryColor: (category: string) => 'gold' | 'qatar' | 'primary' | 'default';
  t: any;
  tCommon: any;
}) {
  return (
    <Link href={`/events/${event.id}`}>
      <Card className="h-full overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-2 group">
        {/* Image/Icon Area */}
        <div className="relative aspect-[4/3] bg-gradient-to-br from-qatar-maroon via-qatar-maroon to-qatar-maroon-dark overflow-hidden">
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-6xl group-hover:scale-110 transition-transform duration-300">
              {event.sportEmoji}
            </span>
          </div>

          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

          {/* Badges */}
          <div className="absolute top-3 left-3 right-3 flex justify-between items-start">
            <Badge variant={getCategoryColor(event.category)} size="sm">
              {t(`types.${event.category}`)}
            </Badge>
            {event.isFeatured && (
              <Badge variant="gold" size="sm">⭐ Featured</Badge>
            )}
          </div>

          {/* Teams (if applicable) */}
          {event.teams && (
            <div className="absolute bottom-3 left-3 right-3">
              <div className="flex items-center justify-center gap-2 text-white font-semibold">
                <span>{event.teams.homeFlag} {event.teams.home}</span>
                <span className="text-qatar-gold">vs</span>
                <span>{event.teams.awayFlag} {event.teams.away}</span>
              </div>
            </div>
          )}
        </div>

        {/* Content */}
        <CardBody>
          <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400 mb-2">
            <span>{event.sport}</span>
            <span>•</span>
            <span>{formatDate(event.date)}</span>
          </div>

          <h3 className="font-bold text-gray-900 dark:text-white group-hover:text-qatar-maroon dark:group-hover:text-qatar-gold transition-colors mb-1">
            {event.name}
          </h3>

          <p className="text-sm text-gray-500 dark:text-gray-400 mb-3 flex items-center gap-1">
            <span>📍</span> {event.venue}
          </p>

          <p className="text-sm text-gray-500 dark:text-gray-400 mb-3 flex items-center gap-1">
            <span>🕐</span> {event.time} - {event.endTime}
          </p>

          <div className="flex items-center justify-between pt-3 border-t border-gray-100 dark:border-gray-700">
            <div>
              <p className="text-xs text-gray-500 dark:text-gray-400">{tCommon('from')}</p>
              <p className="text-lg font-bold text-qatar-maroon dark:text-qatar-gold">
                {event.price.min} QAR
              </p>
            </div>
            <div className="text-right">
              <p className="text-xs text-gray-500 dark:text-gray-400">{tCommon('available')}</p>
              <p className="text-sm font-medium text-gray-900 dark:text-white">
                {event.seatsAvailable.toLocaleString()} {t('detail.seatsAvailable')}
              </p>
            </div>
          </div>
        </CardBody>
      </Card>
    </Link>
  );
}
