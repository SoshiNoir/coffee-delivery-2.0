import { cn } from '@/lib/cn';
import { glassIconClass } from '@/styles/glass';
import { Minus, Plus } from 'lucide-react';

type QuantitySelectorProps = {
  value: number;
  onIncrement: () => void;
  onDecrement: () => void;
  size?: 'md' | 'sm';
  minusColor?: 'purple' | 'red';
  plusColor?: 'purple' | 'red';
  className?: string;
};

export function QuantitySelector({
  value,
  onIncrement,
  onDecrement,
  size = 'md',
  minusColor = 'purple',
  plusColor = 'purple',
  className,
}: QuantitySelectorProps) {
  const containerBase =
    'inline-flex items-center rounded-xl bg-[linear-gradient(145deg,rgba(255,255,255,0.4),rgba(255,255,255,0.22))] text-base-title shadow-[0_18px_38px_var(--color-shadow)] ring-1 ring-white/35 backdrop-blur-2xl dark:bg-[linear-gradient(145deg,rgba(255,255,255,0.12),rgba(255,255,255,0.08))] dark:ring-white/15';
  const containerSize = size === 'sm' ? 'h-7 px-2' : 'h-10 px-2';

  const buttonSize = size === 'sm' ? 'h-6 w-6' : 'h-8 w-8';
  const valueSize = size === 'sm' ? 'w-5 text-xs' : 'w-8 text-base';

  const buttonClass = (tone: 'purple' | 'red') =>
    tone === 'red'
      ? cn(
          'inline-flex items-center justify-center rounded-lg',
          'bg-[linear-gradient(135deg,rgba(228,50,50,0.55),rgba(204,22,22,0.45))]',
          'text-white',
          'shadow-[0_10px_24px_rgba(228,50,50,0.3)]',
          'ring-1 ring-white/30',
          'backdrop-blur transition',
          'hover:bg-[linear-gradient(135deg,rgba(228,50,50,0.68),rgba(204,22,22,0.56))]',
          'hover:shadow-[0_12px_26px_rgba(228,50,50,0.32)]',
          'active:scale-95',
          'dark:ring-white/15',
          buttonSize
        )
      : cn(
          glassIconClass,
          buttonSize,
          'text-white shadow-[0_10px_24px_rgba(128,71,248,0.25)] ring-white/35 dark:ring-white/15'
        );

  return (
    <div className={cn(containerBase, containerSize, className)}>
      <button
        type='button'
        onClick={onDecrement}
        className={buttonClass(minusColor)}
        aria-label='Diminuir'
      >
        <Minus className='h-3.5 w-3.5 drop-shadow-[0_1px_4px_rgba(0,0,0,0.25)]' />
      </button>
      <span className={cn('text-center font-semibold leading-none text-base-title', valueSize)}>
        {value}
      </span>
      <button
        type='button'
        onClick={onIncrement}
        className={buttonClass(plusColor)}
        aria-label='Aumentar'
      >
        <Plus className='h-3.5 w-3.5 drop-shadow-[0_1px_4px_rgba(0,0,0,0.25)]' />
      </button>
    </div>
  );
}
