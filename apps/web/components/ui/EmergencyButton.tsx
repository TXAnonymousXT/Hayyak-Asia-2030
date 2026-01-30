'use client';

import { forwardRef, type ButtonHTMLAttributes } from 'react';
import { clsx } from 'clsx';

export interface EmergencyButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement> {
  /** Compact mode for bottom navigation */
  compact?: boolean;
}

/**
 * Emergency Button - High visibility, always accessible contact button.
 * Enhanced with premium styling for the 2030 Asian Games.
 *
 * Features:
 * - High contrast red design with gradient
 * - Large touch target (minimum 44x44px)
 * - Pulsing glow animation for attention
 * - Screen reader accessible
 * - RTL support
 */
export const EmergencyButton = forwardRef<HTMLButtonElement, EmergencyButtonProps>(
  ({ className, compact = false, onClick, ...props }, ref) => {
    return (
      <button
        ref={ref}
        type="button"
        className={clsx(
          // Base styles
          'relative inline-flex items-center justify-center gap-2',
          'bg-gradient-to-br from-red-500 via-red-600 to-red-700 text-white font-bold',
          'rounded-full',
          'transition-all duration-300',
          // Shadow and glow effects
          'shadow-lg shadow-red-500/40',
          'hover:shadow-xl hover:shadow-red-500/50 hover:scale-105',
          // Focus styles
          'focus:outline-none focus-visible:ring-4 focus-visible:ring-red-500/50 focus-visible:ring-offset-2',
          'active:scale-95',
          // Size based on compact mode
          compact
            ? 'min-h-touch min-w-touch p-3 text-sm'
            : 'min-h-[60px] px-8 py-4 text-lg',
          className
        )}
        onClick={onClick}
        aria-label={props['aria-label'] || 'Emergency contact'}
        {...props}
      >
        {/* Animated glow ring */}
        <span
          className={clsx(
            'absolute inset-0 rounded-full',
            'bg-gradient-to-br from-red-400 to-red-600',
            'animate-ping opacity-30',
            compact ? '' : ''
          )}
          aria-hidden="true"
        />

        {/* Inner glow */}
        <span
          className="absolute inset-0.5 rounded-full bg-gradient-to-br from-red-500 to-red-700"
          aria-hidden="true"
        />

        {/* Content container */}
        <span className="relative flex items-center gap-2">
          {/* Emergency icon */}
          <svg
            className={clsx('shrink-0 drop-shadow-md', compact ? 'w-6 h-6' : 'w-7 h-7')}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2.5}
              d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
            />
          </svg>

          {/* Text (hidden in compact mode) */}
          {!compact && (
            <span className="drop-shadow-sm tracking-wide">Emergency</span>
          )}
        </span>

        {/* Pulsing dot indicator */}
        <span
          className={clsx(
            'absolute rounded-full bg-white',
            'animate-ping',
            compact ? '-top-0.5 -end-0.5 w-3 h-3' : '-top-1 -end-1 w-4 h-4'
          )}
          aria-hidden="true"
        />
        <span
          className={clsx(
            'absolute rounded-full bg-white shadow-lg',
            compact ? '-top-0.5 -end-0.5 w-3 h-3' : '-top-1 -end-1 w-4 h-4'
          )}
          aria-hidden="true"
        />
      </button>
    );
  }
);

EmergencyButton.displayName = 'EmergencyButton';
