import { cn } from '@/lib/cn';
import { cva, type VariantProps } from 'class-variance-authority';
import * as React from 'react';

const buttonVariants = cva(
  'inline-flex items-center justify-center rounded-xl font-semibold transition active:scale-[0.99] disabled:opacity-50 disabled:pointer-events-none',
  {
    variants: {
      variant: {
        primary: 'bg-brand-600 text-white hover:brightness-95',
        secondary: 'bg-zinc-800 text-zinc-50 hover:bg-zinc-700',
        ghost: 'bg-transparent text-zinc-50 hover:bg-zinc-800',
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
