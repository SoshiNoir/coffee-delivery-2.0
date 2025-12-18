import { cn } from '@/lib/cn';
import React from 'react';

type GlassCardProps<T extends React.ElementType = 'div'> = {
  as?: T;
  innerBorder?: boolean;
  radiusClass?: string;
  innerRadiusClass?: string;
} & Omit<React.ComponentPropsWithoutRef<T>, 'as' | 'children'> & {
    children: React.ReactNode;
  };

export function GlassCard<T extends React.ElementType = 'div'>({
  as,
  innerBorder = true,
  radiusClass,
  innerRadiusClass,
  className,
  children,
  ...rest
}: GlassCardProps<T>) {
  const Component = (as ?? 'div') as React.ElementType;
  const rounded = radiusClass ?? 'rounded-[22px]';
  const innerRounded = innerRadiusClass ?? 'rounded-[20px]';

  return (
    <Component
      className={cn(
        'relative overflow-hidden border border-[color:var(--color-card-offset)]',
        'bg-[linear-gradient(145deg,rgba(255,255,255,0.72),rgba(235,229,249,0.75))]',
        'shadow-[0_18px_45px_var(--color-shadow)] ring-1 ring-[color:var(--color-card-ring)] backdrop-blur-2xl',
        'dark:bg-[linear-gradient(145deg,rgba(255,255,255,0.12),rgba(255,255,255,0.08))] dark:ring-[color:var(--color-card-ring-dark)]',
        rounded,
        className
      )}
      {...rest}
    >
      {innerBorder && (
        <div
          className={cn(
            'pointer-events-none absolute inset-[1px] border border-white/35 shadow-[0_1px_0_rgba(255,255,255,0.35)_inset] dark:border-white/10',
            innerRounded
          )}
          aria-hidden
        />
      )}
      {children}
    </Component>
  );
}
