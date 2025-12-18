'use client';

import { GlassCard } from '@/components/GlassCard';
import { QuantitySelector } from '@/components/QuantitySelector';
import { Button } from '@/components/ui/button';
import { coffeeImageSrc } from '@/data/coffees';
import { useCart } from '@/store/cart/cart-context';
import { Banknote, CreditCard, MapPin, Wallet, X } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useMemo, useState } from 'react';

function formatBRL(cents: number) {
  return (cents / 100).toFixed(2).replace('.', ',');
}

type PaymentMethod = 'credit' | 'debit' | 'cash';

const PAYMENT_OPTIONS: {
  value: PaymentMethod;
  label: string;
  icon: React.ElementType;
}[] = [
  { value: 'credit', label: 'Cart„o de crÈdito', icon: CreditCard },
  { value: 'debit', label: 'Cart„o de dÈbito', icon: Banknote },
  { value: 'cash', label: 'Dinheiro', icon: Wallet },
];

export default function Checkout() {
  const {
    state,
    setQty,
    remove,
    subtotalCents,
    totalItems,
    setDelivery,
    setPaymentMethod,
  } = useCart();
  const router = useRouter();
  const [payment, setPayment] = useState<PaymentMethod>(
    state.paymentMethod ?? 'credit'
  );
  const [cep, setCep] = useState(() => state.delivery?.cep ?? '');
  const [street, setStreet] = useState(() => state.delivery?.street ?? '');
  const [number, setNumber] = useState(() => state.delivery?.number ?? '');
  const [complement, setComplement] = useState(
    () => state.delivery?.complement ?? ''
  );
  const [neighborhood, setNeighborhood] = useState(
    () => state.delivery?.neighborhood ?? ''
  );
  const [city, setCity] = useState(() => state.delivery?.city ?? '');
  const [state_, setState] = useState(() => state.delivery?.state ?? '');

  useEffect(() => {
    if (state.delivery) {
      setCep(state.delivery.cep ?? '');
      setStreet(state.delivery.street ?? '');
      setNumber(state.delivery.number ?? '');
      setComplement(state.delivery.complement ?? '');
      setNeighborhood(state.delivery.neighborhood ?? '');
      setCity(state.delivery.city ?? '');
      setState(state.delivery.state ?? '');
    }
    if (state.paymentMethod) {
      setPayment(state.paymentMethod);
    }
  }, [state.delivery, state.paymentMethod]);

  const items = Object.values(state.items);
  const shippingCents = items.length > 0 ? 390 : 0;
  const totalCents = useMemo(
    () => subtotalCents + shippingCents,
    [shippingCents, subtotalCents]
  );

  const handleSubmit = () => {
    if (items.length === 0) return;
    setDelivery({
      cep,
      street,
      number,
      complement,
      neighborhood,
      city,
      state: state_,
    });
    setPaymentMethod(payment);
    router.push('/success');
  };

  const inputClass =
    'w-full rounded-xl border border-[color:var(--color-card-ring)] bg-white/28 px-3 py-2 text-base-title placeholder:text-base-label shadow-[inset_0_1px_0_rgba(255,255,255,0.6),0_10px_25px_var(--color-shadow)] ring-1 ring-[color:var(--color-card-ring)] backdrop-blur-2xl outline-none transition focus:border-brand-purple focus:ring-2 focus:ring-[color:var(--color-brand-purple)] focus:shadow-[0_0_0_4px_rgba(128,71,248,0.18)] dark:bg-white/8 dark:text-base-title';

  const chipClass = (value: PaymentMethod) =>
    `inline-flex items-center gap-2 rounded-xl border px-3 py-3 text-sm font-semibold shadow-[0_12px_28px_var(--color-shadow)] backdrop-blur-2xl transition ${
      payment === value
        ? 'border-brand-purple/70 bg-[linear-gradient(135deg,rgba(128,71,248,0.28),rgba(75,41,149,0.22))] text-[color:var(--color-brand-purple)] ring-2 ring-[color:var(--color-brand-purple)] shadow-[0_12px_34px_rgba(128,71,248,0.28)]'
        : 'border-[color:var(--color-card-ring)] bg-white/24 text-base-text hover:border-brand-purple/60 hover:bg-brand-purple/8 dark:bg-white/8 dark:text-base-title'
    }`;

  return (
    <div className='grid gap-6 pb-10 w-full sm:grid-cols-5 lg:grid-cols-5'>
      <div className='space-y-4 sm:col-span-3 lg:col-span-3'>
        <h1 className='font-(--font-title) text-3xl text-base-title text-center'>
          Finalizar pedido
        </h1>

        <GlassCard className='relative overflow-hidden space-y-6 p-6'>
          <div
            className='pointer-events-none absolute inset-[1px] rounded-[20px] border border-white/30 shadow-[0_1px_0_rgba(255,255,255,0.25)_inset] dark:border-white/8'
            aria-hidden
          />
          <div className='flex items-start gap-3'>
            <div className='flex h-10 w-10 items-center justify-center rounded-full bg-brand-purple/10 text-brand-purple'>
              <MapPin className='h-5 w-5 text-[color:var(--color-brand-purple)]' />
            </div>
            <div>
              <h2 className='font-semibold text-base-title'>
                Endere√ßo de entrega
              </h2>
              <p className='text-sm text-base-text'>
                Informe onde deseja receber seu pedido
              </p>
            </div>
          </div>

          <div className='space-y-3'>
            <div className='grid gap-3 md:grid-cols-[1fr_2fr]'>
              <input
                className={inputClass}
                placeholder='CEP'
                value={cep}
                onChange={(e) => setCep(e.target.value)}
              />
              <input
                className={inputClass}
                placeholder='Rua'
                value={street}
                onChange={(e) => setStreet(e.target.value)}
              />
            </div>
            <div className='grid gap-3 md:grid-cols-[1fr_1fr]'>
              <input
                className={inputClass}
                placeholder='N√∫mero'
                value={number}
                onChange={(e) => setNumber(e.target.value)}
              />
              <input
                className={inputClass}
                placeholder='Complemento (opcional)'
                value={complement}
                onChange={(e) => setComplement(e.target.value)}
              />
            </div>
            <div className='grid gap-3 md:grid-cols-[1fr_1fr_80px]'>
              <input
                className={inputClass}
                placeholder='Bairro'
                value={neighborhood}
                onChange={(e) => setNeighborhood(e.target.value)}
              />
              <input
                className={inputClass}
                placeholder='Cidade'
                value={city}
                onChange={(e) => setCity(e.target.value)}
              />
              <input
                className={inputClass}
                placeholder='UF'
                value={state_}
                onChange={(e) => setState(e.target.value)}
              />
            </div>
          </div>
        </GlassCard>

        <GlassCard className='relative overflow-hidden space-y-4 p-6'>
          <div
            className='pointer-events-none absolute inset-[1px] rounded-[20px] border border-white/30 shadow-[0_1px_0_rgba(255,255,255,0.25)_inset] dark:border-white/8'
            aria-hidden
          />
          <div className='flex items-start gap-3'>
            <div className='flex h-10 w-10 items-center justify-center rounded-full bg-brand-purple/10 text-brand-purple'>
              <CreditCard className='h-5 w-5' />
            </div>
            <div>
              <h2 className='font-semibold text-base-title'>Pagamento</h2>
              <p className='text-sm text-base-text'>
                Escolha a forma de pagamento que prefere
              </p>
            </div>
          </div>

          <div className='grid gap-2 sm:grid-cols-3'>
            {PAYMENT_OPTIONS.map(({ value, label, icon: Icon }) => (
              <button
                key={value}
                type='button'
                onClick={() => setPayment(value)}
                className={chipClass(value)}
              >
                <Icon className='h-4 w-4' />
                {label}
              </button>
            ))}
          </div>
        </GlassCard>
      </div>

      <div className='space-y-4 sm:col-span-2 lg:col-span-2'>
        <h2 className='font-(--font-title) text-2xl text-base-title text-center'>
          Seu carrinho
        </h2>

        <GlassCard className='relative overflow-hidden space-y-5 p-6'>
          <div
            className='pointer-events-none absolute inset-[1px] rounded-[20px] border border-white/30 shadow-[0_1px_0_rgba(255,255,255,0.25)_inset] dark:border-white/8'
            aria-hidden
          />
          {items.length === 0 ? (
            <p className='text-sm text-base-text'>Carrinho vazio.</p>
          ) : (
            <div className='space-y-3'>
              {items.map(({ coffee, quantity }) => (
                <div
                  key={coffee.id}
                  className='flex items-center justify-between gap-3 rounded-2xl border border-[color:var(--color-card-ring)] bg-white/24 p-3 shadow-[0_12px_28px_var(--color-shadow)] ring-1 ring-[color:var(--color-card-ring)] backdrop-blur-2xl dark:bg-white/6'
                >
                  <div className='flex items-center gap-3 min-w-0'>
                    <div className='relative h-14 w-14 overflow-hidden rounded-xl bg-base-background'>
                      <Image
                        src={coffeeImageSrc(coffee.photo)}
                        alt={coffee.name}
                        fill
                        className='object-contain'
                      />
                    </div>
                    <div className='min-w-0'>
                      <p className='truncate font-semibold text-base-title'>
                        {coffee.name}
                      </p>
                      <p className='text-xs text-base-text'>
                        R$ {formatBRL(coffee.priceCents)}
                      </p>
                    </div>
                  </div>

                  <div className='flex items-center gap-2'>
                    <QuantitySelector
                      size='sm'
                      value={quantity}
                      onDecrement={() => setQty(coffee.id, quantity - 1)}
                      onIncrement={() => setQty(coffee.id, quantity + 1)}
                    />
                    <button
                      className='inline-flex h-7 w-7 items-center justify-center rounded-lg bg-[linear-gradient(135deg,rgba(228,50,50,0.55),rgba(204,22,22,0.45))] text-white shadow-[0_12px_24px_rgba(228,50,50,0.3)] ring-1 ring-white/30 backdrop-blur transition hover:bg-[linear-gradient(135deg,rgba(228,50,50,0.68),rgba(204,22,22,0.56))] hover:shadow-[0_14px_26px_rgba(228,50,50,0.34)] active:scale-95 dark:ring-white/15'
                      onClick={() => remove(coffee.id)}
                      aria-label='Remover item'
                    >
                      <X className='h-4 w-4 drop-shadow-[0_1px_4px_rgba(0,0,0,0.25)]' />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}

          <div className='space-y-2 border-t border-[color:var(--color-card-ring)] pt-3 text-sm'>
            <div className='flex justify-between text-base-text'>
              <span>Itens</span>
              <span className='font-semibold text-base-title'>
                {totalItems}
              </span>
            </div>
            <div className='flex justify-between text-base-text'>
              <span>Subtotal</span>
              <span className='font-semibold text-base-title'>
                R$ {formatBRL(subtotalCents)}
              </span>
            </div>
            <div className='flex justify-between text-base-text'>
              <span>Entrega</span>
              <span className='font-semibold text-base-title'>
                {shippingCents === 0
                  ? 'Gr√°tis'
                  : `R$ ${formatBRL(shippingCents)}`}
              </span>
            </div>
            <div className='flex justify-between text-base-title text-base font-bold'>
              <span>Total</span>
              <span className='text-xl'>R$ {formatBRL(totalCents)}</span>
            </div>
          </div>

          <div className='grid gap-2'>
            <Button
              full
              disabled={items.length === 0}
              onClick={handleSubmit}
              className='bg-[linear-gradient(135deg,rgba(128,71,248,0.35),rgba(75,41,149,0.28))] text-white shadow-[0_18px_40px_rgba(128,71,248,0.3)] ring-1 ring-white/35 backdrop-blur transition hover:bg-[linear-gradient(135deg,rgba(128,71,248,0.48),rgba(75,41,149,0.38))] hover:shadow-[0_20px_46px_rgba(128,71,248,0.34)]'
            >
              Confirmar pedido
            </Button>
            <Link
              href='/'
              className='inline-flex h-9 items-center justify-center rounded-lg border border-white/30 bg-[linear-gradient(135deg,rgba(228,50,50,0.55),rgba(204,22,22,0.45))] px-2 text-[11px] font-semibold text-white shadow-[0_14px_30px_rgba(228,50,50,0.32)] backdrop-blur transition hover:bg-[linear-gradient(135deg,rgba(228,50,50,0.68),rgba(204,22,22,0.56))] hover:shadow-[0_16px_34px_rgba(228,50,50,0.36)] active:scale-[0.99] dark:border-white/15'
            >
              Voltar para os caf√©s
            </Link>
          </div>
        </GlassCard>
      </div>
    </div>
  );
}


