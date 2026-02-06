'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { Logo } from './logo';
import { UserNav } from './user-nav';
import { LayoutDashboard, Search, FileClock, HeartPulse, Stethoscope, Phone, Home } from 'lucide-react';
import { Button } from '../ui/button';

const navLinks = [
  { href: '/home', label: 'Home', icon: Home },
  { href: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/search', label: 'Search', icon: Search },
  { href: '/discharge', label: 'Discharge', icon: Stethoscope },
  { href: '/history', label: 'History', icon: FileClock },
  { href: '/profile', label: 'Profile', icon: HeartPulse },
];

export function Header() {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/50 bg-card/80 shadow-sm backdrop-blur-lg">
      <div className="container mx-auto flex h-16 items-center px-4 sm:px-6">
        <Logo />
        <nav className="mx-auto hidden items-center space-x-2 md:flex">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "flex items-center gap-2 rounded-md px-4 py-2 text-sm font-medium transition-colors hover:bg-secondary/50 hover:text-secondary-foreground",
                (pathname === link.href || (link.href === '/home' && pathname === '/dashboard'))
                  ? "bg-secondary text-secondary-foreground"
                  : "text-muted-foreground"
              )}
            >
              <link.icon className="h-4 w-4" />
              {link.label}
            </Link>
          ))}
        </nav>
        <div className="ml-auto flex items-center gap-2 sm:gap-4">
          <a href="tel:911">
            <Button variant="destructive" size="sm" className="h-9">
                <Phone className="h-4 w-4" />
                <span className="hidden sm:inline ml-2">Call 911</span>
            </Button>
          </a>
          <UserNav />
        </div>
      </div>
    </header>
  );
}
