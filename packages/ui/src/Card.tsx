'use client';

import { forwardRef, type HTMLAttributes } from 'react';
import { clsx } from 'clsx';

export interface CardProps extends HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'elevated' | 'interactive';
  as?: 'div' | 'article' | 'section';
}

export const Card = forwardRef<HTMLDivElement, CardProps>(
  ({ className, variant = 'default', as: Component = 'div', children, ...props }, ref) => {
    const variants = {
      default: 'border border-gray-200 dark:border-gray-700',
      elevated: 'shadow-md hover:shadow-lg',
      interactive: 'border border-gray-200 hover:border-primary-300 hover:shadow-md cursor-pointer',
    };

    return (
      <Component
        ref={ref}
        className={clsx(
          'rounded-xl bg-white dark:bg-gray-900 overflow-hidden transition-all',
          variants[variant],
          className
        )}
        {...props}
      >
        {children}
      </Component>
    );
  }
);

Card.displayName = 'Card';

export const CardHeader = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement> & { title?: React.ReactNode }>(
  ({ className, title, children, ...props }, ref) => (
    <div ref={ref} className={clsx('p-4', className)} {...props}>
      {title && <h3 className="text-lg font-semibold">{title}</h3>}
      {children}
    </div>
  )
);

CardHeader.displayName = 'CardHeader';

export const CardBody = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(
  ({ className, children, ...props }, ref) => (
    <div ref={ref} className={clsx('px-4 pb-4', className)} {...props}>
      {children}
    </div>
  )
);

CardBody.displayName = 'CardBody';

export const CardFooter = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(
  ({ className, children, ...props }, ref) => (
    <div ref={ref} className={clsx('px-4 py-3 border-t border-gray-200 dark:border-gray-700', className)} {...props}>
      {children}
    </div>
  )
);

CardFooter.displayName = 'CardFooter';
