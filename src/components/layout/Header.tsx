'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, Trophy } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import Logo from '@/components/icons/Logo';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';

const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/tournaments', label: 'Tournaments' },
  { href: '/dashboard', label: 'Dashboard' },
];

export default function Header() {
  const pathname = usePathname();

  const NavLink = ({ href, label }: { href: string; label: string }) => {
    const active = pathname === href;

    return (
      <motion.div whileHover={{ y: -2 }} className="relative">
        <Link
          href={href}
          className={cn(
            'px-3 py-2 font-semibold transition-colors',
            active
              ? 'text-foreground'
              : 'text-muted-foreground hover:text-foreground'
          )}
        >
          {label}
        </Link>

        {/* Active underline */}
        {active && (
          <motion.span
            layoutId="nav-underline"
            className="absolute left-0 right-0 -bottom-1 h-[2px] rounded-full bg-black"
          />
        )}
      </motion.div>
    );
  };

  return (
    <motion.header
      initial={{ y: -40, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      className="sticky top-0 z-50 w-full border-b bg-background/80 backdrop-blur"
    >
      <div className="container flex h-16 items-center justify-between">
        {/* LEFT */}
        <div className="flex items-center gap-6">
          <Link href="/" className="flex items-center gap-2">
            <Logo className="h-6 w-auto" />
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-2">
            {navLinks.map(link => (
              <NavLink key={link.href} {...link} />
            ))}
          </nav>
        </div>

        {/* RIGHT */}
        <div className="flex items-center gap-3">
          {/* Auth buttons */}
          <div className="hidden md:flex items-center gap-2">
            <Button
              asChild
              variant="ghost"
              className="font-semibold"
            >
              <a href="https://authbrfr.vercel.app/login" target="_blank">
                Login
              </a>
            </Button>

            <Button
              asChild
              className="rounded-full px-5 font-semibold"
            >
              <a href="https://authbrfr.vercel.app/register" target="_blank">
                Sign Up
              </a>
            </Button>
          </div>

          {/* New Tournament */}
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Button
              asChild
              className="hidden sm:inline-flex gap-2 border-2 border-black bg-black text-white hover:bg-white hover:text-black transition"
            >
              <Link href="/dashboard/create">
                <Trophy className="h-4 w-4" />
                New Tournament
              </Link>
            </Button>
          </motion.div>

          {/* Mobile Menu */}
          <div className="md:hidden">
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon">
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>

              <SheetContent side="right">
                <div className="flex flex-col gap-4 pt-6">
                  <Logo className="h-8 w-auto mb-4" />

                  {navLinks.map(link => (
                    <Link
                      key={link.href}
                      href={link.href}
                      className="text-lg font-semibold"
                    >
                      {link.label}
                    </Link>
                  ))}

                  <div className="mt-6 flex flex-col gap-3">
                    <Button asChild variant="outline">
                      <a href="https://authbrfr.vercel.app/login" target="_blank">
                        Login
                      </a>
                    </Button>

                    <Button asChild>
                      <a href="https://authbrfr.vercel.app/register" target="_blank">
                        Sign Up
                      </a>
                    </Button>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </motion.header>
  );
}

