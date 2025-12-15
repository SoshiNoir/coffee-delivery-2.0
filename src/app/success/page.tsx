import Link from 'next/link';

export default function Success() {
  return (
    <div className='mx-auto max-w-xl space-y-3'>
      <h1 className='text-2xl font-bold'>Order confirmed ✅</h1>
      <p className='text-zinc-300'>
        Next step: show address + payment summary + ETA.
      </p>
      <Link className='underline' href='/'>
        Back to catalog
      </Link>
    </div>
  );
}
