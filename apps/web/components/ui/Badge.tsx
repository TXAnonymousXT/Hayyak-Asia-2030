'use client';

import { forwardRef, type HTMLAttributes } from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { clsx } from 'clsx';

const badgeVariants = cva(
  'inline-flex items-center justify-center font-semibold rounded-full transition-all duration-200',
  {
    variants: {
      variant: {
        default: 'bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300',
        primary: 'bg-qatar-maroon/10 text-qatar-maroon dark:bg-qatar-maroon/20 dark:text-qatar-gold',
        secondary: 'bg-qatar-gold/10 text-qatar-gold-dark dark:bg-qatar-gold/20 dark:text-qatar-gold',
        qatar: 'bg-gradient-to-r from-qatar-maroon to-qatar-maroon-light text-white shadow-sm',
        gold: 'bg-gradient-to-r from-qatar-gold to-qatar-gold-light text-qatar-maroon-dark shadow-sm',
        success: 'bg-success-50 text-success-700 dark:bg-success-900/30 dark:text-success-400',
        warning: 'bg-warning-50 text-warning-700 dark:bg-warning-900/30 dark:text-warning-400',
        error: 'bg-error-50 text-error-700 dark:bg-error-900/30 dark:text-error-400',
        live: 'bg-red-500 text-white animate-pulse shadow-md shadow-red-500/30',
        outline: 'border-2 border-qatar-maroon/30 text-qatar-maroon bg-transparent dark:border-qatar-gold/30 dark:text-qatar-gold',
        glass: 'bg-white/20 backdrop-blur-sm text-white border border-white/30',
      },
      size: {
        sm: 'text-xs px-2.5 py-0.5',
        md: 'text-sm px-3 py-1',
        lg: 'text-base px-4 py-1.5',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'md',
    },
  }
);

export interface BadgeProps
  extends HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof badgeVariants> {
  /** Show a dot indicator */
  dot?: boolean;
  /** Color of the dot */
  dotColor?: string;
  /** Show a glow effect */
  glow?: boolean;
}

/**
 * Badge component for status indicators and labels.
 * Enhanced with Qatar 2030 Asian Games branding.
 *
 * Features:
 * - Multiple color variants including Qatar-themed
 * - Optional dot indicator with animation
 * - Live status variant with pulsing animation
 * - Glass morphism variant for overlays
 * - Glow effects for emphasis
 */
export const Badge = forwardRef<HTMLSpanElement, BadgeProps>(
  ({ className, variant, size, dot, dotColor, glow, children, ...props }, ref) => {
    return (
      <span
        ref={ref}
        className={clsx(
          badgeVariants({ variant, size }),
          glow && 'shadow-glow-sm',
          className
        )}
        {...props}
      >
        {dot && (
          <span
            className={clsx(
              'w-2 h-2 rounded-full me-2',
              variant === 'live' && 'animate-ping absolute',
              dotColor || (variant === 'live' ? 'bg-white' : 'bg-current')
            )}
            aria-hidden="true"
          />
        )}
        {dot && variant === 'live' && (
          <span
            className="w-2 h-2 rounded-full me-2 bg-white relative"
            aria-hidden="true"
          />
        )}
        {children}
      </span>
    );
  }
);

Badge.displayName = 'Badge';

export { badgeVariants };
