import { useTranslations } from 'next-intl';
import { setRequestLocale } from 'next-intl/server';
import { Link } from '@/lib/i18n/navigation';
import { Card, CardHeader, CardBody } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';

interface PageProps {
  params: Promise<{ locale: string }>;
}

export default async function ProfilePage({ params }: PageProps) {
  const { locale } = await params;
  setRequestLocale(locale);

  return <ProfilePageContent />;
}

function ProfilePageContent() {
  const t = useTranslations('profile');

  // For now, show guest user state
  const isLoggedIn = false;

  const menuItems = [
    { icon: '📅', label: t('mySchedule'), href: '/tickets', count: 3 },
    { icon: '❤️', label: t('favorites'), href: '/favorites', count: 12 },
    { icon: '🕐', label: t('history'), href: '/history', count: null },
    { icon: '🔔', label: t('preferences.notifications'), href: '/notifications', count: null },
    { icon: '♿', label: t('preferences.accessibility'), href: '/settings/accessibility', count: null },
    { icon: '🌐', label: t('preferences.language'), href: '/settings/language', count: null },
    { icon: '🔒', label: t('preferences.privacy'), href: '/settings/privacy', count: null },
  ];

  if (!isLoggedIn) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
        {/* Header */}
        <div className="bg-gradient-to-r from-gray-700 to-gray-800 text-white py-12">
          <div className="container mx-auto px-4">
            <h1 className="text-3xl md:text-4xl font-bold mb-2">{t('title')}</h1>
          </div>
        </div>

        <div className="container mx-auto px-4 py-8">
          {/* Guest Card */}
          <Card className="mb-8">
            <CardBody>
              <div className="text-center py-8">
                <div className="w-24 h-24 bg-gray-200 dark:bg-gray-700 rounded-full mx-auto mb-4 flex items-center justify-center">
                  <span className="text-4xl">👤</span>
                </div>
                <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                  {t('guest')}
                </h2>
                <p className="text-gray-500 dark:text-gray-400 mb-6">
                  Sign in to access all features and your personalized experience.
                </p>
                <div className="flex flex-col sm:flex-row gap-3 justify-center">
                  <Button variant="primary" size="lg">
                    {t('signIn')}
                  </Button>
                  <Button variant="outline" size="lg">
                    {t('signUp')}
                  </Button>
                </div>
              </div>
            </CardBody>
          </Card>

          {/* Menu Items */}
          <Card>
            <CardHeader title={t('settings')} />
            <CardBody className="p-0">
              <div className="divide-y divide-gray-200 dark:divide-gray-700">
                {menuItems.slice(4).map((item, i) => (
                  <Link
                    key={i}
                    href={item.href}
                    className="flex items-center gap-4 p-4 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                  >
                    <span className="text-2xl">{item.icon}</span>
                    <span className="flex-1 text-gray-900 dark:text-white">{item.label}</span>
                    <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </Link>
                ))}
              </div>
            </CardBody>
          </Card>
        </div>
      </div>
    );
  }

  // Logged in user view
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <div className="bg-gradient-to-r from-primary-500 to-primary-600 text-white py-12">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl md:text-4xl font-bold mb-2">{t('title')}</h1>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* Profile Card */}
        <Card className="mb-8">
          <CardBody>
            <div className="flex items-center gap-4">
              <div className="w-20 h-20 bg-primary-100 dark:bg-primary-900 rounded-full flex items-center justify-center">
                <span className="text-3xl">👤</span>
              </div>
              <div className="flex-1">
                <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                  Guest User
                </h2>
                <p className="text-gray-500 dark:text-gray-400">guest@example.com</p>
              </div>
              <Button variant="outline" size="sm">
                Edit Profile
              </Button>
            </div>
          </CardBody>
        </Card>

        {/* Menu Items */}
        <Card>
          <CardBody className="p-0">
            <div className="divide-y divide-gray-200 dark:divide-gray-700">
              {menuItems.map((item, i) => (
                <Link
                  key={i}
                  href={item.href}
                  className="flex items-center gap-4 p-4 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                >
                  <span className="text-2xl">{item.icon}</span>
                  <span className="flex-1 text-gray-900 dark:text-white">{item.label}</span>
                  {item.count !== null && (
                    <span className="bg-primary-100 text-primary-600 dark:bg-primary-900 dark:text-primary-400 text-sm px-2 py-1 rounded-full">
                      {item.count}
                    </span>
                  )}
                  <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
              ))}
            </div>
          </CardBody>
        </Card>

        {/* Sign Out */}
        <div className="mt-8 text-center">
          <Button variant="ghost" className="text-red-500 hover:text-red-600">
            {t('signOut')}
          </Button>
        </div>
      </div>
    </div>
  );
}
