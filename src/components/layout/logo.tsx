import Link from 'next/link';
import { Plus } from 'lucide-react';

export function Logo() {
  return (
    <Link
      href="/home"
      className="flex items-center gap-2 text-xl font-bold font-headline text-primary"
      aria-label="Care4U Home"
    >
      <div className="rounded-full bg-primary/20 p-2">
        <Plus className="h-5 w-5 text-primary" />
      </div>
      <span>Care4U</span>
    </Link>
  );
}
