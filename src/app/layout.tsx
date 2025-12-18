import { Header } from '@/components/header';
import { CartProvider } from '@/store/cart/cart-context';
import { Baloo_2, Roboto } from 'next/font/google';
import './globals.css';

const baloo = Baloo_2({
  subsets: ['latin'],
  weight: ['700', '800'],
  variable: '--font-title',
});

const roboto = Roboto({
  subsets: ['latin'],
  weight: ['400', '500', '700'],
  variable: '--font-body',
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang='pt-BR' className={`${baloo.variable} ${roboto.variable}`}>
      <body className='min-h-dvh bg-base-background text-base-text overflow-x-hidden'>
        <CartProvider>
          <Header />
          <main className='mx-auto w-full sm:max-w-7xl px-0 sm:px-5 py-6 sm:py-6'>
            {children}
          </main>
        </CartProvider>
      </body>
    </html>
  );
}
