import { cn } from '@/lib/cn';

export function Card(props: React.HTMLAttributes<HTMLDivElement>) {
  const { className, ...rest } = props;
  return (
    <div
      className={cn(
        'card-ring glass-card rounded-2xl border border-base-hover/70 bg-base-card/70 ring-base-hover/70 backdrop-blur-xl',
        className
      )}
      {...rest}
    />
  );
}
