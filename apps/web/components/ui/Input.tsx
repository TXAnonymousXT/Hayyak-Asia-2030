'use client';

import { forwardRef, type InputHTMLAttributes, type ReactNode, useId } from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { clsx } from 'clsx';

const inputVariants = cva(
  `w-full rounded-lg border bg-white dark:bg-gray-900
   text-gray-900 dark:text-gray-100
   placeholder:text-gray-400 dark:placeholder:text-gray-500
   transition-colors duration-200
   focus:outline-none focus:ring-2 focus:ring-offset-0
   disabled:cursor-not-allowed disabled:opacity-50 disabled:bg-gray-50`,
  {
    variants: {
      variant: {
        default: `
          border-gray-300 dark:border-gray-600
          focus:border-primary-500 focus:ring-primary-500/20
        `,
        error: `
          border-error-500
          focus:border-error-500 focus:ring-error-500/20
        `,
        success: `
          border-success-500
          focus:border-success-500 focus:ring-success-500/20
        `,
      },
      size: {
        sm: 'h-9 px-3 text-sm',
        md: 'h-10 px-4 text-base',
        lg: 'h-12 px-4 text-lg',
        // Touch-friendly (44px minimum)
        touch: 'min-h-touch px-4 text-base',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'md',
    },
  }
);

export interface InputProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, 'size'>,
    VariantProps<typeof inputVariants> {
  /** Label text */
  label?: string;
  /** Helper text below input */
  helperText?: string;
  /** Error message */
  error?: string;
  /** Left icon or element */
  leftElement?: ReactNode;
  /** Right icon or element */
  rightElement?: ReactNode;
  /** Hide label visually but keep for screen readers */
  hideLabel?: boolean;
  /** Required field indicator */
  isRequired?: boolean;
}

/**
 * Accessible Input component following WCAG 2.1 AA guidelines.
 *
 * Features:
 * - Proper label association
 * - Error state with aria-invalid and aria-describedby
 * - Helper text support
 * - Left/right elements (icons, buttons)
 * - Touch-friendly sizing option
 */
export const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      className,
      variant,
      size,
      label,
      helperText,
      error,
      leftElement,
      rightElement,
      hideLabel = false,
      isRequired = false,
      id: providedId,
      'aria-describedby': ariaDescribedBy,
      ...props
    },
    ref
  ) => {
    const generatedId = useId();
    const id = providedId || generatedId;
    const helperId = `${id}-helper`;
    const errorId = `${id}-error`;

    const hasError = !!error;
    const currentVariant = hasError ? 'error' : variant;

    // Build aria-describedby
    const describedBy = [
      ariaDescribedBy,
      hasError ? errorId : null,
      helperText && !hasError ? helperId : null,
    ]
      .filter(Boolean)
      .join(' ') || undefined;

    return (
      <div className="w-full">
        {/* Label */}
        {label && (
          <label
            htmlFor={id}
            className={clsx(
              'block mb-1.5 text-sm font-medium text-gray-700 dark:text-gray-300',
              hideLabel && 'sr-only'
            )}
          >
            {label}
            {isRequired && (
              <span className="text-error-500 ms-1" aria-hidden="true">
                *
              </span>
            )}
            {isRequired && <span className="sr-only"> (required)</span>}
          </label>
        )}

        {/* Input wrapper */}
        <div className="relative">
          {/* Left element */}
          {leftElement && (
            <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none text-gray-400">
              {leftElement}
            </div>
          )}

          {/* Input */}
          <input
            ref={ref}
            id={id}
            className={clsx(
              inputVariants({ variant: currentVariant, size }),
              leftElement && 'ps-10',
              rightElement && 'pe-10',
              className
            )}
            aria-invalid={hasError}
            aria-describedby={describedBy}
            aria-required={isRequired}
            {...props}
          />

          {/* Right element */}
          {rightElement && (
            <div className="absolute inset-y-0 end-0 flex items-center pe-3">
              {rightElement}
            </div>
          )}
        </div>

        {/* Error message */}
        {hasError && (
          <p
            id={errorId}
            className="mt-1.5 text-sm text-error-500"
            role="alert"
            aria-live="polite"
          >
            {error}
          </p>
        )}

        {/* Helper text */}
        {helperText && !hasError && (
          <p id={helperId} className="mt-1.5 text-sm text-gray-500 dark:text-gray-400">
            {helperText}
          </p>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';

export { inputVariants };
