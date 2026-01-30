'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { Link } from '@/lib/i18n/navigation';
import { Card, CardBody } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { useCartStore } from '@/lib/store/cartStore';

// Sample purchased tickets (in real app, would come from user's account)
const purchasedTickets = [
  {
    id: 'ticket-001',
    eventId: 'fb-001',
    event: 'Football Final',
    venue: 'Lusail Stadium',
    venueCoords: { lat: 25.4195, lng: 51.4904 },
    date: 'Nov 15, 2030',
    time: '20:00',
    seat: 'Section A, Row 5, Seat 12',
    status: 'active',
    sport: '⚽',
    qrCode: 'HAYYAK-FB001-A512',
  },
  {
    id: 'ticket-002',
    eventId: 'sw-001',
    event: 'Swimming 100m Freestyle Final',
    venue: 'Aquatics Center',
    venueCoords: { lat: 25.2631, lng: 51.4484 },
    date: 'Nov 10, 2030',
    time: '19:00',
    seat: 'Section B, Row 3, Seat 8',
    status: 'active',
    sport: '🏊',
    qrCode: 'HAYYAK-SW001-B38',
  },
  {
    id: 'ticket-003',
    eventId: 'at-001',
    event: 'Athletics 100m Final',
    venue: 'Lusail Stadium',
    venueCoords: { lat: 25.4195, lng: 51.4904 },
    date: 'Nov 14, 2030',
    time: '21:00',
    seat: 'VIP Section, Row 1, Seat 5',
    status: 'active',
    sport: '🏃',
    qrCode: 'HAYYAK-AT001-VIP15',
  },
];

