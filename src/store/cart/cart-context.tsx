'use client';

import type { Coffee } from '@/data/coffees';
import React, { createContext, useContext, useMemo, useReducer } from 'react';

type CartItem = { coffee: Coffee; quantity: number };
type DeliveryInfo = {
  cep: string;
  street: string;
  number: string;
  complement: string;
  neighborhood: string;
  city: string;
  state: string;
};
type State = {
  items: Record<number, CartItem>;
  delivery?: DeliveryInfo;
  paymentMethod?: 'credit' | 'debit' | 'cash';
};

type Action =
  | { type: 'ADD'; coffee: Coffee; qty: number }
  | { type: 'SET_QTY'; id: number; qty: number }
  | { type: 'REMOVE'; id: number }
  | { type: 'CLEAR' }
  | { type: 'SET_DELIVERY'; delivery: DeliveryInfo }
  | { type: 'SET_PAYMENT'; method: 'credit' | 'debit' | 'cash' };

type CartContextValue = {
  state: State;
  add: (coffee: Coffee, qty?: number) => void;
  setQty: (id: number, qty: number) => void;
  remove: (id: number) => void;
  clear: () => void;
  setDelivery: (delivery: DeliveryInfo) => void;
  setPaymentMethod: (method: 'credit' | 'debit' | 'cash') => void;
  totalItems: number;
  subtotalCents: number;
};

const CartContext = createContext<CartContextValue | null>(null);

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case 'ADD': {
      const existing = state.items[action.coffee.id];
      const nextQty = (existing?.quantity ?? 0) + action.qty;

      return {
        ...state,
        items: {
          ...state.items,
          [action.coffee.id]: { coffee: action.coffee, quantity: nextQty },
        },
      };
    }

    case 'SET_QTY': {
      if (action.qty <= 0) {
        const { [action.id]: _removed, ...rest } = state.items;
        return { ...state, items: rest };
      }
      const existing = state.items[action.id];
      if (!existing) return state;

      return {
        ...state,
        items: {
          ...state.items,
          [action.id]: { ...existing, quantity: action.qty },
        },
      };
    }

    case 'REMOVE': {
      const { [action.id]: _removed, ...rest } = state.items;
      return { ...state, items: rest };
    }

    case 'CLEAR':
      return {
        items: {},
        delivery: state.delivery,
        paymentMethod: state.paymentMethod,
      };

    case 'SET_DELIVERY':
      return { ...state, delivery: action.delivery };

    case 'SET_PAYMENT':
      return { ...state, paymentMethod: action.method };

    default:
      return state;
  }
}

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(reducer, { items: {} });

  const itemsArray = useMemo(() => Object.values(state.items), [state.items]);

  const totalItems = useMemo(
    () => itemsArray.reduce((acc, it) => acc + it.quantity, 0),
    [itemsArray]
  );

  const subtotalCents = useMemo(
    () =>
      itemsArray.reduce(
        (acc, it) => acc + it.coffee.priceCents * it.quantity,
        0
      ),
    [itemsArray]
  );

  const value: CartContextValue = useMemo(
    () => ({
      state,
      add: (coffee, qty = 1) => dispatch({ type: 'ADD', coffee, qty }),
      setQty: (id, qty) => dispatch({ type: 'SET_QTY', id, qty }),
      remove: (id) => dispatch({ type: 'REMOVE', id }),
      clear: () => dispatch({ type: 'CLEAR' }),
      setDelivery: (delivery) => dispatch({ type: 'SET_DELIVERY', delivery }),
      setPaymentMethod: (method) => dispatch({ type: 'SET_PAYMENT', method }),
      totalItems,
      subtotalCents,
    }),
    [state, totalItems, subtotalCents]
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error('useCart must be used within CartProvider');
  return ctx;
}
