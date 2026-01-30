'use client';

import { forwardRef, type ButtonHTMLAttributes, type ReactNode } from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { clsx } from 'clsx';

const buttonVariants = cva(
  // Base styles with focus visibility and touch targets
  `inline-flex items-center justify-center rounded-xl font-semibold
   transition-all duration-300 ease-out
   focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2
   disabled:pointer-events-none disabled:opacity-50
   select-none active:scale-[0.97]`,
  {
    variants: {
      variant: {
        primary: `
          bg-gradient-to-r from-qatar-maroon to-qatar-maroon-light text-white
          hover:from-qatar-maroon-light hover:to-qatar-maroon
          hover:shadow-lg hover:shadow-qatar-maroon/25
          focus-visible:ring-qatar-maroon
          active:shadow-inner
        `,
        secondary: `
          bg-gradient-to-r from-qatar-gold to-qatar-gold-light text-qatar-maroon-dark
          hover:from-qatar-gold-light hover:to-qatar-gold
          hover:shadow-lg hover:shadow-qatar-gold/25
          focus-visible:ring-qatar-gold
        `,
        outline: `
          border-2 border-qatar-maroon/30 bg-transparent text-qatar-maroon
          hover:bg-qatar-maroon/5 hover:border-qatar-maroon
          focus-visible:ring-qatar-maroon
          dark:border-qatar-gold/30 dark:text-qatar-gold dark:hover:bg-qatar-gold/5 dark:hover:border-qatar-gold
        `,
        ghost: `
          bg-transparent text-gray-700
          hover:bg-qatar-maroon/10 hover:text-qatar-maroon
          focus-visible:ring-qatar-maroon
          dark:text-gray-200 dark:hover:bg-qatar-gold/10 dark:hover:text-qatar-gold
        `,
        danger: `
          bg-gradient-to-r from-error-500 to-error-600 text-white
          hover:from-error-600 hover:to-error-500
          hover:shadow-lg hover:shadow-error-500/25
          focus-visible:ring-error-500
        `,
        emergency: `
          bg-gradient-to-r from-emergency-500 to-emergency-600 text-white
          hover:from-emergency-600 hover:to-emergency-700
          focus-visible:ring-emergency-500
          shadow-lg shadow-emergency-500/30 hover:shadow-xl hover:shadow-emergency-500/40
          animate-pulse-slow
        `,
        link: `
          bg-transparent text-qatar-maroon dark:text-qatar-gold underline-offset-4
          hover:underline
          focus-visible:ring-qatar-maroon
          p-0 h-auto
        `,
        glass: `
          bg-white/10 backdrop-blur-md border border-white/20 text-white
          hover:bg-white/20 hover:border-white/30
          focus-visible:ring-white/50
        `,
        gold: `
          bg-gradient-to-r from-qatar-gold via-qatar-gold-light to-qatar-gold text-qatar-maroon-dark font-bold
          hover:shadow-lg hover:shadow-qatar-gold/40
          focus-visible:ring-qatar-gold
          animate-gradient-shift bg-[length:200%_auto]
        `,
      },
      size: {
        sm: 'h-9 px-4 text-sm gap-1.5',
        md: 'h-11 px-5 text-base gap-2',
        lg: 'h-12 px-6 text-lg gap-2.5',
        xl: 'h-14 px-8 text-xl gap-3',
        // Touch-friendly size (44x44px minimum)
        touch: 'min-h-touch min-w-touch px-5 text-base gap-2',
        // Icon-only buttons
        icon: 'h-10 w-10 p-0',
        'icon-sm': 'h-8 w-8 p-0',
        'icon-lg': 'h-12 w-12 p-0',
      },
      fullWidth: {
        true: 'w-full',
        false: '',
      },
    },
    defaultVariants: {
      variant: 'primary',
      size: 'md',
      fullWidth: false,
    },
  }
);

export interface ButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  /** Loading state */
  isLoading?: boolean;
  /** Text shown during loading */
  loadingText?: string;
  /** Icon to show before text */
  leftIcon?: ReactNode;
  /** Icon to show after text */
  rightIcon?: ReactNode;
  /** Accessible label (for icon-only buttons) */
  'aria-label'?: string;
}

/**
 * Accessible Button component following WCAG 2.1 AA guidelines.
 * Enhanced with Qatar 2030 Asian Games branding.
 *
 * Features:
 * - Keyboard accessible (Enter/Space)
 * - Focus visible indicators
 * - Minimum 44x44px touch targets (use size="touch")
 * - Loading state with accessible announcement
 * - Support for icons
 * - Beautiful gradient and shadow effects
 */
export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant,
      size,
      fullWidth,
      isLoading = false,
      loadingText,
      leftIcon,
      rightIcon,
      children,
      disabled,
      type = 'button',
      ...props
    },
    ref
  ) => {
    const isDisabled = disabled || isLoading;

    return (
      <button
        ref={ref}
        type={type}
        className={clsx(buttonVariants({ variant, size, fullWidth }), className)}
        disabled={isDisabled}
        aria-busy={isLoading}
        aria-disabled={isDisabled}
        {...props}
      >
        {isLoading ? (
          <>
            <LoadingSpinner className="shrink-0" aria-hidden="true" />
            <span className="sr-only">Loading</span>
            {loadingText || children}
          </>
        ) : (
          <>
            {leftIcon && (
              <span className="shrink-0 transition-transform group-hover:scale-110" aria-hidden="true">
                {leftIcon}
              </span>
            )}
            {children}
            {rightIcon && (
              <span className="shrink-0 transition-transform group-hover:translate-x-1" aria-hidden="true">
                {rightIcon}
              </span>
            )}
          </>
        )}
      </button>
    );
  }
);

Button.displayName = 'Button';

// Loading spinner component with Qatar colors
function LoadingSpinner({ className }: { className?: string }) {
  return (
    <svg
      className={clsx('h-5 w-5 animate-spin', className)}
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
    >
      <circle
        className="opacity-25"
        cx="12"
        cy="12"
        r="10"
        stroke="currentColor"
        strokeWidth="4"
      />
      <path
        className="opacity-75"
        fill="currentColor"
        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
      />
    </svg>
  );
}

export { buttonVariants };
