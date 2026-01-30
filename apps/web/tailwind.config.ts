import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    '../../packages/ui/src/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        // Qatar Flag Colors - The Heart of Our Brand
        qatar: {
          maroon: '#8D1B3D',
          'maroon-light': '#A62050',
          'maroon-dark': '#6B1530',
          'maroon-darker': '#4A0E22',
          gold: '#D4AF37',
          'gold-light': '#FFD700',
          'gold-dark': '#B8960C',
          white: '#FFFFFF',
        },

        // Primary colors - Qatar Maroon
        primary: {
          50: '#FDF2F4',
          100: '#FCE7EB',
          200: '#F9D0D9',
          300: '#F4A9BB',
          400: '#EC7A96',
          500: '#8D1B3D', // Qatar Maroon - Main
          600: '#7B1735',
          700: '#6B1530',
          800: '#5A1228',
          900: '#4A0E22',
          950: '#2D0815',
        },

        // Secondary colors - Royal Gold
        secondary: {
          50: '#FFFDF5',
          100: '#FFF9E6',
          200: '#FFF0BF',
          300: '#FFE699',
          400: '#FFD966',
          500: '#D4AF37', // Royal Gold - Main
          600: '#B8960C',
          700: '#8B7209',
          800: '#5E4D06',
          900: '#312803',
          950: '#191401',
        },

        // Accent - Elegant Burgundy
        accent: {
          50: '#FBF5F6',
          100: '#F7EAED',
          200: '#EDD5DB',
          300: '#DFB3BE',
          400: '#CD8A9A',
          500: '#B8607A',
          600: '#9E4A63',
          700: '#833D52',
          800: '#6D3545',
          900: '#5C2F3C',
          950: '#33171F',
        },

        // Success - Fresh Green
        success: {
          50: '#ECFDF5',
          100: '#D1FAE5',
          200: '#A7F3D0',
          300: '#6EE7B7',
          400: '#34D399',
          500: '#10B981',
          600: '#059669',
          700: '#047857',
          800: '#065F46',
          900: '#064E3B',
        },

        // Warning - Warm Amber
        warning: {
          50: '#FFFBEB',
          100: '#FEF3C7',
          200: '#FDE68A',
          300: '#FCD34D',
          400: '#FBBF24',
          500: '#F59E0B',
          600: '#D97706',
          700: '#B45309',
          800: '#92400E',
          900: '#78350F',
        },

        // Error - Vivid Red
        error: {
          50: '#FEF2F2',
          100: '#FEE2E2',
          200: '#FECACA',
          300: '#FCA5A5',
          400: '#F87171',
          500: '#EF4444',
          600: '#DC2626',
          700: '#B91C1C',
          800: '#991B1B',
          900: '#7F1D1D',
        },

        // Emergency - High Contrast Red
        emergency: {
          500: '#DC2626',
          600: '#B91C1C',
          700: '#991B1B',
        },
      },

      fontFamily: {
        sans: ['var(--font-inter)', 'system-ui', 'sans-serif'],
        arabic: ['var(--font-noto-sans-arabic)', 'system-ui', 'sans-serif'],
        display: ['var(--font-inter)', 'system-ui', 'sans-serif'],
      },

      fontSize: {
        '2xs': ['0.625rem', { lineHeight: '0.875rem' }],
      },

      spacing: {
        touch: '44px',
        'touch-lg': '48px',
      },

      minHeight: {
        touch: '44px',
      },

      minWidth: {
        touch: '44px',
      },

      borderRadius: {
        '4xl': '2rem',
        '5xl': '2.5rem',
      },

      boxShadow: {
        'glow-sm': '0 0 15px -3px rgba(141, 27, 61, 0.3)',
        'glow': '0 0 25px -5px rgba(141, 27, 61, 0.4)',
        'glow-lg': '0 0 35px -5px rgba(141, 27, 61, 0.5)',
        'glow-gold': '0 0 25px -5px rgba(212, 175, 55, 0.4)',
        'card': '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -2px rgba(0, 0, 0, 0.1)',
        'card-hover': '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1)',
        'inner-glow': 'inset 0 2px 4px 0 rgba(255, 255, 255, 0.06)',
      },

      backgroundImage: {
        // Qatar-inspired gradients
        'gradient-qatar': 'linear-gradient(135deg, #8D1B3D 0%, #6B1530 50%, #4A0E22 100%)',
        'gradient-qatar-light': 'linear-gradient(135deg, #A62050 0%, #8D1B3D 100%)',
        'gradient-gold': 'linear-gradient(135deg, #FFD700 0%, #D4AF37 50%, #B8960C 100%)',
        'gradient-hero': 'linear-gradient(135deg, #8D1B3D 0%, #6B1530 40%, #4A0E22 100%)',
        'gradient-card': 'linear-gradient(180deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0) 100%)',
        'gradient-shine': 'linear-gradient(45deg, transparent 25%, rgba(255,255,255,0.1) 50%, transparent 75%)',
        // Mesh gradients for modern look
        'mesh-qatar': 'radial-gradient(at 40% 20%, #8D1B3D 0px, transparent 50%), radial-gradient(at 80% 0%, #D4AF37 0px, transparent 50%), radial-gradient(at 0% 50%, #6B1530 0px, transparent 50%)',
        // Subtle patterns
        'pattern-dots': 'radial-gradient(circle, #8D1B3D 1px, transparent 1px)',
      },

      animation: {
        'fade-in': 'fadeIn 0.5s ease-out',
        'fade-in-up': 'fadeInUp 0.6s ease-out',
        'fade-in-down': 'fadeInDown 0.6s ease-out',
        'slide-up': 'slideUp 0.4s ease-out',
        'slide-down': 'slideDown 0.4s ease-out',
        'slide-in-right': 'slideInRight 0.4s ease-out',
        'slide-in-left': 'slideInLeft 0.4s ease-out',
        'scale-in': 'scaleIn 0.3s ease-out',
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'pulse-glow': 'pulseGlow 2s ease-in-out infinite',
        'shimmer': 'shimmer 2s linear infinite',
        'float': 'float 6s ease-in-out infinite',
        'spin-slow': 'spin 8s linear infinite',
        'bounce-gentle': 'bounceGentle 2s ease-in-out infinite',
        'gradient-shift': 'gradientShift 8s ease infinite',
        'pop': 'pop 0.3s cubic-bezier(0.68, -0.55, 0.265, 1.55)',
        'wiggle': 'wiggle 0.5s ease-in-out',
      },

      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        fadeInUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        fadeInDown: {
          '0%': { opacity: '0', transform: 'translateY(-20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        slideUp: {
          '0%': { transform: 'translateY(10px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        slideDown: {
          '0%': { transform: 'translateY(-10px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        slideInRight: {
          '0%': { transform: 'translateX(20px)', opacity: '0' },
          '100%': { transform: 'translateX(0)', opacity: '1' },
        },
        slideInLeft: {
          '0%': { transform: 'translateX(-20px)', opacity: '0' },
          '100%': { transform: 'translateX(0)', opacity: '1' },
        },
        scaleIn: {
          '0%': { transform: 'scale(0.9)', opacity: '0' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
        pulseGlow: {
          '0%, 100%': { boxShadow: '0 0 20px rgba(141, 27, 61, 0.4)' },
          '50%': { boxShadow: '0 0 40px rgba(141, 27, 61, 0.8)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        bounceGentle: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-5px)' },
        },
        gradientShift: {
          '0%, 100%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
        },
        pop: {
          '0%': { transform: 'scale(0.95)', opacity: '0' },
          '40%': { transform: 'scale(1.05)' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
        wiggle: {
          '0%, 100%': { transform: 'rotate(0deg)' },
          '25%': { transform: 'rotate(-3deg)' },
          '75%': { transform: 'rotate(3deg)' },
        },
      },

      transitionDuration: {
        '400': '400ms',
      },

      backdropBlur: {
        xs: '2px',
      },
    },
  },
  plugins: [],
};

export default config;
