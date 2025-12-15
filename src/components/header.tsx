'use client';

import { useCart } from '@/store/cart/cart-context';
import Image from 'next/image';
import { MapPin, Moon, ShoppingBag, Sun } from 'lucide-react';
import Link from 'next/link';
import { useEffect, useState } from 'react';

function ThemeToggle() {
  const [theme, setTheme] = useState<'light' | 'dark'>('light');

  useEffect(() => {
    const prefersDark =
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-color-scheme: dark)').matches;
    const stored = localStorage.getItem('theme');
    const initial = (stored as 'light' | 'dark' | null) ?? (prefersDark ? 'dark' : 'light');
    setTheme(initial);
  }, []);

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
      className='inline-flex h-10 w-10 items-center justify-center rounded-md bg-base-button text-base-title ring-1 ring-base-hover transition hover:bg-brand-purple-light hover:text-brand-purple-dark dark:bg-zinc-800 dark:text-zinc-50 dark:ring-zinc-700'
      aria-label='Alternar modo de tema'
    >
      {theme === 'dark' ? <Sun className='h-5 w-5' /> : <Moon className='h-5 w-5' />}
    </button>
  );
}

export function Header() {
  const { totalItems } = useCart();

  return (
    <header className='sticky top-0 z-50 border-b border-base-button/60 bg-base-background/90 backdrop-blur'>
      <div className='mx-auto flex h-20 max-w-6xl items-center justify-between px-4'>
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
          <span className='inline-flex items-center gap-2 rounded-md bg-brand-purple-light px-3 py-2 text-sm font-medium text-brand-purple-dark'>
            <MapPin className='h-4 w-4' />
            Franca, SP
          </span>
          <ThemeToggle />
          <Link
            href='/checkout'
            className='relative inline-flex h-10 w-10 items-center justify-center rounded-md bg-base-button text-brand-purple-dark ring-1 ring-base-hover transition hover:bg-brand-purple-light dark:bg-zinc-800 dark:text-zinc-50 dark:ring-zinc-700'
          >
            <ShoppingBag className='h-5 w-5' />
            {totalItems > 0 && (
              <span className='absolute -right-2 -top-2 inline-flex h-5 min-w-5 items-center justify-center rounded-full bg-brand-purple text-[11px] font-bold text-white ring-2 ring-base-background'>
                {totalItems}
              </span>
            )}
          </Link>
        </div>
      </div>
    </header>
  );
}
