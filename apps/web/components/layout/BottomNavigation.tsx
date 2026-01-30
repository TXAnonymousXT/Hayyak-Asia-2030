'use client';

import { useTranslations } from 'next-intl';
import { Link, usePathname } from '@/lib/i18n/navigation';
import { EmergencyButton } from '@/components/ui/EmergencyButton';
import { clsx } from 'clsx';

const navItems = [
  { href: '/', icon: HomeIcon, labelKey: 'home' },
  { href: '/events', icon: EventsIcon, labelKey: 'events' },
  { href: '/tickets', icon: TicketsIcon, labelKey: 'tickets' },
  { href: '/notifications', icon: NotificationsIcon, labelKey: 'notifications' },
  { href: '/profile', icon: ProfileIcon, labelKey: 'profile' },
] as const;

export function BottomNavigation() {
  const t = useTranslations('navigation');
  const pathname = usePathname();

  const handleEmergencyClick = () => {
    window.location.href = 'tel:999';
  };

  return (
    <nav
      className="fixed bottom-0 inset-x-0 z-40 bg-gray-900/98 backdrop-blur-lg border-t border-gray-800 md:hidden safe-area-bottom"
      aria-label="Bottom navigation"
    >
      {/* Subtle gradient accent at top */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-qatar-gold/40 to-transparent" />

      <div className="flex items-center justify-around h-16 px-2">
        {navItems.slice(0, 2).map((item) => (
          <NavItem
            key={item.href}
            href={item.href}
            icon={item.icon}
            label={t(item.labelKey)}
            isActive={pathname === item.href || (item.href !== '/' && pathname.startsWith(item.href))}
          />
        ))}

        {/* Emergency button in center - Enhanced */}
        <div className="relative -mt-6">
          <div className="absolute inset-0 bg-qatar-maroon/20 rounded-full blur-xl animate-pulse-slow" />
          <EmergencyButton
            compact
            onClick={handleEmergencyClick}
            aria-label={t('emergency')}
          />
        </div>

        {navItems.slice(2).map((item) => (
          <NavItem
            key={item.href}
            href={item.href}
            icon={item.icon}
            label={t(item.labelKey)}
            isActive={pathname === item.href || pathname.startsWith(item.href)}
          />
        ))}
      </div>
    </nav>
  );
}

// Individual nav item with Qatar styling
function NavItem({
  href,
  icon: Icon,
  label,
  isActive,
}: {
  href: string;
  icon: React.FC<{ className?: string }>;
  label: string;
  isActive: boolean;
}) {
  return (
    <Link
      href={href}
      className={clsx(
        'flex flex-col items-center justify-center gap-1 min-w-[56px] min-h-touch px-2 py-1 rounded-xl',
        'transition-all duration-300',
        'focus:outline-none focus-visible:ring-2 focus-visible:ring-qatar-gold',
        isActive
          ? 'text-qatar-gold'
          : 'text-gray-500 hover:text-qatar-gold'
      )}
      aria-current={isActive ? 'page' : undefined}
    >
      <div className={clsx(
        'relative',
        isActive && 'after:absolute after:-bottom-1 after:left-1/2 after:-translate-x-1/2 after:w-1 after:h-1 after:rounded-full after:bg-qatar-gold'
      )}>
        <Icon className={clsx(
          'w-6 h-6 transition-transform duration-300',
          isActive && 'scale-110'
        )} />
      </div>
      <span className={clsx(
        'text-xs font-medium truncate transition-all duration-300',
        isActive ? 'font-semibold' : ''
      )}>{label}</span>
    </Link>
  );
}

// Icon components
function HomeIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
      />
    </svg>
  );
}

function EventsIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
      />
    </svg>
  );
}

function TicketsIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M15 5v2m0 4v2m0 4v2M5 5a2 2 0 00-2 2v3a2 2 0 110 4v3a2 2 0 002 2h14a2 2 0 002-2v-3a2 2 0 110-4V7a2 2 0 00-2-2H5z"
      />
    </svg>
  );
}

function NotificationsIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
      />
    </svg>
  );
}

function ProfileIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
      />
    </svg>
  );
}
