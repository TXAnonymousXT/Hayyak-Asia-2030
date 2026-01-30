'use client';

import { useTranslations } from 'next-intl';
import { Card, CardHeader, CardBody } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';

export default function EmergencyPage() {
  const t = useTranslations('emergency');

  const emergencyContacts = [
    { type: 'police', icon: '👮', name: t('contacts.police'), number: '999', primary: true },
    { type: 'ambulance', icon: '🚑', name: t('contacts.ambulance'), number: '999', primary: true },
    { type: 'fire', icon: '🚒', name: t('contacts.fire'), number: '999', primary: true },
    { type: 'medicalCenter', icon: '🏥', name: t('contacts.medicalCenter'), number: '+974 4439 5000', primary: false },
    { type: 'security', icon: '🛡️', name: t('contacts.security'), number: '+974 4000 2030', primary: false },
    { type: 'lostFound', icon: '📦', name: t('contacts.lostFound'), number: '+974 4000 2031', primary: false },
  ];

  const embassies = [
    { country: '🇺🇸 USA', number: '+974 4496 6000' },
    { country: '🇬🇧 UK', number: '+974 4496 2000' },
    { country: '🇮🇳 India', number: '+974 4425 5777' },
    { country: '🇨🇳 China', number: '+974 4493 2203' },
    { country: '🇯🇵 Japan', number: '+974 4440 0888' },
    { country: '🇰🇷 Korea', number: '+974 4483 2238' },
  ];

  const handleCall = (number: string) => {
    window.location.href = `tel:${number.replace(/\s/g, '')}`;
  };

  const handleShareLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          alert(`Your location:\nLatitude: ${latitude}\nLongitude: ${longitude}\n\nShare this with emergency services.`);
        },
        () => {
          alert('Unable to get your location. Please enable location services.');
        }
      );
    } else {
      alert('Geolocation is not supported by your browser.');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <div className="bg-gradient-to-r from-red-500 to-red-600 text-white py-12">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl md:text-4xl font-bold mb-2">{t('title')}</h1>
          <p className="text-white/80">{t('subtitle')}</p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* Main Emergency Button */}
        <div className="mb-8">
          <button
            onClick={() => handleCall('999')}
            className="w-full bg-red-500 hover:bg-red-600 text-white rounded-2xl p-8 text-center shadow-lg transition-all hover:shadow-xl active:scale-[0.98]"
          >
            <div className="text-6xl mb-4">🆘</div>
            <h2 className="text-2xl font-bold mb-2">{t('button')}</h2>
            <p className="text-white/80 mb-4">Tap to call 999</p>
            <div className="inline-flex items-center gap-2 bg-white/20 px-4 py-2 rounded-full">
              <span className="animate-pulse w-3 h-3 bg-white rounded-full"></span>
              Available 24/7
            </div>
          </button>
        </div>

        {/* Share Location Button */}
        <div className="mb-8">
          <Button
            variant="outline"
            fullWidth
            size="lg"
            onClick={handleShareLocation}
            className="border-2"
          >
            📍 {t('actions.shareLocation')}
          </Button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Emergency Contacts */}
          <Card>
            <CardHeader title="Emergency Contacts" />
            <CardBody>
              <div className="space-y-3">
                {emergencyContacts.map((contact, i) => (
                  <button
                    key={i}
                    onClick={() => handleCall(contact.number)}
                    className="w-full flex items-center gap-4 p-3 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors text-left"
                  >
                    <span className="text-3xl">{contact.icon}</span>
                    <div className="flex-1">
                      <p className="font-semibold text-gray-900 dark:text-white">
                        {contact.name}
                      </p>
                      <p className="text-sm text-gray-500">{contact.number}</p>
                    </div>
                    {contact.primary && (
                      <span className="text-xs bg-red-100 text-red-600 px-2 py-1 rounded-full">
                        Primary
                      </span>
                    )}
                    <span className="text-primary-500">📞</span>
                  </button>
                ))}
              </div>
            </CardBody>
          </Card>

          {/* Embassies */}
          <Card>
            <CardHeader title={t('contacts.embassy')} />
            <CardBody>
              <div className="space-y-3">
                {embassies.map((embassy, i) => (
                  <button
                    key={i}
                    onClick={() => handleCall(embassy.number)}
                    className="w-full flex items-center gap-4 p-3 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors text-left"
                  >
                    <span className="text-2xl">{embassy.country.split(' ')[0]}</span>
                    <div className="flex-1">
                      <p className="font-semibold text-gray-900 dark:text-white">
                        {embassy.country.split(' ').slice(1).join(' ')} Embassy
                      </p>
                      <p className="text-sm text-gray-500">{embassy.number}</p>
                    </div>
                    <span className="text-primary-500">📞</span>
                  </button>
                ))}
              </div>
              <p className="text-xs text-gray-400 mt-4 text-center">
                Contact your country's embassy for consular assistance
              </p>
            </CardBody>
          </Card>
        </div>

        {/* Safety Tips */}
        <Card className="mt-8">
          <CardHeader title="Safety Tips" />
          <CardBody>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-xl">
                <div className="text-2xl mb-2">📱</div>
                <h4 className="font-semibold text-gray-900 dark:text-white mb-1">Keep Phone Charged</h4>
                <p className="text-sm text-gray-500">Always keep your phone charged for emergencies.</p>
              </div>
              <div className="p-4 bg-green-50 dark:bg-green-900/20 rounded-xl">
                <div className="text-2xl mb-2">🗺️</div>
                <h4 className="font-semibold text-gray-900 dark:text-white mb-1">Know Your Location</h4>
                <p className="text-sm text-gray-500">Be aware of venue exits and meeting points.</p>
              </div>
              <div className="p-4 bg-orange-50 dark:bg-orange-900/20 rounded-xl">
                <div className="text-2xl mb-2">💧</div>
                <h4 className="font-semibold text-gray-900 dark:text-white mb-1">Stay Hydrated</h4>
                <p className="text-sm text-gray-500">Drink plenty of water, especially outdoors.</p>
              </div>
            </div>
          </CardBody>
        </Card>
      </div>
    </div>
  );
}
