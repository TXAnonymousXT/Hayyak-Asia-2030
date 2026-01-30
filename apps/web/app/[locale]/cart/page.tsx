'use client';

import { useTranslations } from 'next-intl';
import { Link } from '@/lib/i18n/navigation';
import { Card, CardBody } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { useCartStore } from '@/lib/store/cartStore';

export default function CartPage() {
  const t = useTranslations('cart');
  const tCommon = useTranslations('common');
  const tNav = useTranslations('navigation');
  const { items, removeItem, updateQuantity, clearCart, getTotalPrice } = useCartStore();

  const serviceFee = Math.round(getTotalPrice() * 0.05);
  const totalWithFees = getTotalPrice() + serviceFee;

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-US', {
      weekday: 'short',
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
  };

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
        <div className="container mx-auto px-4 py-16">
          <div className="max-w-md mx-auto text-center">
            <div className="w-24 h-24 bg-gray-100 dark:bg-gray-800 rounded-full mx-auto mb-6 flex items-center justify-center">
              <span className="text-5xl">🛒</span>
            </div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
              {t('empty')}
            </h1>
            <p className="text-gray-500 dark:text-gray-400 mb-8">
              {t('emptyDescription')}
            </p>
            <Link href="/events">
              <Button variant="primary" size="lg">
                {tNav('events')}
              </Button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <div className="bg-gradient-to-r from-qatar-maroon to-qatar-maroon-dark text-white py-8">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl md:text-4xl font-bold">🛒 {t('title')}</h1>
          <p className="text-white/70 mt-2">{t('itemsInCart', { count: items.length })}</p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            {items.map((item) => (
              <Card key={item.id} className="overflow-hidden">
                <CardBody>
                  <div className="flex flex-col sm:flex-row gap-4">
                    {/* Event Icon */}
                    <div className="w-full sm:w-24 h-24 bg-gradient-to-br from-qatar-maroon to-qatar-maroon-dark rounded-xl flex items-center justify-center flex-shrink-0">
                      <span className="text-4xl">{item.sportEmoji}</span>
                    </div>

                    {/* Event Details */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-4">
                        <div>
                          <Link href={`/events/${item.eventId}`}>
                            <h3 className="font-bold text-lg text-gray-900 dark:text-white hover:text-qatar-maroon dark:hover:text-qatar-gold">
                              {item.eventName}
                            </h3>
                          </Link>
                          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                            {item.sport}
                          </p>
                        </div>
                        <button
                          onClick={() => removeItem(item.id)}
                          className="text-gray-400 hover:text-red-500 transition-colors p-1"
                          aria-label={tCommon('delete')}
                        >
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                          </svg>
                        </button>
                      </div>

                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mt-3 text-sm">
                        <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-2">
                          <span className="text-gray-500 dark:text-gray-400">📅</span>
                          <span className="ms-1 text-gray-900 dark:text-white">{formatDate(item.eventDate)}</span>
                        </div>
                        <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-2">
                          <span className="text-gray-500 dark:text-gray-400">🕐</span>
                          <span className="ms-1 text-gray-900 dark:text-white">{item.eventTime}</span>
                        </div>
                        <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-2">
                          <span className="text-gray-500 dark:text-gray-400">📍</span>
                          <span className="ms-1 text-gray-900 dark:text-white truncate">{item.venue}</span>
                        </div>
                        <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-2">
                          <span className="text-gray-500 dark:text-gray-400">💺</span>
                          <span className="ms-1 text-gray-900 dark:text-white truncate">{item.section}</span>
                        </div>
                      </div>

                      <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-100 dark:border-gray-700">
                        {/* Quantity */}
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            className="w-8 h-8 rounded-lg border border-gray-300 dark:border-gray-600 flex items-center justify-center hover:bg-gray-50 dark:hover:bg-gray-800"
                          >
                            -
                          </button>
                          <span className="w-8 text-center font-semibold text-gray-900 dark:text-white">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            className="w-8 h-8 rounded-lg border border-gray-300 dark:border-gray-600 flex items-center justify-center hover:bg-gray-50 dark:hover:bg-gray-800"
                          >
                            +
                          </button>
                        </div>

                        {/* Price */}
                        <div className="text-right">
                          <p className="text-sm text-gray-500 dark:text-gray-400">
                            {item.price} QAR × {item.quantity}
                          </p>
                          <p className="text-xl font-bold text-qatar-maroon dark:text-qatar-gold">
                            {item.price * item.quantity} QAR
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardBody>
              </Card>
            ))}

            {/* Clear Cart */}
            <div className="flex justify-end">
              <Button variant="ghost" onClick={clearCart} className="text-red-500 hover:text-red-600">
                🗑️ {t('clearCart')}
              </Button>
            </div>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="sticky top-20">
              <Card className="border-2 border-qatar-maroon/20 dark:border-qatar-gold/20">
                <CardBody>
                  <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6">
                    {t('orderSummary')}
                  </h2>

                  {/* Items Summary */}
                  <div className="space-y-3 mb-6">
                    {items.map((item) => (
                      <div key={item.id} className="flex justify-between text-sm">
                        <span className="text-gray-600 dark:text-gray-400 truncate flex-1 me-2">
                          {item.eventName} × {item.quantity}
                        </span>
                        <span className="text-gray-900 dark:text-white font-medium">
                          {item.price * item.quantity} QAR
                        </span>
                      </div>
                    ))}
                  </div>

                  <div className="border-t border-gray-200 dark:border-gray-700 pt-4 space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600 dark:text-gray-400">{t('subtotal')}</span>
                      <span className="text-gray-900 dark:text-white">{getTotalPrice()} QAR</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600 dark:text-gray-400">{t('serviceFee')} (5%)</span>
                      <span className="text-gray-900 dark:text-white">{serviceFee} QAR</span>
                    </div>
                  </div>

                  <div className="border-t border-gray-200 dark:border-gray-700 mt-4 pt-4">
                    <div className="flex justify-between">
                      <span className="text-lg font-bold text-gray-900 dark:text-white">{t('total')}</span>
                      <span className="text-2xl font-bold text-qatar-maroon dark:text-qatar-gold">
                        {totalWithFees} QAR
                      </span>
                    </div>
                  </div>

                  <Button variant="primary" size="lg" fullWidth className="mt-6">
                    💳 {t('proceedToCheckout')}
                  </Button>

                  <p className="text-xs text-gray-500 dark:text-gray-400 text-center mt-4">
                    {t('termsAgreement')}
                  </p>
                </CardBody>
              </Card>

              {/* Promo Code */}
              <Card className="mt-4">
                <CardBody>
                  <h3 className="font-semibold text-gray-900 dark:text-white mb-3">
                    🎁 {t('promoCode')}
                  </h3>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      placeholder={t('enterCode')}
                      className="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-qatar-maroon dark:focus:ring-qatar-gold"
                    />
                    <Button variant="outline">{t('apply')}</Button>
                  </div>
                </CardBody>
              </Card>

              {/* Security Note */}
              <div className="mt-4 flex items-center gap-3 text-sm text-gray-500 dark:text-gray-400">
                <span className="text-2xl">🔒</span>
                <span>{t('securePayment')}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
