'use client';

import { clsx } from 'clsx';

interface LogoProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  variant?: 'full' | 'icon' | 'text';
  className?: string;
}

export function Logo({ size = 'md', variant = 'full', className }: LogoProps) {
  const sizes = {
    sm: { icon: 32, text: 'text-lg' },
    md: { icon: 40, text: 'text-xl' },
    lg: { icon: 56, text: 'text-2xl' },
    xl: { icon: 72, text: 'text-3xl' },
  };

  const { icon: iconSize, text: textSize } = sizes[size];

  const LogoIcon = () => (
    <svg
      width={iconSize}
      height={iconSize}
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="flex-shrink-0"
    >
      {/* Background circle with Qatar maroon */}
      <circle cx="50" cy="50" r="48" fill="url(#maroonGradient)" />

      {/* Inner decorative ring */}
      <circle cx="50" cy="50" r="42" fill="none" stroke="rgba(255,255,255,0.2)" strokeWidth="1" />

      {/* Qatar flag serrated pattern (simplified) */}
      <path
        d="M25 20 L35 25 L25 30 L35 35 L25 40 L35 45 L25 50 L35 55 L25 60 L35 65 L25 70 L35 75 L25 80"
        stroke="white"
        strokeWidth="2"
        fill="none"
        opacity="0.3"
      />

      {/* Stylized "H" for Hayyak with athletic feel */}
      <path
        d="M40 30 L40 70 M40 50 L60 50 M60 30 L60 70"
        stroke="white"
        strokeWidth="6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      {/* Dynamic swoosh representing movement/sports */}
      <path
        d="M30 75 Q50 65 75 72"
        stroke="url(#goldGradient)"
        strokeWidth="4"
        strokeLinecap="round"
        fill="none"
      />

      {/* Star accent */}
      <path
        d="M72 28 L74 33 L79 33 L75 37 L77 42 L72 39 L67 42 L69 37 L65 33 L70 33 Z"
        fill="url(#goldGradient)"
      />

      {/* Gradients */}
      <defs>
        <linearGradient id="maroonGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#8D1B3D" />
          <stop offset="50%" stopColor="#6B1530" />
          <stop offset="100%" stopColor="#4A0E22" />
        </linearGradient>
        <linearGradient id="goldGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#FFD700" />
          <stop offset="50%" stopColor="#FFC125" />
          <stop offset="100%" stopColor="#DAA520" />
        </linearGradient>
      </defs>
    </svg>
  );

  const LogoText = () => (
    <div className={clsx('font-bold tracking-tight', textSize)}>
      <span className="bg-gradient-to-r from-qatar-maroon via-qatar-maroon-light to-qatar-maroon bg-clip-text text-transparent">
        Hayyak
      </span>
      <span className="text-qatar-gold ms-1">2030</span>
    </div>
  );

  if (variant === 'icon') {
    return <LogoIcon />;
  }

  if (variant === 'text') {
    return <LogoText />;
  }

  return (
    <div className={clsx('flex items-center gap-2', className)}>
      <LogoIcon />
      <LogoText />
    </div>
  );
}

// Animated version for splash/loading screens
export function AnimatedLogo({ className }: { className?: string }) {
  return (
    <div className={clsx('flex flex-col items-center gap-4', className)}>
      <div className="relative">
        {/* Pulsing ring */}
        <div className="absolute inset-0 animate-ping">
          <svg width="100" height="100" viewBox="0 0 100 100">
            <circle cx="50" cy="50" r="48" fill="none" stroke="#8D1B3D" strokeWidth="2" opacity="0.3" />
          </svg>
        </div>

        {/* Main logo */}
        <Logo size="xl" variant="icon" />
      </div>

      <div className="text-center">
        <h1 className="text-3xl font-bold">
          <span className="bg-gradient-to-r from-qatar-maroon to-qatar-maroon-light bg-clip-text text-transparent">
            Hayyak
          </span>
          <span className="text-qatar-gold ms-2">Asia 2030</span>
        </h1>
        <p className="text-gray-500 dark:text-gray-400 mt-1 text-sm tracking-widest uppercase">
          Qatar Asian Games
        </p>
      </div>
    </div>
  );
}
