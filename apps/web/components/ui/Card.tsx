'use client';

import { forwardRef, type HTMLAttributes, type ReactNode } from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { clsx } from 'clsx';

const cardVariants = cva(
  'rounded-2xl bg-white dark:bg-gray-800 overflow-hidden transition-all duration-300',
  {
    variants: {
      variant: {
        default: 'border border-gray-200 dark:border-gray-700 shadow-sm',
        elevated: 'shadow-card hover:shadow-card-hover',
        outline: 'border-2 border-gray-200 dark:border-gray-700',
        ghost: 'bg-transparent',
        interactive: `
          border border-gray-200 dark:border-gray-700
          cursor-pointer shadow-sm
          hover:border-qatar-maroon/30 hover:shadow-card-hover hover:-translate-y-1
          dark:hover:border-qatar-gold/30
          focus-within:ring-2 focus-within:ring-qatar-maroon focus-within:ring-offset-2
          dark:focus-within:ring-qatar-gold
        `,
        glass: `
          bg-white/10 backdrop-blur-lg border border-white/20
          shadow-lg
        `,
        qatar: `
          border-2 border-qatar-maroon/20 dark:border-qatar-gold/20
          shadow-sm hover:shadow-glow
          dark:hover:shadow-glow-gold
        `,
        gradient: `
          bg-gradient-to-br from-qatar-maroon to-qatar-maroon-dark text-white
          shadow-lg shadow-qatar-maroon/20
        `,
      },
      padding: {
        none: 'p-0',
        sm: 'p-4',
        md: 'p-5',
        lg: 'p-6',
        xl: 'p-8',
      },
    },
    defaultVariants: {
      variant: 'default',
      padding: 'none',
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
 * Enhanced with Qatar 2030 Asian Games branding.
 *
 * Features:
 * - Multiple variants (default, elevated, outline, ghost, interactive, glass, qatar, gradient)
 * - Semantic HTML support (article, section)
 * - Focus indicators for interactive cards
 * - Beautiful shadows and hover effects
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

// Card Header with enhanced styling
export interface CardHeaderProps extends Omit<HTMLAttributes<HTMLDivElement>, 'title'> {
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
        className={clsx('flex items-start justify-between gap-4 p-5 pb-0', className)}
        {...props}
      >
        <div className="flex-1 min-w-0">
          {title && (
            <h3 className="text-lg font-bold text-gray-900 dark:text-white truncate">
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

// Card Body with enhanced styling
export const CardBody = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(
  ({ className, children, ...props }, ref) => {
    return (
      <div ref={ref} className={clsx('p-5', className)} {...props}>
        {children}
      </div>
    );
  }
);

CardBody.displayName = 'CardBody';

// Card Footer with enhanced styling
export const CardFooter = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(
  ({ className, children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={clsx(
          'p-5 pt-0 border-t border-gray-100 dark:border-gray-700/50 flex items-center gap-3 mt-auto',
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

// Card Image with enhanced styling and overlays
export interface CardImageProps extends HTMLAttributes<HTMLDivElement> {
  src: string;
  alt: string;
  aspectRatio?: 'video' | 'square' | 'portrait' | 'wide';
  overlay?: 'none' | 'gradient' | 'dark';
}

export const CardImage = forwardRef<HTMLDivElement, CardImageProps>(
  ({ className, src, alt, aspectRatio = 'video', overlay = 'none', children, ...props }, ref) => {
    const aspectRatioClasses = {
      video: 'aspect-video',
      square: 'aspect-square',
      portrait: 'aspect-[3/4]',
      wide: 'aspect-[2/1]',
    };

    const overlayClasses = {
      none: '',
      gradient: 'after:absolute after:inset-0 after:bg-gradient-to-t after:from-black/60 after:via-transparent after:to-transparent',
      dark: 'after:absolute after:inset-0 after:bg-black/40',
    };

    return (
      <div
        ref={ref}
        className={clsx(
          'relative overflow-hidden bg-gray-100 dark:bg-gray-800',
          aspectRatioClasses[aspectRatio],
          overlayClasses[overlay],
          className
        )}
        {...props}
      >
        <img
          src={src}
          alt={alt}
          className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          loading="lazy"
        />
        {children && (
          <div className="absolute inset-0 z-10 flex flex-col justify-end p-4">
            {children}
          </div>
        )}
      </div>
    );
  }
);

CardImage.displayName = 'CardImage';

// Card Badge for status indicators
export interface CardBadgeProps extends HTMLAttributes<HTMLSpanElement> {
  variant?: 'qatar' | 'gold' | 'success' | 'warning' | 'error' | 'info';
  position?: 'top-start' | 'top-end' | 'bottom-start' | 'bottom-end';
}

export const CardBadge = forwardRef<HTMLSpanElement, CardBadgeProps>(
  ({ className, variant = 'qatar', position = 'top-end', children, ...props }, ref) => {
    const variantClasses = {
      qatar: 'bg-qatar-maroon text-white',
      gold: 'bg-qatar-gold text-qatar-maroon-dark',
      success: 'bg-success-500 text-white',
      warning: 'bg-warning-500 text-white',
      error: 'bg-error-500 text-white',
      info: 'bg-blue-500 text-white',
    };

    const positionClasses = {
      'top-start': 'top-3 start-3',
      'top-end': 'top-3 end-3',
      'bottom-start': 'bottom-3 start-3',
      'bottom-end': 'bottom-3 end-3',
    };

    return (
      <span
        ref={ref}
        className={clsx(
          'absolute z-10 px-3 py-1 text-xs font-bold rounded-full shadow-md',
          variantClasses[variant],
          positionClasses[position],
          className
        )}
        {...props}
      >
        {children}
      </span>
    );
  }
);

CardBadge.displayName = 'CardBadge';

export { cardVariants };
