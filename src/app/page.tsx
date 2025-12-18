'use client';

import { CoffeeCard } from '@/components/CoffeeCard';
import { GlassCard } from '@/components/GlassCard';
import { coffees } from '@/data/coffees';
import { useCart } from '@/store/cart/cart-context';
import { Coffee, Package, ShoppingCart, Timer } from 'lucide-react';
import Image from 'next/image';

const perks = [
  {
    icon: ShoppingCart,
    text: 'Compra simples e segura',
    color:
      'bg-[linear-gradient(135deg,rgba(128,71,248,0.88),rgba(75,41,149,0.72))]',
  },
  {
    icon: Package,
    text: 'Café intacto e lacrado',
    color:
      'bg-[linear-gradient(135deg,rgba(128,71,248,0.88),rgba(75,41,149,0.72))]',
  },
  {
    icon: Timer,
    text: 'Entrega rápida e rastreada',
    color:
      'bg-[linear-gradient(135deg,rgba(128,71,248,0.88),rgba(75,41,149,0.72))]',
  },
  {
    icon: Coffee,
    text: 'O café chega fresquinho',
    color:
      'bg-[linear-gradient(135deg,rgba(128,71,248,0.88),rgba(75,41,149,0.72))]',
  },
];

export default function Home() {
  const { add } = useCart();

  return (
    <div className='relative space-y-14 pb-12 overflow-x-hidden'>
      <div
        className='pointer-events-none absolute -left-28 -top-40 h-72 w-72 rounded-full bg-brand-purple/25 blur-[120px] dark:bg-brand-purple/30'
        aria-hidden
      />
      <div
        className='pointer-events-none absolute -right-20 top-10 h-72 w-72 rounded-full bg-brand-yellow/25 blur-[120px] dark:bg-brand-yellow/30'
        aria-hidden
      />
      <div
        className='pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_25%_20%,rgba(255,255,255,0.35),transparent_35%)] dark:bg-[radial-gradient(circle_at_25%_20%,rgba(255,255,255,0.06),transparent_30%)]'
        aria-hidden
      />

      <GlassCard
        as='section'
        radiusClass='rounded-[34px]'
        innerRadiusClass='rounded-[32px]'
        className='group/hero relative overflow-hidden px-0 pb-1 sm:pb-10 pt-0 sm:pt-6 sm:px-2 md:px-4 lg:px-8 shadow-[0_26px_80px_var(--color-shadow)]'
      >
        <div
          className='pointer-events-none absolute -right-28 -top-28 h-72 w-72 rounded-full bg-brand-yellow/25 blur-[100px] dark:bg-brand-yellow/35'
          aria-hidden
        />
        <div
          className='pointer-events-none absolute -left-24 bottom-0 h-80 w-80 rounded-full bg-brand-purple/25 blur-[120px] dark:bg-brand-purple/35'
          aria-hidden
        />

        <div className='relative z-10 grid items-center gap-4 sm:gap-8 text-center px-2 sm:px-0 lg:grid-cols-[1.05fr_0.95fr] lg:gap-12 lg:text-left'>
          <div className='order-2 space-y-4 sm:space-y-7 lg:order-1'>
            <h1 className='font-(--font-title) text-3xl sm:text-4xl leading-tight text-base-title lg:text-5xl'>
              Encontre o café perfeito para qualquer hora do dia
            </h1>
            <p className='text-base sm:text-lg text-base-subtitle'>
              Com o Coffee Delivery você recebe seu café onde estiver, a
              qualquer hora, com uma experiência elegante.
            </p>

            <div className='grid grid-cols-1 gap-2 sm:gap-3 sm:grid-cols-2 lg:grid-cols-2'>
              {Array.from({ length: Math.ceil(perks.length / 2) }).map(
                (_, glassIndex) => {
                  const perkPair = perks.slice(
                    glassIndex * 2,
                    glassIndex * 2 + 2
                  );
                  return (
                    <div
                      key={`glass-${glassIndex}`}
                      className='rounded-2xl border border-(--color-card-ring) bg-[linear-gradient(145deg,rgba(255,255,255,0.32),rgba(255,255,255,0.16))] px-3 sm:px-4 py-3 sm:py-4 shadow-[0_14px_32px_var(--color-shadow)] ring-1 ring-white/35 backdrop-blur-3xl transition hover:shadow-[0_18px_40px_var(--color-shadow-strong)] dark:border-(--color-card-ring-dark) dark:bg-[linear-gradient(145deg,rgba(255,255,255,0.1),rgba(255,255,255,0.06))] dark:ring-white/12 sm:hidden'
                    >
                      <div className='grid grid-cols-2 gap-2 sm:gap-3'>
                        {perkPair.map(({ icon: Icon, text, color }) => (
                          <div
                            key={text}
                            className='flex flex-col items-center justify-center gap-2 sm:gap-3 text-base-subtitle'
                          >
                            <span
                              className={`flex h-10 sm:h-12 w-10 sm:w-12 shrink-0 items-center justify-center rounded-xl bg-[linear-gradient(135deg,rgba(128,71,248,0.3),rgba(75,41,149,0.26))] text-white shadow-[0_14px_30px_rgba(128,71,248,0.28)] ring-1 ring-white/35 backdrop-blur ${color}`}
                            >
                              <Icon className='h-5 sm:h-6 w-5 sm:w-6' />
                            </span>
                            <span className='text-xs sm:text-sm leading-snug text-base-text text-center'>
                              {text}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  );
                }
              )}

              <div className='hidden sm:contents'>
                {perks.map(({ icon: Icon, text, color }) => (
                  <div
                    key={text}
                    className='flex items-center gap-2 lg:gap-3 rounded-2xl border border-(--color-card-ring) bg-[linear-gradient(145deg,rgba(255,255,255,0.32),rgba(255,255,255,0.16))] px-2 lg:px-3 py-2 lg:py-3 text-base-subtitle shadow-[0_14px_32px_var(--color-shadow)] ring-1 ring-white/35 backdrop-blur-3xl transition hover:shadow-[0_18px_40px_var(--color-shadow-strong)] dark:border-(--color-card-ring-dark) dark:bg-[linear-gradient(145deg,rgba(255,255,255,0.1),rgba(255,255,255,0.06))] dark:ring-white/12'
                  >
                    <span
                      className={`flex h-8 lg:h-10 w-8 lg:w-10 shrink-0 items-center justify-center rounded-lg bg-[linear-gradient(135deg,rgba(128,71,248,0.3),rgba(75,41,149,0.26))] text-white shadow-[0_14px_30px_rgba(128,71,248,0.28)] ring-1 ring-white/35 backdrop-blur ${color}`}
                    >
                      <Icon className='h-4 lg:h-5 w-4 lg:w-5' />
                    </span>
                    <span className='text-xs lg:text-sm leading-snug text-base-text'>
                      {text}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className='order-1 relative flex h-70 w-full items-center justify-center sm:h-95 lg:order-2 lg:h-140'>
            <div
              className='absolute bottom-6 left-1/2 h-44 w-70 -translate-x-1/2 -rotate-6 rounded-[140px] bg-linear-to-br from-brand-yellow/90 via-brand-yellow/60 to-brand-purple/35 shadow-[0_26px_70px_var(--color-shadow)] blur-[1px] animate-[float_6s_ease-in-out_infinite]'
              aria-hidden
            />
            <div
              className='absolute bottom-2 left-1/2 h-44 w-75 -translate-x-1/2 rounded-[120px] border-2 border-white/70 shadow-[0_12px_28px_rgba(0,0,0,0.12)] backdrop-blur-md animate-[float_5.5s_ease-in-out_infinite]'
              aria-hidden
            />

            <Image
              src='/assets/Intro.svg'
              alt='Copo de café Coffee Delivery'
              width={540}
              height={540}
              priority
              className='relative z-10 -mb-4 w-70 max-w-none -rotate-10 translate-y-4 drop-shadow-[0_32px_70px_rgba(0,0,0,0.28)] transition duration-700 ease-out animate-[float_5s_ease-in-out_infinite] sm:-mb-6 sm:w-85 sm:translate-y-6 lg:w-120 lg:-mb-10 lg:translate-y-10'
            />
          </div>
        </div>
      </GlassCard>

      <section className='space-y-6'>
        <div className='flex flex-col gap-2 text-center pb-2'>
          <p className='text-sm font-semibold uppercase tracking-[0.18em] text-brand-purple'>
            Catálogo curado
          </p>
          <h2 className='font-(--font-title) text-3xl text-base-title sm:text-4xl'>
            Nossos cafés
          </h2>
        </div>

        <div className='grid grid-cols-1 gap-8 pt-6 sm:grid-cols-2 lg:grid-cols-3 justify-items-center sm:justify-items-start [&>article]:w-full'>
          {coffees.map((coffee) => (
            <CoffeeCard
              key={coffee.id}
              coffee={coffee}
              onAdd={(quantity) => add(coffee, quantity)}
            />
          ))}
        </div>
      </section>
    </div>
  );
}
