'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, Trophy } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import Logo from '@/components/icons/Logo';
import { cn } from '@/lib/utils';

const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/tournaments', label: 'Tournaments' },
  { href: '/dashboard', label: 'Dashboard' },
];

export default function Header() {
  const pathname = usePathname();

  const NavLink = ({ href, label }: { href: string; label: string }) => (
    <Button
      variant="link"
      asChild
      className={cn(
        'text-muted-foreground transition-colors hover:text-foreground',
        pathname === href && 'text-foreground font-semibold'
      )}
    >
      <Link href={href}>{label}</Link>
    </Button>
  );

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center">
        <div className="mr-4 flex">
          <Link href="/" className="mr-6 flex items-center space-x-2">
            <Logo className="h-6 w-auto" />
          </Link>
        </div>
        <nav className="hidden items-center space-x-2 md:flex">
          {navLinks.map((link) => (
            <NavLink key={link.href} {...link} />
          ))}
        </nav>
        <div className="flex flex-1 items-center justify-end space-x-4">
          <div className="md:hidden">
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon">
                  <Menu className="h-5 w-5" />
                  <span className="sr-only">Toggle Menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="right">
                <div className="flex flex-col space-y-4 p-4">
                    <Link href="/" className="mb-4">
                        <Logo className="h-8 w-auto" />
                    </Link>
                    {navLinks.map((link) => (
                        <Button variant="ghost" asChild key={link.href} className="justify-start">
                            <Link href={link.href}>{link.label}</Link>
                        </Button>
                    ))}
                </div>
              </SheetContent>
            </Sheet>
          </div>
          <Button asChild className="hidden sm:inline-flex">
            <Link href="/dashboard/create">
                <Trophy className="mr-2 h-4 w-4" />
                New Tournament
            </Link>
          </Button>
        </div>
      </div>
    </header>
  );
}
