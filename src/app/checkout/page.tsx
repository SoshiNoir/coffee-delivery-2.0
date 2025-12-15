'use client';

import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { useCart } from '@/store/cart/cart-context';
import Link from 'next/link';

function formatBRL(cents: number) {
  return (cents / 100).toFixed(2).replace('.', ',');
}

export default function Checkout() {
  const { state, setQty, remove, subtotalCents, totalItems, clear } = useCart();

  const items = Object.values(state.items);

  return (
    <div className='grid gap-6 lg:grid-cols-5'>
      <div className='space-y-4 lg:col-span-3'>
        <h1 className='font-[var(--font-title)] text-3xl text-base-title dark:text-zinc-50'>
          Checkout
        </h1>
        <Card className='rounded-2xl bg-base-card p-6 shadow-soft ring-1 ring-base-hover dark:bg-zinc-800 dark:ring-zinc-700'>
          <p className='text-base text-base-text dark:text-zinc-200'>
            (Próximo passo) dados de endereço e pagamento vão aqui.
          </p>
        </Card>
      </div>

      <div className='space-y-4 lg:col-span-2'>
        <h2 className='font-[var(--font-title)] text-2xl text-base-title dark:text-zinc-50'>
          Seu carrinho
        </h2>

        <Card className='space-y-4 rounded-2xl bg-base-card p-6 shadow-soft ring-1 ring-base-hover dark:bg-zinc-800 dark:ring-zinc-700'>
          {items.length === 0 ? (
            <p className='text-sm text-base-text dark:text-zinc-200'>
              Carrinho vazio.
            </p>
          ) : (
            items.map(({ coffee, quantity }) => (
              <div
                key={coffee.id}
                className='flex items-center justify-between gap-3 rounded-2xl bg-base-background px-4 py-3 ring-1 ring-base-hover dark:bg-zinc-900/60 dark:ring-zinc-700'
              >
                <div className='min-w-0'>
                  <p className='truncate font-semibold text-base-title dark:text-zinc-50'>
                    {coffee.name}
                  </p>
                  <p className='text-xs text-base-text dark:text-zinc-300'>
                    R$ {formatBRL(coffee.priceCents)}
                  </p>
                </div>

                <div className='flex items-center gap-2'>
                  <button
                    className='inline-flex h-9 w-9 items-center justify-center rounded-lg border border-base-hover bg-base-button text-brand-purple-dark transition hover:bg-brand-purple-light dark:border-zinc-700 dark:bg-zinc-700 dark:text-white dark:hover:bg-brand-purple'
                    onClick={() => setQty(coffee.id, quantity - 1)}
                  >
                    -
                  </button>
                  <span className='w-6 text-center text-sm text-base-title dark:text-zinc-50'>
                    {quantity}
                  </span>
                  <button
                    className='inline-flex h-9 w-9 items-center justify-center rounded-lg border border-base-hover bg-base-button text-brand-purple-dark transition hover:bg-brand-purple-light dark:border-zinc-700 dark:bg-zinc-700 dark:text-white dark:hover:bg-brand-purple'
                    onClick={() => setQty(coffee.id, quantity + 1)}
                  >
                    +
                  </button>
                  <button
                    className='h-9 rounded-lg border border-base-hover bg-base-button px-3 text-sm text-base-text transition hover:bg-brand-purple-light hover:text-brand-purple-dark dark:border-zinc-700 dark:bg-zinc-700 dark:text-white dark:hover:bg-brand-purple'
                    onClick={() => remove(coffee.id)}
                  >
                    Remover
                  </button>
                </div>
              </div>
            ))
          )}

          <div className='border-t border-base-hover pt-3 text-sm dark:border-zinc-700'>
            <div className='flex justify-between'>
              <span className='text-base-text dark:text-zinc-300'>Itens</span>
              <span className='font-semibold text-base-title dark:text-zinc-50'>
                {totalItems}
              </span>
            </div>
            <div className='flex justify-between'>
              <span className='text-base-text dark:text-zinc-300'>Subtotal</span>
              <span className='font-semibold text-base-title dark:text-zinc-50'>
                R$ {formatBRL(subtotalCents)}
              </span>
            </div>
          </div>

          <div className='grid gap-2'>
            <Button
              full
              disabled={items.length === 0}
              onClick={() => {
                clear();
                window.location.href = '/success';
              }}
            >
              Confirmar pedido
            </Button>
            <Link
              href='/'
              className='text-center text-sm text-base-text underline transition hover:text-brand-purple dark:text-zinc-300'
            >
              Voltar para os cafés
            </Link>
          </div>
        </Card>
      </div>
    </div>
  );
}
