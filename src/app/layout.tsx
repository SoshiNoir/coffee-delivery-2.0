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
      <body className='min-h-dvh bg-base-background text-base-text dark:bg-zinc-900 dark:text-zinc-50'>
        <CartProvider>
          <Header />
          <main className='mx-auto w-full max-w-6xl px-4 py-5'>{children}</main>
        </CartProvider>
      </body>
    </html>
  );
}
