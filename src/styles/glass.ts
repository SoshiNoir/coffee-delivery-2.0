import { cn } from '@/lib/cn';

export const glassIconClass = cn(
  'inline-flex items-center justify-center rounded-lg',
  'bg-[linear-gradient(135deg,rgba(128,71,248,0.3),rgba(75,41,149,0.26))]',
  'text-white',
  'shadow-[0_14px_30px_rgba(128,71,248,0.28)]',
  'ring-1 ring-white/35',
  'backdrop-blur',
  'transition hover:bg-[linear-gradient(135deg,rgba(128,71,248,0.42),rgba(75,41,149,0.34))]',
  'hover:shadow-[0_16px_34px_rgba(128,71,248,0.32)]'
);