export default function TicketsPage() {
  const t = useTranslations('tickets');
  const tCommon = useTranslations('common');
  const tNav = useTranslations('navigation');
  const [showQRModal, setShowQRModal] = useState<string | null>(null);
  const [showMapModal, setShowMapModal] = useState<{venue: string, coords: {lat: number, lng: number}} | null>(null);

  const cartItems = useCartStore((state) => state.items);
  const totalCartItems = useCartStore((state) => state.getTotalItems());

  const tickets = purchasedTickets;
  const hasTickets = tickets.length > 0;

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* QR Code Modal */}
      {showQRModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
          <Card className="max-w-sm w-full animate-scale-in">
            <CardBody>
              <div className="text-center">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
                  {t('qrCode.title')}
                </h3>
                <div className="bg-white p-4 rounded-xl inline-block mb-4">
                  {/* QR Code placeholder - in real app use a QR library */}
                  <div className="w-48 h-48 bg-gray-100 flex items-center justify-center">
                    <div className="text-center">
                      <div className="grid grid-cols-8 gap-0.5 w-32 h-32 mx-auto">
                        {Array.from({ length: 64 }).map((_, i) => (
                          <div
                            key={i}
                            className={`w-full h-full ${Math.random() > 0.5 ? 'bg-black' : 'bg-white'}`}
                          />
                        ))}
                      </div>
                      <p className="text-xs mt-2 font-mono">{showQRModal}</p>
                    </div>
                  </div>
                </div>
                <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
                  {t('qrCode.showAtEntrance')}
                </p>
                <Button variant="primary" fullWidth onClick={() => setShowQRModal(null)}>
                  {tCommon('close')}
                </Button>
              </div>
            </CardBody>
          </Card>
        </div>
      )}

      {/* Map Modal */}
      {showMapModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
          <Card className="max-w-2xl w-full animate-scale-in">
            <CardBody>
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                  📍 {t('directions.title')} {showMapModal.venue}
                </h3>
                <button
                  onClick={() => setShowMapModal(null)}
                  className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              <div className="aspect-video bg-gray-100 dark:bg-gray-800 rounded-xl overflow-hidden mb-4">
                <iframe
                  src={`https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d10000!2d${showMapModal.coords.lng}!3d${showMapModal.coords.lat}!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2z${showMapModal.venue}!5e0!3m2!1sen!2sqa!4v1234567890`}
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title={`Map to ${showMapModal.venue}`}
                />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <a
                  href={`https://www.google.com/maps/dir/?api=1&destination=${showMapModal.coords.lat},${showMapModal.coords.lng}&travelmode=driving`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Button variant="outline" fullWidth>
                    🚗 {t('directions.drive')}
                  </Button>
                </a>
                <a
                  href={`https://www.google.com/maps/dir/?api=1&destination=${showMapModal.coords.lat},${showMapModal.coords.lng}&travelmode=transit`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Button variant="outline" fullWidth>
                    🚇 {t('directions.transit')}
                  </Button>
                </a>
                <a
                  href={`https://www.google.com/maps/dir/?api=1&destination=${showMapModal.coords.lat},${showMapModal.coords.lng}&travelmode=walking`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Button variant="outline" fullWidth>
                    🚶 {t('directions.walk')}
                  </Button>
                </a>
                <a
                  href={`https://www.google.com/maps/search/?api=1&query=${showMapModal.coords.lat},${showMapModal.coords.lng}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Button variant="primary" fullWidth>
                    🗺️ {t('directions.openInMaps')}
                  </Button>
                </a>
              </div>
            </CardBody>
          </Card>
        </div>
      )}

      {/* Header */}
      <div className="bg-gradient-to-r from-qatar-maroon to-qatar-maroon-dark text-white py-12">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold mb-2">{t('title')}</h1>
              <p className="text-white/70">{t('subtitle')}</p>
            </div>
            {totalCartItems > 0 && (
              <Link href="/cart">
                <Button variant="secondary">
                  🛒 {tNav('cart')} ({totalCartItems})
                </Button>
              </Link>
            )}
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {hasTickets ? (
          <>
            {/* Ticket Tabs */}
            <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
              <Button variant="primary" size="sm">{t('allTickets')} ({tickets.length})</Button>
              <Button variant="outline" size="sm">{t('active')} ({tickets.filter(t => t.status === 'active').length})</Button>
              <Button variant="outline" size="sm">{t('used')} (0)</Button>
              <Button variant="outline" size="sm">{t('expired')} (0)</Button>
            </div>

            {/* Tickets List */}
            <div className="space-y-4">
              {tickets.map((ticket) => (
                <Card key={ticket.id} className="overflow-hidden">
                  <div className="flex flex-col md:flex-row">
                    {/* Left - Event Icon */}
                    <div className="bg-gradient-to-br from-qatar-maroon to-qatar-maroon-dark p-6 flex items-center justify-center md:w-32">
                      <span className="text-5xl">{ticket.sport}</span>
                    </div>

                    {/* Middle - Event Details */}
                    <div className="flex-1 p-5">
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <Badge variant="success" size="sm" className="mb-2">
                            ✓ {t('status.active')}
                          </Badge>
                          <h3 className="font-bold text-lg text-gray-900 dark:text-white">
                            {ticket.event}
                          </h3>
                        </div>
                      </div>
                      <div className="grid grid-cols-2 gap-2 mt-3">
                        <p className="text-gray-600 dark:text-gray-400 flex items-center gap-2">
                          <span>📍</span> {ticket.venue}
                        </p>
                        <p className="text-gray-600 dark:text-gray-400 flex items-center gap-2">
                          <span>📅</span> {ticket.date}
                        </p>
                        <p className="text-gray-600 dark:text-gray-400 flex items-center gap-2">
                          <span>🕐</span> {ticket.time}
                        </p>
                        <p className="text-gray-600 dark:text-gray-400 flex items-center gap-2">
                          <span>💺</span> {ticket.seat}
                        </p>
                      </div>
                    </div>

                    {/* Right - Actions */}
                    <div className="p-5 flex flex-row md:flex-col gap-2 justify-end border-t md:border-t-0 md:border-l border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/50">
                      <Button
                        variant="primary"
                        size="sm"
                        onClick={() => setShowQRModal(ticket.qrCode)}
                      >
                        📱 {t('card.showQR')}
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setShowMapModal({ venue: ticket.venue, coords: ticket.venueCoords })}
                      >
                        🗺️ {t('card.getDirections')}
                      </Button>
                      <Link href={`/events/${ticket.eventId}`}>
                        <Button variant="ghost" size="sm" fullWidth>
                          {t('card.viewEvent')}
                        </Button>
                      </Link>
                    </div>
                  </div>
                </Card>
              ))}
            </div>

            {/* Add to Wallet Card */}
            <Card className="mt-8 border-2 border-dashed border-qatar-maroon/30 dark:border-qatar-gold/30">
              <CardBody>
                <div className="flex flex-col md:flex-row items-center gap-4 text-center md:text-left">
                  <div className="w-16 h-16 bg-qatar-maroon/10 dark:bg-qatar-gold/10 rounded-2xl flex items-center justify-center">
                    <span className="text-3xl">📲</span>
                  </div>
                  <div className="flex-1">
                    <h3 className="font-bold text-gray-900 dark:text-white mb-1">
                      {t('wallet.title')}
                    </h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      {t('wallet.description')}
                    </p>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm">
                      {t('wallet.appleWallet')}
                    </Button>
                    <Button variant="outline" size="sm">
                      {t('wallet.googleWallet')}
                    </Button>
                  </div>
                </div>
              </CardBody>
            </Card>
          </>
        ) : (
          /* Empty State */
          <div className="text-center py-16">
            <div className="w-24 h-24 bg-gray-100 dark:bg-gray-800 rounded-full mx-auto mb-6 flex items-center justify-center">
              <span className="text-5xl">🎫</span>
            </div>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
              {t('empty')}
            </h2>
            <p className="text-gray-500 dark:text-gray-400 mb-6 max-w-md mx-auto">
              {t('browseEvents')}
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link href="/events">
                <Button variant="primary" size="lg">
                  {tNav('events')}
                </Button>
              </Link>
              {totalCartItems > 0 && (
                <Link href="/cart">
                  <Button variant="outline" size="lg">
                    {tNav('cart')} ({totalCartItems})
                  </Button>
                </Link>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
