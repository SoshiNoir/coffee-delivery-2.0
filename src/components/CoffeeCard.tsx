import { GlassCard } from '@/components/GlassCard';
import { QuantitySelector } from '@/components/QuantitySelector';
import { coffeeImageSrc, type Coffee } from '@/data/coffees';
import { cn } from '@/lib/cn';
import { glassIconClass } from '@/styles/glass';
import { ShoppingCart } from 'lucide-react';
import Image from 'next/image';
import { useMemo, useState } from 'react';

type CoffeeCardProps = {
  coffee: Coffee;
  onAdd: (quantity: number) => void;
};

function formatBRL(cents: number) {
  return new Intl.NumberFormat('pt-BR', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(cents / 100);
}

export function CoffeeCard({ coffee, onAdd }: CoffeeCardProps) {
  const [quantity, setQuantity] = useState(1);

  const price = useMemo(
    () => formatBRL(coffee.priceCents),
    [coffee.priceCents]
  );

  const increment = () => setQuantity((q) => q + 1);
  const decrement = () => setQuantity((q) => Math.max(1, q - 1));

  return (
    <GlassCard
      as='article'
      className='group relative flex h-full flex-col overflow-visible px-4 pb-6 pt-16 text-center transition duration-500 hover:-translate-y-2 hover:shadow-[0_28px_65px_var(--color-shadow-strong)] sm:px-5'
      innerBorder
      radiusClass='rounded-[22px]'
      innerRadiusClass='rounded-[20px]'
    >
      <div
        className='pointer-events-none absolute inset-0 opacity-70 blur-3xl transition duration-500 group-hover:opacity-100'
        aria-hidden
        style={{
          background:
            'radial-gradient(circle at 20% 20%, rgba(128,71,248,0.18), transparent 40%), radial-gradient(circle at 80% 0%, rgba(67,175,255,0.16), transparent 35%)',
        }}
      />
      <div className='pointer-events-none absolute left-1/2 -top-14 h-32 w-32 -translate-x-1/2 rounded-full bg-white/90 shadow-[0_18px_36px_rgba(0,0,0,0.18)] ring-2 ring-white/70 backdrop-blur overflow-hidden'>
        <Image
          src={coffeeImageSrc(coffee.photo)}
          alt={coffee.name}
          fill
          priority
          className='origin-center scale-[1.02] object-contain drop-shadow-[0_16px_28px_rgba(0,0,0,0.18)] transition-transform duration-700 ease-out group-hover:rotate-[50deg]'
        />
      </div>

      <div className='relative z-10 flex flex-1 flex-col items-center text-center min-w-0'>
        <div className='mt-8 flex flex-wrap justify-center gap-2'>
          {coffee.tags.map((tag) => (
            <span
              key={tag}
              className='rounded-full bg-brand-yellow/15 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.08em] text-brand-yellow-dark shadow-[0_6px_16px_rgba(0,0,0,0.06)] backdrop-blur'
            >
              {tag}
            </span>
          ))}
        </div>

        <h3 className='mt-5 font-(--font-title) text-xl text-base-title break-words'>
          {coffee.name}
        </h3>
        <p className='mt-2 text-sm text-base-text/90 break-words'>
          {coffee.description}
        </p>
      </div>

      <div className='relative z-10 mt-10 flex items-center justify-between gap-3'>
        <div className='flex items-baseline gap-1 text-base-title'>
          <span className='text-sm text-base-text'>R$</span>
          <span className='text-2xl font-extrabold tracking-tight'>
            {price}
          </span>
        </div>

        <div className='flex items-center gap-2 sm:gap-3'>
          <QuantitySelector
            value={quantity}
            onIncrement={increment}
            onDecrement={decrement}
            minusColor='red'
          />

          <button
            onClick={() => onAdd(quantity)}
            className={cn(
              glassIconClass,
              'h-10 w-11 text-white ring-white/35 dark:ring-white/15'
            )}
            aria-label='Adicionar ao carrinho'
          >
            <ShoppingCart className='h-5 w-5 drop-shadow-[0_2px_8px_rgba(0,0,0,0.35)]' />
          </button>
        </div>
      </div>
    </GlassCard>
  );
}
