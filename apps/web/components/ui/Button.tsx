'use client';

import { forwardRef, type ButtonHTMLAttributes, type ReactNode } from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { clsx } from 'clsx';

const buttonVariants = cva(
  // Base styles with focus visibility and touch targets
  `inline-flex items-center justify-center rounded-lg font-medium
   transition-all duration-200 ease-in-out
   focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2
   disabled:pointer-events-none disabled:opacity-50
   select-none active:scale-[0.98]`,
  {
    variants: {
      variant: {
        primary: `
          bg-primary-500 text-white
          hover:bg-primary-600
          focus-visible:ring-primary-500
          shadow-sm hover:shadow-md
        `,
        secondary: `
          bg-secondary-500 text-white
          hover:bg-secondary-600
          focus-visible:ring-secondary-500
          shadow-sm hover:shadow-md
        `,
        outline: `
          border-2 border-gray-300 bg-transparent text-gray-700
          hover:bg-gray-50 hover:border-gray-400
          focus-visible:ring-gray-500
          dark:border-gray-600 dark:text-gray-200 dark:hover:bg-gray-800
        `,
        ghost: `
          bg-transparent text-gray-700
          hover:bg-gray-100
          focus-visible:ring-gray-500
          dark:text-gray-200 dark:hover:bg-gray-800
        `,
        danger: `
          bg-error-500 text-white
          hover:bg-error-600
          focus-visible:ring-error-500
          shadow-sm hover:shadow-md
        `,
        emergency: `
          bg-emergency-500 text-white
          hover:bg-emergency-600
          focus-visible:ring-emergency-500
          shadow-lg hover:shadow-xl
          animate-pulse-slow
        `,
        link: `
          bg-transparent text-primary-500 underline-offset-4
          hover:underline
          focus-visible:ring-primary-500
          p-0 h-auto
        `,
      },
      size: {
        sm: 'h-9 px-3 text-sm gap-1.5',
        md: 'h-10 px-4 text-base gap-2',
        lg: 'h-12 px-6 text-lg gap-2.5',
        xl: 'h-14 px-8 text-xl gap-3',
        // Touch-friendly size (44x44px minimum)
        touch: 'min-h-touch min-w-touch px-4 text-base gap-2',
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
 *
 * Features:
 * - Keyboard accessible (Enter/Space)
 * - Focus visible indicators
 * - Minimum 44x44px touch targets (use size="touch")
 * - Loading state with accessible announcement
 * - Support for icons
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
              <span className="shrink-0" aria-hidden="true">
                {leftIcon}
              </span>
            )}
            {children}
            {rightIcon && (
              <span className="shrink-0" aria-hidden="true">
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

// Loading spinner component
function LoadingSpinner({ className }: { className?: string }) {
  return (
    <svg
      className={clsx('h-4 w-4 animate-spin', className)}
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
