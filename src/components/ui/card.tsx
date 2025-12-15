import { cn } from '@/lib/cn';

export function Card(props: React.HTMLAttributes<HTMLDivElement>) {
  const { className, ...rest } = props;
  return (
    <div
      className={cn(
        'rounded-xl bg-zinc-900 shadow-card ring-1 ring-white/10',
        className
      )}
      {...rest}
    />
  );
}
