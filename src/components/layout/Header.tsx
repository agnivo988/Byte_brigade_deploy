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

  const NavLink = ({ href, label }: { href: string; label: string }) => (
    <motion.div
      whileHover={{ scale: 1.05 }}
      className="inline-block"
    >
      <Button
        variant="link"
        asChild
        className={cn(
          'text-muted-foreground transition-colors hover:text-foreground hover:bg-black hover:bg-opacity-10 rounded-md px-3 py-2 font-semibold',
          pathname === href && 'text-foreground font-bold'
        )}
      >
        <Link href={href}>{label}</Link>
      </Button>
    </motion.div>
  );

  return (
    <motion.header
      initial={{ y: -50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60"
    >
      <div className="container flex h-16 items-center">
        {/* Logo */}
        <motion.div
          initial={{ x: -50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="mr-4 flex"
        >
          <Link href="/" className="mr-6 flex items-center space-x-2">
            <Logo className="h-6 w-auto" />
          </Link>
        </motion.div>

        {/* Desktop Nav */}
        <nav className="hidden items-center space-x-2 md:flex">
          {navLinks.map((link) => (
            <NavLink key={link.href} {...link} />
          ))}
        </nav>

        {/* Right Buttons */}
        <div className="flex flex-1 items-center justify-end space-x-4">
          {/* Mobile Menu */}
          <div className="md:hidden">
            <Sheet>
              <SheetTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="rounded-md p-2 hover:bg-black hover:bg-opacity-10 transition-colors"
                >
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
                    <Button
                      variant="ghost"
                      asChild
                      key={link.href}
                      className="justify-start rounded-md px-3 py-2 hover:bg-black hover:bg-opacity-10 transition-colors"
                    >
                      <Link href={link.href}>{link.label}</Link>
                    </Button>
                  ))}
                </div>
              </SheetContent>
            </Sheet>
          </div>

          {/* New Tournament Button */}
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Button
              asChild
              className="hidden sm:inline-flex bg-black text-white rounded-md px-4 py-2 font-semibold transition-colors hover:bg-white hover:text-black border-2 border-black"
            >
              <Link href="/dashboard/create" className="flex items-center gap-2">
                <Trophy className="h-4 w-4" />
                New Tournament
              </Link>
            </Button>
          </motion.div>
        </div>
      </div>
    </motion.header>
  );
}

