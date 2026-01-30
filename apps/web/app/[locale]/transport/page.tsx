import { useTranslations } from 'next-intl';
import { setRequestLocale } from 'next-intl/server';
import { Card, CardHeader, CardBody } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';

interface PageProps {
  params: Promise<{ locale: string }>;
}

export default async function TransportPage({ params }: PageProps) {
  const { locale } = await params;
  setRequestLocale(locale);

  return <TransportPageContent />;
}

function TransportPageContent() {
  const t = useTranslations('transport');

  const transportOptions = [
    { id: 1, type: 'metro', icon: '🚇', name: 'Doha Metro', route: 'Red Line', frequency: 5, carbonRating: 5, isEco: true },
    { id: 2, type: 'metro', icon: '🚇', name: 'Doha Metro', route: 'Green Line', frequency: 5, carbonRating: 5, isEco: true },
    { id: 3, type: 'bus', icon: '🚌', name: 'Event Shuttle', route: 'Stadium Express', frequency: 10, carbonRating: 4, isEco: true },
    { id: 4, type: 'bus', icon: '🚌', name: 'City Bus', route: 'Route 777', frequency: 15, carbonRating: 4, isEco: true },
    { id: 5, type: 'bicycle', icon: '🚲', name: 'Bike Share', route: 'Multiple Stations', frequency: 0, carbonRating: 5, isEco: true },
    { id: 6, type: 'taxi', icon: '🚕', name: 'Taxi', route: 'On Demand', frequency: 0, carbonRating: 2, isEco: false },
  ];

  const nearbyStops = [
    { name: 'Lusail Metro Station', distance: '500m', type: 'metro', icon: '🚇' },
    { name: 'Stadium Bus Stop', distance: '200m', type: 'bus', icon: '🚌' },
    { name: 'Bike Station A1', distance: '150m', type: 'bicycle', icon: '🚲' },
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <div className="bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 text-white py-12">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl md:text-4xl font-bold mb-2">{t('title')}</h1>
          <p className="text-gray-400">{t('subtitle')}</p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* Route Planner */}
        <Card className="mb-8">
          <CardHeader title="Plan Your Journey" />
          <CardBody>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <Input
                placeholder="From: Your location"
                leftElement={<span className="text-qatar-maroon">📍</span>}
              />
              <Input
                placeholder="To: Select venue"
                leftElement={<span className="text-qatar-gold">📍</span>}
              />
            </div>
            <Button variant="primary" fullWidth>
              Find Routes
            </Button>
          </CardBody>
        </Card>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Transport Options */}
          <div className="lg:col-span-2">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
              {t('tabs.routes')}
            </h2>
            <div className="space-y-4">
              {transportOptions.map((option) => (
                <Card key={option.id} variant="interactive">
                  <div className="p-4 flex items-center gap-4">
                    <div className="text-4xl">{option.icon}</div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="font-semibold text-gray-900 dark:text-white">
                          {option.name}
                        </h3>
                        {option.isEco && (
                          <Badge variant="success" size="sm">
                            {t('eco.greenChoice')} 🌱
                          </Badge>
                        )}
                      </div>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        {option.route}
                      </p>
                      {option.frequency > 0 && (
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                          {t('route.frequency', { minutes: option.frequency })}
                        </p>
                      )}
                    </div>
                    <div className="text-right">
                      <div className="flex items-center gap-1 mb-1">
                        {[...Array(5)].map((_, i) => (
                          <span key={i} className={i < option.carbonRating ? 'text-qatar-gold' : 'text-gray-300'}>
                            🌿
                          </span>
                        ))}
                      </div>
                      <p className="text-xs text-gray-500">{t('eco.carbonRating')}</p>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>

          {/* Nearby Stops & Eco Info */}
          <div className="space-y-6">
            {/* Nearby Stops */}
            <Card>
              <CardHeader title={t('tabs.nearby')} />
              <CardBody>
                <div className="space-y-3">
                  {nearbyStops.map((stop, i) => (
                    <div key={i} className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800">
                      <span className="text-2xl">{stop.icon}</span>
                      <div className="flex-1">
                        <p className="font-medium text-gray-900 dark:text-white text-sm">
                          {stop.name}
                        </p>
                        <p className="text-xs text-gray-500">{stop.distance}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardBody>
            </Card>

            {/* Eco Impact */}
            <Card className="bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-800/50 dark:to-gray-700/50 border-gray-300 dark:border-gray-600">
              <CardHeader
                title={
                  <span className="flex items-center gap-2">
                    🌱 {t('eco.title')}
                  </span>
                }
              />
              <CardBody>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                  {t('eco.description')}
                </p>
                <div className="bg-white dark:bg-gray-800 rounded-lg p-4 text-center">
                  <p className="text-3xl font-bold text-qatar-gold mb-1">2.5 kg</p>
                  <p className="text-sm text-gray-500">CO₂ saved this week</p>
                </div>
              </CardBody>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
