'use client';

import { coffeeImageSrc, coffees } from '@/data/coffees';
import { useCart } from '@/store/cart/cart-context';
import {
  Coffee,
  Minus,
  Package,
  Plus,
  ShoppingCart,
  Timer,
} from 'lucide-react';
import Image from 'next/image';
import { useState } from 'react';

const perks = [
  {
    icon: ShoppingCart,
    text: 'Compra simples e segura',
    color: 'bg-brand-yellow-dark',
  },
  {
    icon: Package,
    text: 'Embalagem mantém o café intacto',
    color: 'bg-base-text',
  },
  { icon: Timer, text: 'Entrega rápida e rastreada', color: 'bg-brand-yellow' },
  {
    icon: Coffee,
    text: 'O café chega fresquinho até você',
    color: 'bg-brand-purple',
  },
];

function formatBRL(cents: number) {
  return new Intl.NumberFormat('pt-BR', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(cents / 100);
}

export default function Home() {
  const { add } = useCart();
  const [quantities, setQuantities] = useState<Record<number, number>>({});

  const inc = (id: number) =>
    setQuantities((q) => ({ ...q, [id]: (q[id] ?? 1) + 1 }));
  const dec = (id: number) =>
    setQuantities((q) => {
      const next = Math.max((q[id] ?? 1) - 1, 1);
      return { ...q, [id]: next };
    });

  return (
    <div className='space-y-12 pb-10'>
      <section className='relative overflow-hidden rounded-4xl bg-base-card px-6 py-12 shadow-2xl md:px-10'>
        <div
          className='absolute inset-0 bg-red from-base-background via-base-background to-brand-yellow/15 dark:hidden'
          aria-hidden
        />
        <div
          className='absolute inset-0 bg-black/0 dark:bg-black/35'
          aria-hidden
        />
        <Image
          src='/assets/Background.svg'
          alt=''
          fill
          priority
          className='pointer-events-none select-none object-cover opacity-[0.08] dark:opacity-[0.22]'
        />

        <Image
          src='/assets/Background.svg'
          alt=''
          fill
          priority
          className='pointer-events-none select-none object-cover opacity-[0.12] dark:opacity-100'
        />
        <div className='relative z-10 grid items-center gap-10 md:grid-cols-2'>
          <div className='space-y-6 rounded-3xl bg-base-white p-6 shadow-lg ring-1 ring-black/10 backdrop-blur-sm'>
            <h1 className='font-(--font-title) text-4xl leading-tight text-base-title sm:text-5xl'>
              Encontre o café perfeito para qualquer hora do dia
            </h1>
            <p className='text-lg text-base-subtitle'>
              Com o Coffee Delivery você recebe seu café onde estiver, a
              qualquer hora.
            </p>

            <div className='grid grid-cols-1 gap-4 sm:grid-cols-2'>
              {perks.map(({ icon: Icon, text, color }) => (
                <div
                  key={text}
                  className='flex items-center gap-3 text-base-subtitle'
                >
                  <span
                    className={`flex h-10 w-10 items-center justify-center rounded-full shadow-sm ${color} text-brand-purple-dark`}
                  >
                    <Icon className='h-5 w-5' />
                  </span>
                  <span className='text-sm sm:text-base text-base-text'>
                    {text}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className='relative h-65 sm:h-90'>
            <Image
              src='/assets/Intro.svg'
              alt='Copo de café Coffee Delivery'
              fill
              priority
              className='object-contain drop-shadow-xl'
            />
          </div>
        </div>
      </section>

      <section className='space-y-6'>
        <h2 className='font-(--font-title) text-2xl text-base-title sm:text-3xl'>
          Nossos cafés
        </h2>

        <div className='grid grid-cols-1 gap-6 pt-10 sm:grid-cols-2 lg:grid-cols-3'>
          {coffees.map((c) => (
            <article
              key={c.id}
              className='group relative flex h-full flex-col rounded-[28px] glass-card px-6 pb-6 pt-16 card-ring hover:-translate-y-2'
            >
              <div className='absolute left-1/2 -top-12 h-28 w-28 -translate-x-1/2 drop-shadow-xl transition-transform duration-300 ease-out group-hover:rotate-50'>
                <Image
                  src={coffeeImageSrc(c.photo)}
                  alt={c.name}
                  fill
                  className='object-contain'
                  priority={c.id <= 3}
                />
              </div>

              <div className='flex flex-1 flex-col items-center text-center'>
                <div className='mt-2 flex flex-wrap justify-center gap-2'>
                  {c.tags.map((t) => (
                    <span
                      key={t}
                      className='rounded-full bg-brand-yellow/20 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.08em] text-brand-yellow-dark shadow-[inset_0_0_0_1px_rgba(196,127,23,0.25)]'
                    >
                      {t}
                    </span>
                  ))}
                </div>

                <h3 className='mt-4 font-(--font-title) text-xl text-base-title'>
                  {c.name}
                </h3>
                <p className='mt-2 text-sm text-base-text'>{c.description}</p>
              </div>

              <div className='mt-6 flex items-center justify-between gap-3'>
                <div className='flex items-baseline gap-1 text-base-title'>
                  <span className='text-sm text-base-text'>R$</span>
                  <span className='text-2xl font-extrabold'>
                    {formatBRL(c.priceCents)}
                  </span>
                </div>

                <div className='flex items-center gap-2'>
                    <div className='inline-flex h-10 items-center gap-3 rounded-lg border border-brand-purple/60 bg-brand-purple/8 px-3 text-base-title shadow-[inset_0_1px_0_rgba(255,255,255,0.6)]'>
                    <button
                      type='button'
                      onClick={() => dec(c.id)}
                      className='inline-flex h-8 w-8 items-center justify-center rounded-md border border-brand-purple bg-brand-purple text-white transition hover:brightness-95 active:scale-[0.98]'
                      aria-label='Diminuir'
                    >
                      <Minus className='h-4 w-4' />
                    </button>
                    <span className='w-4 text-center text-base font-semibold text-brand-purple-dark'>
                      {quantities[c.id] ?? 1}
                    </span>
                    <button
                      type='button'
                      onClick={() => inc(c.id)}
                      className='inline-flex h-8 w-8 items-center justify-center rounded-md border border-brand-purple bg-brand-purple text-white transition hover:brightness-95 active:scale-[0.98]'
                      aria-label='Aumentar'
                    >
                      <Plus className='h-4 w-4' />
                    </button>
                  </div>

                  <button
                    onClick={() => add(c, quantities[c.id] ?? 1)}
                    className='inline-flex h-10 w-10 items-center justify-center rounded-lg bg-brand-purple text-white shadow-[0_10px_28px_rgba(128,71,248,0.28)] transition hover:bg-brand-purple-dark active:scale-[0.99]'
                    aria-label='Adicionar ao carrinho'
                  >
                    <ShoppingCart className='h-5 w-5' />
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}
