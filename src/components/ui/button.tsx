import { cn } from '@/lib/cn';
import { cva, type VariantProps } from 'class-variance-authority';
import * as React from 'react';

const buttonVariants = cva(
  'inline-flex items-center justify-center rounded-xl font-semibold transition active:scale-[0.99] disabled:opacity-50 disabled:pointer-events-none',
  {
    variants: {
      variant: {
        primary:
          'bg-[color:var(--color-brand-purple)] text-white shadow-[0_12px_35px_rgba(128,71,248,0.28)] hover:bg-brand-purple-dark',
        secondary:
          'border border-base-hover bg-base-card text-base-title hover:border-brand-purple hover:text-brand-purple',
        ghost: 'bg-transparent text-base-title hover:bg-brand-purple/10',
      },
      size: {
        sm: 'h-10 px-4 text-sm',
        md: 'h-12 px-5 text-base',
      },
      full: { true: 'w-full', false: '' },
    },
    defaultVariants: { variant: 'primary', size: 'md', full: false },
  }
);

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> &
  VariantProps<typeof buttonVariants>;

export function Button({
  className,
  variant,
  size,
  full,
  ...props
}: ButtonProps) {
  return (
    <button
      className={cn(buttonVariants({ variant, size, full }), className)}
      {...props}
    />
  );
}
