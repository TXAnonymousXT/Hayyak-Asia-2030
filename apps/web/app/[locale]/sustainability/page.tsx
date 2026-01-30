import { useTranslations } from 'next-intl';
import { setRequestLocale } from 'next-intl/server';
import { Card, CardHeader, CardBody } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';

interface PageProps {
  params: Promise<{ locale: string }>;
}

export default async function SustainabilityPage({ params }: PageProps) {
  const { locale } = await params;
  setRequestLocale(locale);

  return <SustainabilityPageContent />;
}

function SustainabilityPageContent() {
  const t = useTranslations('sustainability');

  const initiatives = [
    {
      icon: '☀️',
      title: 'Solar-Powered Venues',
      description: 'All major venues are powered by solar energy, reducing carbon emissions by 60%.',
      impact: '15,000 tons CO₂ saved',
      category: 'Energy',
    },
    {
      icon: '🚇',
      title: 'Zero-Emission Transport',
      description: 'Electric buses and expanded metro lines connect all venues with zero direct emissions.',
      impact: '100% electric fleet',
      category: 'Transport',
    },
    {
      icon: '💧',
      title: 'Water Conservation',
      description: 'Advanced water recycling systems save millions of liters across all facilities.',
      impact: '40% water reduction',
      category: 'Water',
    },
    {
      icon: '♻️',
      title: 'Waste-Free Games',
      description: 'Comprehensive recycling and composting programs aim for zero waste to landfill.',
      impact: '90% waste diverted',
      category: 'Waste',
    },
    {
      icon: '🌳',
      title: 'Urban Greening',
      description: 'Over 1 million trees planted and green corridors created throughout the city.',
      impact: '1M+ trees planted',
      category: 'Nature',
    },
    {
      icon: '🏗️',
      title: 'Sustainable Construction',
      description: 'All new venues built with recycled materials and designed for future reuse.',
      impact: 'LEED Platinum certified',
      category: 'Building',
    },
  ];

  const tips = [
    {
      icon: '🚶',
      title: 'Walk or Bike',
      description: 'Use dedicated pedestrian paths and bike-sharing stations between nearby venues.',
    },
    {
      icon: '🥤',
      title: 'Bring Your Bottle',
      description: 'Free water refill stations are available at all venues. Skip single-use plastics.',
    },
    {
      icon: '🗑️',
      title: 'Sort Your Waste',
      description: 'Look for color-coded bins: Blue for recycling, Green for compost, Black for general.',
    },
    {
      icon: '📱',
      title: 'Go Digital',
      description: 'Use digital tickets and programs. Save paper and skip the queues.',
    },
    {
      icon: '🌡️',
      title: 'Beat the Heat Smartly',
      description: 'Visit cooled zones instead of using personal fans. Venues have efficient cooling systems.',
    },
    {
      icon: '🍽️',
      title: 'Choose Local',
      description: 'Support local food vendors using sustainably sourced ingredients.',
    },
  ];

  const stats = [
    { value: '100%', label: 'Renewable energy at venues' },
    { value: '0', label: 'Single-use plastics' },
    { value: '60%', label: 'Carbon reduction target' },
    { value: '1M+', label: 'Trees planted' },
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-green-600 to-emerald-500 text-white py-16">
        <div className="container mx-auto px-4">
          <div className="flex items-center gap-3 mb-4">
            <span className="text-4xl">🌿</span>
            <h1 className="text-3xl md:text-4xl font-bold">{t('title')}</h1>
          </div>
          <p className="text-green-100 text-lg max-w-2xl mb-8">
            The 2030 Asian Games are committed to being the most sustainable Games in history.
            Join us in making a difference for our planet.
          </p>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {stats.map((stat, i) => (
              <div key={i} className="bg-white/10 backdrop-blur-sm rounded-xl p-4 text-center">
                <div className="text-3xl md:text-4xl font-bold mb-1">{stat.value}</div>
                <div className="text-sm text-green-100">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* Carbon Tracker */}
        <Card className="mb-8 border-green-200 dark:border-green-800">
          <CardBody>
            <div className="flex flex-col md:flex-row items-center gap-6">
              <div className="w-24 h-24 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center flex-shrink-0">
                <span className="text-5xl">🌍</span>
              </div>
              <div className="flex-1 text-center md:text-start">
                <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                  Your Green Impact
                </h2>
                <p className="text-gray-600 dark:text-gray-400 mb-4">
                  Track your sustainable choices during the Games and see your positive impact.
                </p>
                <div className="flex flex-wrap gap-4 justify-center md:justify-start">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-green-600">2.5 kg</div>
                    <div className="text-sm text-gray-500">CO₂ saved</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-blue-600">15 L</div>
                    <div className="text-sm text-gray-500">Water saved</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-amber-600">8</div>
                    <div className="text-sm text-gray-500">Green actions</div>
                  </div>
                </div>
              </div>
              <Button variant="primary" className="bg-green-600 hover:bg-green-700">
                View Full Report
              </Button>
            </div>
          </CardBody>
        </Card>

        {/* Initiatives */}
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
          🎯 Sustainability Initiatives
        </h2>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 mb-12">
          {initiatives.map((initiative, i) => (
            <Card key={i} className="hover:shadow-lg transition-shadow">
              <CardBody>
                <div className="flex items-start gap-4">
                  <div className="w-14 h-14 bg-green-100 dark:bg-green-900/30 rounded-xl flex items-center justify-center flex-shrink-0">
                    <span className="text-3xl">{initiative.icon}</span>
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <Badge variant="success" size="sm">{initiative.category}</Badge>
                    </div>
                    <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
                      {initiative.title}
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                      {initiative.description}
                    </p>
                    <div className="flex items-center gap-2 text-green-600 dark:text-green-400 font-medium text-sm">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      {initiative.impact}
                    </div>
                  </div>
                </div>
              </CardBody>
            </Card>
          ))}
        </div>

        {/* Tips for Visitors */}
        <Card className="mb-8">
          <CardHeader title="💡 How You Can Help" />
          <CardBody className="p-0">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-gray-200 dark:divide-gray-700">
              {tips.map((tip, i) => (
                <div key={i} className="p-6">
                  <div className="flex items-start gap-3">
                    <span className="text-2xl">{tip.icon}</span>
                    <div>
                      <h3 className="font-semibold text-gray-900 dark:text-white mb-1">
                        {tip.title}
                      </h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        {tip.description}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardBody>
        </Card>

        {/* Pledge Card */}
        <Card className="bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 border-green-200 dark:border-green-800">
          <CardBody>
            <div className="text-center py-6">
              <span className="text-5xl mb-4 block">🤝</span>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">
                Take the Green Pledge
              </h2>
              <p className="text-gray-600 dark:text-gray-400 max-w-lg mx-auto mb-6">
                Commit to sustainable practices during the Games and earn exclusive
                eco-badges and rewards.
              </p>
              <Button variant="primary" size="lg" className="bg-green-600 hover:bg-green-700">
                Take the Pledge
              </Button>
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-4">
                Over 50,000 visitors have already pledged!
              </p>
            </div>
          </CardBody>
        </Card>

        {/* SDG Alignment */}
        <div className="mt-12">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4 text-center">
            Aligned with UN Sustainable Development Goals
          </h2>
          <div className="flex flex-wrap justify-center gap-3">
            {[7, 11, 12, 13, 14, 15].map(sdg => (
              <div
                key={sdg}
                className="w-16 h-16 bg-gradient-to-br from-blue-500 to-green-500 rounded-lg flex items-center justify-center text-white font-bold text-lg shadow-md"
              >
                SDG {sdg}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
