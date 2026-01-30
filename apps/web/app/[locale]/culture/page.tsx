'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { Link } from '@/lib/i18n/navigation';
import { Card, CardBody } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { countries, Country } from '@/lib/data/countries';

export default function CulturePage() {
  const t = useTranslations('culture');
  const [selectedRegion, setSelectedRegion] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');

  const regions = [
    { id: 'all', name: t('regions.all'), emoji: '🌏' },
    { id: 'east-asia', name: t('regions.eastAsia'), emoji: '🎌' },
    { id: 'south-asia', name: t('regions.southAsia'), emoji: '🕌' },
    { id: 'southeast-asia', name: t('regions.southeastAsia'), emoji: '🏝️' },
    { id: 'west-asia', name: t('regions.westAsia'), emoji: '🏜️' },
    { id: 'central-asia', name: t('regions.centralAsia'), emoji: '🏔️' },
  ];

  const filteredCountries = countries.filter(country => {
    const matchesRegion = selectedRegion === 'all' || country.region === selectedRegion;
    const matchesSearch = searchQuery === '' ||
      country.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      country.nativeName.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesRegion && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Hero Header */}
      <div className="relative bg-gradient-to-br from-gray-900 via-qatar-maroon-dark to-gray-900 text-white py-16 overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-0 right-0 w-96 h-96 bg-qatar-gold/40 rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-qatar-maroon/30 rounded-full blur-3xl" />
        </div>
        <div className="container mx-auto px-4 relative">
          <div className="flex items-center gap-3 mb-4">
            <span className="text-5xl">🌏</span>
            <h1 className="text-3xl md:text-4xl font-bold">{t('title')}</h1>
          </div>
          <p className="text-white/80 text-lg max-w-2xl mb-8">{t('subtitle')}</p>

          {/* Search */}
          <div className="max-w-xl">
            <div className="relative">
              <input
                type="search"
                placeholder={t('searchPlaceholder')}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full px-5 py-4 ps-12 rounded-xl bg-white/10 backdrop-blur-md border border-white/20 text-white placeholder:text-white/50 focus:outline-none focus:ring-2 focus:ring-white/50"
              />
              <svg className="w-5 h-5 text-white/50 absolute start-4 top-1/2 -translate-y-1/2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* Region Filters */}
        <div className="flex flex-wrap gap-3 mb-8">
          {regions.map((region) => (
            <button
              key={region.id}
              onClick={() => setSelectedRegion(region.id)}
              className={`flex items-center gap-2 px-4 py-2 rounded-full font-medium transition-all ${
                selectedRegion === region.id
                  ? 'bg-gradient-to-r from-qatar-maroon to-qatar-maroon-dark text-white shadow-lg'
                  : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 border border-gray-200 dark:border-gray-700 hover:border-qatar-maroon dark:hover:border-qatar-gold'
              }`}
            >
              <span>{region.emoji}</span>
              <span>{region.name}</span>
            </button>
          ))}
        </div>

        {/* Results Count */}
        <p className="text-gray-500 dark:text-gray-400 mb-6">
          {t('exploring', { count: filteredCountries.length })}
        </p>

        {/* Countries Grid */}
        {filteredCountries.length > 0 ? (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredCountries.map((country) => (
              <CountryCard key={country.id} country={country} t={t} />
            ))}
          </div>
        ) : (
          <Card>
            <CardBody>
              <div className="text-center py-12">
                <span className="text-6xl mb-4 block">🔍</span>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                  {t('noCountriesFound')}
                </h3>
                <p className="text-gray-500 dark:text-gray-400 mb-4">
                  {t('noCountriesFound')}
                </p>
                <Button variant="outline" onClick={() => { setSelectedRegion('all'); setSearchQuery(''); }}>
                  {t('regions.all')}
                </Button>
              </div>
            </CardBody>
          </Card>
        )}

        {/* Cultural Facts */}
        <section className="mt-16">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 text-center">
            🌟 {t('didYouKnow')}
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            <Card className="bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-800/50 dark:to-gray-700/50 border-gray-300 dark:border-gray-600">
              <CardBody>
                <div className="text-center">
                  <span className="text-4xl mb-3 block">🏆</span>
                  <h3 className="font-bold text-gray-900 dark:text-white mb-2">46 Countries</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {t('countriesCompeting')}
                  </p>
                </div>
              </CardBody>
            </Card>
            <Card className="bg-gradient-to-br from-qatar-maroon/10 to-qatar-maroon/20 dark:from-qatar-maroon/20 dark:to-qatar-maroon/30 border-qatar-maroon/30 dark:border-qatar-maroon/40">
              <CardBody>
                <div className="text-center">
                  <span className="text-4xl mb-3 block">🗣️</span>
                  <h3 className="font-bold text-gray-900 dark:text-white mb-2">2,300+ Languages</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {t('languages')}
                  </p>
                </div>
              </CardBody>
            </Card>
            <Card className="bg-gradient-to-br from-qatar-gold/10 to-qatar-gold/20 dark:from-qatar-gold/10 dark:to-qatar-gold/20 border-qatar-gold/30 dark:border-qatar-gold/40">
              <CardBody>
                <div className="text-center">
                  <span className="text-4xl mb-3 block">🍜</span>
                  <h3 className="font-bold text-gray-900 dark:text-white mb-2">Culinary Paradise</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {t('culinaryParadise')}
                  </p>
                </div>
              </CardBody>
            </Card>
          </div>
        </section>
      </div>
    </div>
  );
}

function CountryCard({ country, t }: { country: Country; t: any }) {
  return (
    <Link href={`/culture/${country.id}`}>
      <Card className="h-full overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-2 group">
        {/* Flag Area */}
        <div className="relative aspect-square bg-gradient-to-br from-gray-200 via-gray-300 to-gray-400 dark:from-gray-700 dark:via-gray-600 dark:to-gray-700 flex items-center justify-center overflow-hidden">
          <span className="text-8xl group-hover:scale-110 transition-transform duration-300">
            {country.flag}
          </span>
          <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
          <div className="absolute bottom-3 left-3 right-3">
            <p className="text-white font-medium text-sm opacity-80">{country.nativeName}</p>
          </div>
        </div>

        {/* Content */}
        <CardBody>
          <h3 className="font-bold text-lg text-gray-900 dark:text-white group-hover:text-qatar-maroon dark:group-hover:text-qatar-gold transition-colors mb-1">
            {country.name}
          </h3>
          <p className="text-sm text-gray-500 dark:text-gray-400 mb-3">
            📍 {country.capital}
          </p>

          {/* Highlights */}
          <div className="flex flex-wrap gap-1 mb-3">
            {country.highlights.slice(0, 3).map((highlight, i) => (
              <span
                key={i}
                className="text-xs bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 px-2 py-1 rounded-full"
              >
                {highlight}
              </span>
            ))}
          </div>

          {/* Quick Stats */}
          <div className="flex items-center justify-between pt-3 border-t border-gray-100 dark:border-gray-700">
            <span className="text-sm text-gray-500 dark:text-gray-400">
              🏅 {country.athletes.length} {t('country.athletes').toLowerCase()}
            </span>
            <span className="text-qatar-maroon dark:text-qatar-gold font-medium text-sm group-hover:translate-x-1 transition-transform">
              {t('country.highlights')} →
            </span>
          </div>
        </CardBody>
      </Card>
    </Link>
  );
}
