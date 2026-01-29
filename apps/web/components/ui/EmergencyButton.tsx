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
 *
 * Features:
 * - High contrast red design
 * - Large touch target (minimum 44x44px)
 * - Pulsing animation for attention
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
          'inline-flex items-center justify-center gap-2',
          'bg-emergency-500 text-white font-bold',
          'rounded-full shadow-lg',
          'transition-all duration-200',
          'hover:bg-emergency-600 hover:shadow-xl hover:scale-105',
          'focus:outline-none focus-visible:ring-4 focus-visible:ring-emergency-500/50 focus-visible:ring-offset-2',
          'active:scale-95',
          // Size based on compact mode
          compact
            ? 'min-h-touch min-w-touch p-2 text-sm'
            : 'min-h-[56px] px-6 py-3 text-lg',
          className
        )}
        onClick={onClick}
        aria-label={props['aria-label'] || 'Emergency contact'}
        {...props}
      >
        {/* Emergency icon */}
        <svg
          className={clsx('shrink-0', compact ? 'w-5 h-5' : 'w-6 h-6')}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
          />
        </svg>

        {/* Text (hidden in compact mode) */}
        {!compact && <span>Emergency</span>}

        {/* Pulsing dot indicator */}
        <span
          className={clsx(
            'absolute rounded-full bg-white',
            'animate-ping opacity-75',
            compact ? '-top-0.5 -end-0.5 w-2 h-2' : '-top-1 -end-1 w-3 h-3'
          )}
          aria-hidden="true"
        />
        <span
          className={clsx(
            'absolute rounded-full bg-white',
            compact ? '-top-0.5 -end-0.5 w-2 h-2' : '-top-1 -end-1 w-3 h-3'
          )}
          aria-hidden="true"
        />
      </button>
    );
  }
);

EmergencyButton.displayName = 'EmergencyButton';
