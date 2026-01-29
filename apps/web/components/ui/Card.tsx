'use client';

import { forwardRef, type HTMLAttributes, type ReactNode } from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { clsx } from 'clsx';

const cardVariants = cva(
  'rounded-xl bg-white dark:bg-gray-900 overflow-hidden transition-all duration-200',
  {
    variants: {
      variant: {
        default: 'border border-gray-200 dark:border-gray-700',
        elevated: 'shadow-md hover:shadow-lg',
        outline: 'border-2 border-gray-200 dark:border-gray-700',
        ghost: 'bg-transparent',
        interactive: `
          border border-gray-200 dark:border-gray-700
          cursor-pointer
          hover:border-primary-300 hover:shadow-md
          focus-within:ring-2 focus-within:ring-primary-500 focus-within:ring-offset-2
        `,
      },
      padding: {
        none: 'p-0',
        sm: 'p-3',
        md: 'p-4',
        lg: 'p-6',
      },
    },
    defaultVariants: {
      variant: 'default',
      padding: 'md',
    },
  }
);

export interface CardProps
  extends HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof cardVariants> {
  /** Make the entire card a link (use with variant="interactive") */
  as?: 'div' | 'article' | 'section';
}

/**
 * Card component for containing content.
 *
 * Features:
 * - Multiple variants (default, elevated, outline, ghost, interactive)
 * - Semantic HTML support (article, section)
 * - Focus indicators for interactive cards
 */
export const Card = forwardRef<HTMLDivElement, CardProps>(
  ({ className, variant, padding, as: Component = 'div', children, ...props }, ref) => {
    return (
      <Component
        ref={ref}
        className={clsx(cardVariants({ variant, padding }), className)}
        {...props}
      >
        {children}
      </Component>
    );
  }
);

Card.displayName = 'Card';

// Card Header
export interface CardHeaderProps extends HTMLAttributes<HTMLDivElement> {
  /** Title of the card */
  title?: ReactNode;
  /** Subtitle or description */
  subtitle?: ReactNode;
  /** Action buttons or elements */
  action?: ReactNode;
}

export const CardHeader = forwardRef<HTMLDivElement, CardHeaderProps>(
  ({ className, title, subtitle, action, children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={clsx('flex items-start justify-between gap-4', className)}
        {...props}
      >
        <div className="flex-1 min-w-0">
          {title && (
            <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 truncate">
              {title}
            </h3>
          )}
          {subtitle && (
            <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
              {subtitle}
            </p>
          )}
          {children}
        </div>
        {action && <div className="shrink-0">{action}</div>}
      </div>
    );
  }
);

CardHeader.displayName = 'CardHeader';

// Card Body
export const CardBody = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(
  ({ className, children, ...props }, ref) => {
    return (
      <div ref={ref} className={clsx('mt-4', className)} {...props}>
        {children}
      </div>
    );
  }
);

CardBody.displayName = 'CardBody';

// Card Footer
export const CardFooter = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(
  ({ className, children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={clsx(
          'mt-4 pt-4 border-t border-gray-200 dark:border-gray-700 flex items-center gap-3',
          className
        )}
        {...props}
      >
        {children}
      </div>
    );
  }
);

CardFooter.displayName = 'CardFooter';

// Card Image
export interface CardImageProps extends HTMLAttributes<HTMLDivElement> {
  src: string;
  alt: string;
  aspectRatio?: 'video' | 'square' | 'portrait';
}

export const CardImage = forwardRef<HTMLDivElement, CardImageProps>(
  ({ className, src, alt, aspectRatio = 'video', ...props }, ref) => {
    const aspectRatioClasses = {
      video: 'aspect-video',
      square: 'aspect-square',
      portrait: 'aspect-[3/4]',
    };

    return (
      <div
        ref={ref}
        className={clsx(
          'relative overflow-hidden bg-gray-100 dark:bg-gray-800',
          aspectRatioClasses[aspectRatio],
          className
        )}
        {...props}
      >
        <img
          src={src}
          alt={alt}
          className="absolute inset-0 w-full h-full object-cover"
          loading="lazy"
        />
      </div>
    );
  }
);

CardImage.displayName = 'CardImage';

export { cardVariants };
