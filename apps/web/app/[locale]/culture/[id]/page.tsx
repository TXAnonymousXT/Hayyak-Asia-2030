'use client';

import { useParams } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { Link } from '@/lib/i18n/navigation';
import { Card, CardBody } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { getCountryById, countries } from '@/lib/data/countries';

export default function CountryDetailPage() {
  const params = useParams();
  const t = useTranslations('culture');
  const tNav = useTranslations('navigation');
  const tEvents = useTranslations('events');
  const country = getCountryById(params.id as string);

  if (!country) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Card className="max-w-md w-full mx-4">
          <CardBody>
            <div className="text-center py-8">
              <span className="text-6xl mb-4 block">🌏</span>
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                {t('noCountriesFound')}
              </h1>
              <p className="text-gray-500 dark:text-gray-400 mb-6">
                {t('noCountriesFound')}
              </p>
              <Link href="/culture">
                <Button variant="primary">{t('exploreMore')}</Button>
              </Link>
            </div>
          </CardBody>
        </Card>
      </div>
    );
  }

  const regionNames: Record<string, string> = {
    'east-asia': t('regions.eastAsia'),
    'south-asia': t('regions.southAsia'),
    'southeast-asia': t('regions.southeastAsia'),
    'west-asia': t('regions.westAsia'),
    'central-asia': t('regions.centralAsia'),
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-br from-purple-600 via-indigo-600 to-purple-800 text-white overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-0 right-0 w-96 h-96 bg-pink-500 rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-500 rounded-full blur-3xl" />
        </div>

        <div className="container mx-auto px-4 py-12 relative">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-sm text-white/70 mb-6">
            <Link href="/" className="hover:text-white">{tNav('home')}</Link>
            <span>/</span>
            <Link href="/culture" className="hover:text-white">{tNav('culture')}</Link>
            <span>/</span>
            <span className="text-white">{country.name}</span>
          </nav>

          <div className="flex flex-col lg:flex-row items-start gap-8">
            {/* Flag */}
            <div className="w-40 h-40 bg-white/10 backdrop-blur-sm rounded-3xl flex items-center justify-center flex-shrink-0 shadow-2xl">
              <span className="text-9xl">{country.flag}</span>
            </div>

            {/* Country Info */}
            <div className="flex-1">
              <Badge variant="glass" size="lg" className="mb-3">
                {regionNames[country.region]}
              </Badge>
              <h1 className="text-4xl md:text-5xl font-bold mb-2">{country.name}</h1>
              <p className="text-2xl text-white/70 mb-4">{country.nativeName}</p>
              <p className="text-lg text-white/80 max-w-2xl mb-6">
                {country.description}
              </p>

              {/* Quick Stats */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4">
                  <div className="text-white/60 text-sm mb-1">🏛️ Capital</div>
                  <div className="font-semibold">{country.capital}</div>
                </div>
                <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4">
                  <div className="text-white/60 text-sm mb-1">👥 Population</div>
                  <div className="font-semibold">{country.population}</div>
                </div>
                <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4">
                  <div className="text-white/60 text-sm mb-1">🗣️ Language</div>
                  <div className="font-semibold text-sm">{country.language}</div>
                </div>
                <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4">
                  <div className="text-white/60 text-sm mb-1">💰 Currency</div>
                  <div className="font-semibold text-sm">{country.currency}</div>
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
            {/* Highlights */}
            <Card>
              <CardBody>
                <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
                  ✨ {t('country.highlights')}
                </h2>
                <div className="flex flex-wrap gap-3">
                  {country.highlights.map((highlight, i) => (
                    <span
                      key={i}
                      className="px-4 py-2 bg-gradient-to-r from-purple-100 to-indigo-100 dark:from-purple-900/30 dark:to-indigo-900/30 text-purple-700 dark:text-purple-300 rounded-xl font-medium"
                    >
                      {highlight}
                    </span>
                  ))}
                </div>
              </CardBody>
            </Card>

            {/* Traditions */}
            <Card>
              <CardBody>
                <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
                  🎎 {t('country.traditions')}
                </h2>
                <div className="space-y-4">
                  {country.traditions.map((tradition, i) => (
                    <div
                      key={i}
                      className="p-4 bg-gray-50 dark:bg-gray-800 rounded-xl"
                    >
                      <h3 className="font-semibold text-gray-900 dark:text-white mb-1">
                        {tradition.name}
                      </h3>
                      <p className="text-gray-600 dark:text-gray-400 text-sm">
                        {tradition.description}
                      </p>
                    </div>
                  ))}
                </div>
              </CardBody>
            </Card>

            {/* Cuisine */}
            <Card>
              <CardBody>
                <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
                  🍽️ {t('country.cuisine')}
                </h2>
                <div className="grid sm:grid-cols-3 gap-4">
                  {country.cuisine.map((dish, i) => (
                    <div
                      key={i}
                      className="p-4 bg-gradient-to-br from-amber-50 to-orange-50 dark:from-amber-900/20 dark:to-orange-900/20 rounded-xl text-center"
                    >
                      <span className="text-4xl mb-2 block">{dish.emoji}</span>
                      <h3 className="font-semibold text-gray-900 dark:text-white mb-1">
                        {dish.name}
                      </h3>
                      <p className="text-gray-600 dark:text-gray-400 text-xs">
                        {dish.description}
                      </p>
                    </div>
                  ))}
                </div>
              </CardBody>
            </Card>

            {/* Athletes */}
            <Card>
              <CardBody>
                <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
                  🏅 {t('country.athletes')}
                </h2>
                <div className="space-y-3">
                  {country.athletes.map((athlete, i) => (
                    <div
                      key={i}
                      className="flex items-center gap-4 p-4 bg-gray-50 dark:bg-gray-800 rounded-xl"
                    >
                      <div className="w-12 h-12 bg-gradient-to-br from-qatar-maroon to-qatar-maroon-dark rounded-full flex items-center justify-center text-white font-bold">
                        {i + 1}
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold text-gray-900 dark:text-white">
                          {athlete.name}
                        </h3>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                          {athlete.sport} • {athlete.achievement}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardBody>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-20 space-y-6">
              {/* Sports */}
              <Card>
                <CardBody>
                  <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-4">
                    ⚽ {t('country.sports')}
                  </h2>
                  <div className="flex flex-wrap gap-2">
                    {country.sports.map((sport, i) => (
                      <Badge key={i} variant="primary" size="sm">
                        {sport}
                      </Badge>
                    ))}
                  </div>
                </CardBody>
              </Card>

              {/* Fun Facts */}
              <Card className="bg-gradient-to-br from-purple-50 to-indigo-50 dark:from-purple-900/20 dark:to-indigo-900/20 border-purple-200 dark:border-purple-800">
                <CardBody>
                  <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-4">
                    💡 {t('country.funFacts')}
                  </h2>
                  <ul className="space-y-3">
                    {country.facts.map((fact, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm text-gray-700 dark:text-gray-300">
                        <span className="text-purple-500 mt-1">•</span>
                        {fact}
                      </li>
                    ))}
                  </ul>
                </CardBody>
              </Card>

              {/* Related Events CTA */}
              <Card className="border-2 border-qatar-maroon/20 dark:border-qatar-gold/20">
                <CardBody>
                  <h3 className="font-bold text-gray-900 dark:text-white mb-2">
                    🎫 {t('country.watchCompete', { country: country.name })}
                  </h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
                    {t('country.getTickets', { country: country.name })}
                  </p>
                  <Link href="/events">
                    <Button variant="primary" fullWidth>
                      {tEvents('card.viewDetails')}
                    </Button>
                  </Link>
                </CardBody>
              </Card>
            </div>
          </div>
        </div>

        {/* Other Countries */}
        <div className="mt-12">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
            {t('exploreMore')}
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {countries
              .filter(c => c.id !== country.id && c.region === country.region)
              .slice(0, 4)
              .map((otherCountry) => (
                <Link key={otherCountry.id} href={`/culture/${otherCountry.id}`}>
                  <Card className="hover:shadow-lg transition-all hover:-translate-y-1">
                    <div className="aspect-video bg-gradient-to-br from-purple-100 to-indigo-100 dark:from-purple-900/30 dark:to-indigo-900/30 flex items-center justify-center">
                      <span className="text-5xl">{otherCountry.flag}</span>
                    </div>
                    <CardBody>
                      <h3 className="font-semibold text-gray-900 dark:text-white">
                        {otherCountry.name}
                      </h3>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        {otherCountry.capital}
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
