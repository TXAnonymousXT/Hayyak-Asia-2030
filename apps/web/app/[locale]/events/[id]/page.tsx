'use client';

import { useParams, useRouter } from 'next/navigation';
import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { Link } from '@/lib/i18n/navigation';
import { Card, CardBody } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { getEventById, events } from '@/lib/data/events';
import { getVenueById } from '@/lib/data/venues';
import { useCartStore, CartItem } from '@/lib/store/cartStore';

export default function EventDetailPage() {
  const params = useParams();
  const router = useRouter();
  const t = useTranslations('events');
  const tCommon = useTranslations('common');
  const tNav = useTranslations('navigation');
  const event = getEventById(params.id as string);
  const venue = event ? getVenueById(event.venueId) : null;

  const [selectedSection, setSelectedSection] = useState('A');
  const [selectedQuantity, setSelectedQuantity] = useState(1);
  const [showSuccess, setShowSuccess] = useState(false);

  const addItem = useCartStore((state) => state.addItem);
  const cartItems = useCartStore((state) => state.items);
  const totalItems = useCartStore((state) => state.getTotalItems());

  if (!event) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Card className="max-w-md w-full mx-4">
          <CardBody>
            <div className="text-center py-8">
              <span className="text-6xl mb-4 block">🎫</span>
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                {t('noEventsFound')}
              </h1>
              <p className="text-gray-500 dark:text-gray-400 mb-6">
                {t('noEventsFound')}
              </p>
              <Link href="/events">
                <Button variant="primary">{tNav('events')}</Button>
              </Link>
            </div>
          </CardBody>
        </Card>
      </div>
    );
  }

  const sections = [
    { id: 'VIP', name: 'VIP Section', price: event.price.max, available: 50 },
    { id: 'A', name: 'Section A - Premium', price: Math.round(event.price.max * 0.7), available: 200 },
    { id: 'B', name: 'Section B - Standard', price: Math.round(event.price.max * 0.5), available: 500 },
    { id: 'C', name: 'Section C - Economy', price: event.price.min, available: 1000 },
  ];

  const selectedSectionData = sections.find(s => s.id === selectedSection)!;
  const totalPrice = selectedSectionData.price * selectedQuantity;

  const handleAddToCart = () => {
    const cartItem: CartItem = {
      id: `${event.id}-${selectedSection}-${Date.now()}`,
      eventId: event.id,
      eventName: event.name,
      eventDate: event.date,
      eventTime: event.time,
      venue: event.venue,
      section: selectedSectionData.name,
      row: 'TBD',
      seat: 'TBD',
      price: selectedSectionData.price,
      quantity: selectedQuantity,
      sport: event.sport,
      sportEmoji: event.sportEmoji,
    };

    addItem(cartItem);
    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 3000);
  };

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
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
      {/* Success Toast */}
      {showSuccess && (
        <div className="fixed top-20 right-4 z-50 animate-fade-in-down">
          <Card className="bg-green-500 text-white shadow-xl">
            <CardBody>
              <div className="flex items-center gap-3">
                <span className="text-2xl">✓</span>
                <div>
                  <p className="font-semibold">{t('detail.addToCart')}!</p>
                  <p className="text-sm opacity-90">{selectedQuantity} ticket(s)</p>
                </div>
              </div>
            </CardBody>
          </Card>
        </div>
      )}

      {/* Hero Section */}
      <div className="relative bg-gradient-to-br from-qatar-maroon via-qatar-maroon to-qatar-maroon-dark text-white">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-0 right-0 w-96 h-96 bg-qatar-gold rounded-full blur-3xl" />
        </div>

        <div className="container mx-auto px-4 py-12 relative">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-sm text-white/70 mb-6">
            <Link href="/" className="hover:text-white">{tNav('home')}</Link>
            <span>/</span>
            <Link href="/events" className="hover:text-white">{tNav('events')}</Link>
            <span>/</span>
            <span className="text-white">{event.name}</span>
          </nav>

          <div className="flex flex-col lg:flex-row gap-8">
            {/* Event Info */}
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-4">
                <span className="text-5xl">{event.sportEmoji}</span>
                <Badge variant={getCategoryColor(event.category) as any} size="lg">
                  {t(`types.${event.category}`)}
                </Badge>
                {event.isFeatured && (
                  <Badge variant="gold" size="lg">⭐ Featured</Badge>
                )}
              </div>

              <h1 className="text-4xl md:text-5xl font-bold mb-4">{event.name}</h1>

              {event.teams && (
                <div className="flex items-center gap-4 mb-6 text-2xl">
                  <span>{event.teams.homeFlag} {event.teams.home}</span>
                  <span className="text-qatar-gold font-bold">VS</span>
                  <span>{event.teams.awayFlag} {event.teams.away}</span>
                </div>
              )}

              <p className="text-lg text-white/80 mb-6 max-w-2xl">
                {event.description}
              </p>

              {/* Event Details */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4">
                  <div className="text-white/60 text-sm mb-1">📅 {t('filters.date')}</div>
                  <div className="font-semibold">{formatDate(event.date)}</div>
                </div>
                <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4">
                  <div className="text-white/60 text-sm mb-1">🕐 {t('detail.schedule')}</div>
                  <div className="font-semibold">{event.time} - {event.endTime}</div>
                </div>
                <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4">
                  <div className="text-white/60 text-sm mb-1">📍 {t('detail.venue')}</div>
                  <div className="font-semibold">{event.venue}</div>
                </div>
                <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4">
                  <div className="text-white/60 text-sm mb-1">🎟️ {tCommon('available')}</div>
                  <div className="font-semibold">{event.seatsAvailable.toLocaleString()} {t('detail.seatsAvailable')}</div>
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
            {/* Athletes/Teams */}
            {event.athletes && (
              <Card>
                <CardBody>
                  <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
                    🏅 {t('detail.participatingAthletes')}
                  </h2>
                  <div className="grid sm:grid-cols-2 gap-3">
                    {event.athletes.map((athlete, i) => (
                      <div
                        key={i}
                        className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-gray-800 rounded-xl"
                      >
                        <div className="w-10 h-10 bg-qatar-maroon/10 rounded-full flex items-center justify-center text-qatar-maroon dark:text-qatar-gold font-bold">
                          {i + 1}
                        </div>
                        <span className="font-medium text-gray-900 dark:text-white">{athlete}</span>
                      </div>
                    ))}
                  </div>
                </CardBody>
              </Card>
            )}

            {/* Venue Info */}
            {venue && (
              <Card>
                <CardBody>
                  <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
                    📍 {t('detail.venueInfo')}
                  </h2>
                  <div className="flex flex-col md:flex-row gap-6">
                    <div className="w-full md:w-48 h-32 bg-gradient-to-br from-qatar-maroon to-qatar-maroon-dark rounded-xl flex items-center justify-center">
                      <span className="text-5xl">{venue.typeEmoji}</span>
                    </div>
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                        {venue.name}
                      </h3>
                      <p className="text-gray-600 dark:text-gray-400 mb-3">{venue.address}</p>
                      <div className="flex flex-wrap gap-2 mb-4">
                        {venue.facilities.slice(0, 4).map((facility, i) => (
                          <Badge key={i} variant="default" size="sm">{facility}</Badge>
                        ))}
                      </div>
                      <Link href={`/venues/${venue.id}`}>
                        <Button variant="outline" size="sm">{tCommon('viewAll')}</Button>
                      </Link>
                    </div>
                  </div>
                </CardBody>
              </Card>
            )}

            {/* Map Preview */}
            {venue && (
              <Card>
                <CardBody>
                  <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
                    🗺️ {t('detail.howToGetThere')}
                  </h2>
                  <div className="aspect-video bg-gray-100 dark:bg-gray-800 rounded-xl overflow-hidden">
                    <iframe
                      src={`https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3000!2d${venue.coordinates.lng}!3d${venue.coordinates.lat}!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zM!5e0!3m2!1sen!2sqa!4v1234567890`}
                      width="100%"
                      height="100%"
                      style={{ border: 0 }}
                      allowFullScreen
                      loading="lazy"
                      referrerPolicy="no-referrer-when-downgrade"
                      title={`Map of ${venue.name}`}
                    />
                  </div>
                  <div className="mt-4 flex gap-3">
                    <a
                      href={`https://www.google.com/maps/dir/?api=1&destination=${venue.coordinates.lat},${venue.coordinates.lng}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1"
                    >
                      <Button variant="outline" fullWidth>
                        🚗 {t('detail.howToGetThere')}
                      </Button>
                    </a>
                    <Link href="/transport" className="flex-1">
                      <Button variant="primary" fullWidth>
                        🚇 {tNav('transport')}
                      </Button>
                    </Link>
                  </div>
                </CardBody>
              </Card>
            )}
          </div>

          {/* Ticket Selection Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-20">
              <Card className="border-2 border-qatar-maroon/20 dark:border-qatar-gold/20">
                <CardBody>
                  <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
                    🎟️ {t('detail.selectTickets')}
                  </h2>

                  {/* Section Selection */}
                  <div className="space-y-3 mb-6">
                    <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                      {t('detail.chooseSection')}
                    </label>
                    {sections.map((section) => (
                      <button
                        key={section.id}
                        onClick={() => setSelectedSection(section.id)}
                        className={`w-full p-4 rounded-xl border-2 transition-all text-left ${
                          selectedSection === section.id
                            ? 'border-qatar-maroon bg-qatar-maroon/5 dark:border-qatar-gold dark:bg-qatar-gold/5'
                            : 'border-gray-200 dark:border-gray-700 hover:border-qatar-maroon/50'
                        }`}
                      >
                        <div className="flex justify-between items-center">
                          <div>
                            <div className="font-semibold text-gray-900 dark:text-white">
                              {section.name}
                            </div>
                            <div className="text-sm text-gray-500 dark:text-gray-400">
                              {section.available} {t('detail.seatsAvailable')}
                            </div>
                          </div>
                          <div className="text-xl font-bold text-qatar-maroon dark:text-qatar-gold">
                            {section.price} QAR
                          </div>
                        </div>
                      </button>
                    ))}
                  </div>

                  {/* Quantity Selection */}
                  <div className="mb-6">
                    <label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 block">
                      {t('detail.quantity')}
                    </label>
                    <div className="flex items-center gap-4">
                      <button
                        onClick={() => setSelectedQuantity(Math.max(1, selectedQuantity - 1))}
                        className="w-12 h-12 rounded-xl border-2 border-gray-200 dark:border-gray-700 flex items-center justify-center text-xl font-bold hover:bg-gray-50 dark:hover:bg-gray-800"
                      >
                        -
                      </button>
                      <span className="text-2xl font-bold text-gray-900 dark:text-white w-12 text-center">
                        {selectedQuantity}
                      </span>
                      <button
                        onClick={() => setSelectedQuantity(Math.min(10, selectedQuantity + 1))}
                        className="w-12 h-12 rounded-xl border-2 border-gray-200 dark:border-gray-700 flex items-center justify-center text-xl font-bold hover:bg-gray-50 dark:hover:bg-gray-800"
                      >
                        +
                      </button>
                    </div>
                  </div>

                  {/* Price Summary */}
                  <div className="border-t border-gray-200 dark:border-gray-700 pt-4 mb-6">
                    <div className="flex justify-between text-sm text-gray-600 dark:text-gray-400 mb-2">
                      <span>{selectedSectionData.name}</span>
                      <span>{selectedSectionData.price} QAR × {selectedQuantity}</span>
                    </div>
                    <div className="flex justify-between text-sm text-gray-600 dark:text-gray-400 mb-2">
                      <span>{t('detail.serviceFee')}</span>
                      <span>{Math.round(totalPrice * 0.05)} QAR</span>
                    </div>
                    <div className="flex justify-between text-xl font-bold text-gray-900 dark:text-white mt-4">
                      <span>{t('detail.total')}</span>
                      <span className="text-qatar-maroon dark:text-qatar-gold">
                        {Math.round(totalPrice * 1.05)} QAR
                      </span>
                    </div>
                  </div>

                  {/* Add to Cart Button */}
                  <Button
                    variant="primary"
                    size="lg"
                    fullWidth
                    onClick={handleAddToCart}
                    className="mb-3"
                  >
                    🛒 {t('detail.addToCart')}
                  </Button>

                  {totalItems > 0 && (
                    <Link href="/cart">
                      <Button variant="outline" size="lg" fullWidth>
                        {t('detail.viewCart')} ({totalItems})
                      </Button>
                    </Link>
                  )}
                </CardBody>
              </Card>
            </div>
          </div>
        </div>

        {/* Related Events */}
        <div className="mt-12">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
            {t('detail.similarEvents')}
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {events
              .filter(e => e.sport === event.sport && e.id !== event.id)
              .slice(0, 4)
              .map((relatedEvent) => (
                <Link key={relatedEvent.id} href={`/events/${relatedEvent.id}`}>
                  <Card className="hover:shadow-lg transition-all hover:-translate-y-1">
                    <div className="aspect-video bg-gradient-to-br from-qatar-maroon to-qatar-maroon-dark flex items-center justify-center">
                      <span className="text-5xl">{relatedEvent.sportEmoji}</span>
                    </div>
                    <CardBody>
                      <Badge variant={getCategoryColor(relatedEvent.category) as any} size="sm" className="mb-2">
                        {t(`types.${relatedEvent.category}`)}
                      </Badge>
                      <h3 className="font-semibold text-gray-900 dark:text-white mb-1">
                        {relatedEvent.name}
                      </h3>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        {formatDate(relatedEvent.date)}
                      </p>
                      <p className="text-sm font-semibold text-qatar-maroon dark:text-qatar-gold mt-2">
                        {tCommon('from')} {relatedEvent.price.min} QAR
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
