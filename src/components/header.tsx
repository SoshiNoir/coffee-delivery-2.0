'use client';

import { useCart } from '@/store/cart/cart-context';
import { cn } from '@/lib/cn';
import { glassIconClass } from '@/styles/glass';
import { MapPin, Moon, ShoppingBag, Sun } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';

function ThemeToggle() {
  const [theme, setTheme] = useState<'light' | 'dark'>(() => {
    if (typeof window === 'undefined') return 'light';
    const prefersDark = window.matchMedia(
      '(prefers-color-scheme: dark)'
    ).matches;
    const stored = localStorage.getItem('theme') as 'light' | 'dark' | null;
    return stored ?? (prefersDark ? 'dark' : 'light');
  });

  useEffect(() => {
    const root = document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
    localStorage.setItem('theme', theme);
  }, [theme]);

  return (
    <button
      type='button'
      onClick={() => setTheme((t) => (t === 'light' ? 'dark' : 'light'))}
      className={cn(glassIconClass, 'h-10 w-10 text-white')}
      aria-label='Alternar modo de tema'
    >
      {theme === 'dark' ? (
        <Sun className='h-5 w-5' />
      ) : (
        <Moon className='h-5 w-5' />
      )}
    </button>
  );
}

export function Header() {
  const { totalItems } = useCart();

  return (
    <header className='sticky top-0 z-50 border-b border-base-button/60 bg-base-background/90 backdrop-blur'>
      <div className='mx-auto flex h-20 max-w-7xl items-center justify-between px-4 sm:px-5'>
        <Link href='/' className='flex items-center gap-3 text-base-title'>
          <Image
            src='/assets/Logo.svg'
            alt='Coffee Delivery'
            width={90}
            height={40}
            priority
          />
        </Link>

        <div className='flex items-center gap-3'>
          <span className='inline-flex items-center gap-2 rounded-lg bg-[linear-gradient(135deg,rgba(255,255,255,0.55),rgba(255,255,255,0.32))] px-3 py-2 text-sm font-medium text-brand-purple-dark shadow-[0_10px_24px_var(--color-shadow)] ring-1 ring-white/40 backdrop-blur dark:bg-[linear-gradient(135deg,rgba(255,255,255,0.14),rgba(255,255,255,0.08))] dark:ring-white/15'>
            <MapPin className='h-4 w-4 text-brand-purple' />
            Franca, SP
          </span>
          <ThemeToggle />
          <Link
            href='/checkout'
            className={cn('relative h-10 w-10', glassIconClass)}
          >
            <ShoppingBag className='h-5 w-5' />
            {totalItems > 0 && (
              <span className='absolute -right-2 -top-2 inline-flex h-5 min-w-5 items-center justify-center rounded-full bg-[color:var(--color-brand-purple)] text-[11px] font-bold leading-none text-white shadow-[0_0_0_2px_var(--color-base-background)] ring-2 ring-white/70'>
                {totalItems}
              </span>
            )}
          </Link>
        </div>
      </div>
    </header>
  );
}
