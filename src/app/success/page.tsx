'use client';

import { GlassCard } from '@/components/GlassCard';
import { useCart } from '@/store/cart/cart-context';
import { Check, CreditCard, MapPin, Timer } from 'lucide-react';
import Link from 'next/link';

export default function Success() {
  const { state } = useCart();
  const delivery = state.delivery;
  const paymentMethod = state.paymentMethod;

  const paymentLabels = {
    credit: 'Cartão de crédito',
    debit: 'Cartão de débito',
    cash: 'Dinheiro',
  };

  const formattedAddress = delivery
    ? `${delivery.street}, ${delivery.number}${
        delivery.complement ? ` - ${delivery.complement}` : ''
      }, ${delivery.neighborhood} - ${delivery.city}, ${delivery.state}`
    : 'Endereço não informado';
  return (
    <div className='flex min-h-[calc(100dvh-120px)] items-center justify-center overflow-x-hidden'>
      <GlassCard
        className='relative w-full overflow-hidden p-6 sm:p-8 shadow-[0_24px_70px_var(--color-shadow)] rounded-[28px]'
        radiusClass='rounded-[28px]'
        innerRadiusClass='rounded-[26px]'
      >
        <div
          className='pointer-events-none absolute -left-24 -top-24 h-64 w-64 rounded-full bg-brand-purple/20 blur-[100px]'
          aria-hidden
        />
        <div
          className='pointer-events-none absolute -right-24 bottom-0 h-72 w-72 rounded-full bg-brand-yellow/25 blur-[110px]'
          aria-hidden
        />
        <div
          className='absolute inset-px rounded-[26px] border border-white/35 shadow-[0_1px_0_rgba(255,255,255,0.35)_inset] dark:border-white/8'
          aria-hidden
        />

        <div className='relative z-10 space-y-6'>
          <div className='inline-flex items-center gap-2 rounded-full border border-(--color-card-ring) bg-brand-purple/15 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-brand-purple shadow-[0_6px_16px_rgba(0,0,0,0.06)] backdrop-blur'>
            <Check className='h-4 w-4' />
            Pedido confirmado
          </div>
          <div className='space-y-2 text-center sm:text-left'>
            <h1 className='font-(--font-title) text-3xl text-base-title sm:text-4xl'>
              Tudo pronto para o seu café chegar
            </h1>
            <p className='text-base text-base-subtitle'>
              Estamos preparando cada detalhe com cuidado. Enquanto isso, você
              pode acompanhar os próximos passos.
            </p>
          </div>

          <div className='grid gap-3 sm:grid-cols-2'>
            <div className='flex items-center gap-3 rounded-2xl border border-(--color-card-ring) bg-white/24 px-4 py-3 shadow-[0_12px_28px_var(--color-shadow)] ring-1 ring-(--color-card-ring) backdrop-blur-2xl dark:bg-white/6'>
              <span className='flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-[linear-gradient(135deg,rgba(128,71,248,0.3),rgba(75,41,149,0.26))] text-white shadow-[0_14px_30px_rgba(128,71,248,0.28)] ring-1 ring-white/35 backdrop-blur'>
                <MapPin className='h-5 w-5' />
              </span>
              <div className='min-w-0'>
                <p className='text-sm font-semibold text-base-title'>Entrega</p>
                <p className='text-xs sm:text-sm truncate text-base-text'>
                  {formattedAddress}
                </p>
              </div>
            </div>
            <div className='flex items-center gap-3 rounded-2xl border border-(--color-card-ring) bg-white/24 px-4 py-3 shadow-[0_12px_28px_var(--color-shadow)] ring-1 ring-(--color-card-ring) backdrop-blur-2xl dark:bg-white/6'>
              <span className='flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-[linear-gradient(135deg,rgba(128,71,248,0.3),rgba(75,41,149,0.26))] text-white shadow-[0_14px_30px_rgba(128,71,248,0.28)] ring-1 ring-white/35 backdrop-blur'>
                <Timer className='h-5 w-5' />
              </span>
              <div className='min-w-0'>
                <p className='text-sm font-semibold text-base-title'>
                  Previsão
                </p>
                <p className='text-xs sm:text-sm truncate text-base-text'>
                  15 - 25 minutos
                </p>
              </div>
            </div>
            <div className='flex items-center gap-3 rounded-2xl border border-(--color-card-ring) bg-white/24 px-4 py-3 shadow-[0_12px_28px_var(--color-shadow)] ring-1 ring-(--color-card-ring) backdrop-blur-2xl dark:bg-white/6 sm:col-span-2'>
              <span className='flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-[linear-gradient(135deg,rgba(128,71,248,0.3),rgba(75,41,149,0.26))] text-white shadow-[0_14px_30px_rgba(128,71,248,0.28)] ring-1 ring-white/35 backdrop-blur'>
                <CreditCard className='h-5 w-5' />
              </span>
              <div className='min-w-0'>
                <p className='text-sm font-semibold text-base-title'>
                  Pagamento
                </p>
                <p className='text-xs sm:text-sm truncate text-base-text'>
                  {paymentMethod
                    ? paymentLabels[paymentMethod]
                    : 'Não informado'}{' '}
                  - Pagar na entrega
                </p>
              </div>
            </div>
          </div>

          <div className='flex flex-col gap-2 sm:flex-row sm:items-center'>
            <Link
              href='/'
              className='inline-flex items-center justify-center rounded-xl border border-white/30 bg-[linear-gradient(135deg,rgba(228,50,50,0.55),rgba(204,22,22,0.45))] px-5 py-2 sm:py-3 text-sm sm:text-base font-semibold text-white shadow-[0_14px_30px_rgba(228,50,50,0.32)] backdrop-blur transition hover:bg-[linear-gradient(135deg,rgba(228,50,50,0.68),rgba(204,22,22,0.56))] hover:shadow-[0_16px_34px_rgba(228,50,50,0.36)] active:scale-[0.99] dark:border-white/15'
            >
              Voltar para o catálogo
            </Link>
            <Link
              href='/checkout'
              className='inline-flex items-center justify-center rounded-xl border border-white/30 bg-[linear-gradient(135deg,rgba(128,71,248,0.35),rgba(75,41,149,0.28))] px-5 py-2 sm:py-3 text-sm sm:text-base font-semibold text-white shadow-[0_18px_40px_rgba(128,71,248,0.3)] backdrop-blur transition hover:bg-[linear-gradient(135deg,rgba(128,71,248,0.48),rgba(75,41,149,0.38))] hover:shadow-[0_20px_46px_rgba(128,71,248,0.34)] active:scale-[0.99] dark:border-white/15'
            >
              Revisar pedido
            </Link>
          </div>
        </div>
      </GlassCard>
    </div>
  );
}
