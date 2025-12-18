import { Github, Twitter } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Logo from '@/components/icons/Logo';

export default function Footer() {
  return (
    <footer className="border-t">
      <div className="container flex flex-col items-center justify-between gap-4 py-10 md:h-24 md:flex-row md:py-0">
        <div className="flex flex-col items-center gap-4 px-8 md:flex-row md:gap-2 md:px-0">
          <Logo className="h-6 w-auto" />
          <p className="text-center text-sm leading-loose text-muted-foreground md:text-left">
            Built for modern sports organizers.
            <br />
            © {new Date().getFullYear()} ScoreFlow Inc. All rights reserved.
          </p>
        </div>
        <div className="flex items-center space-x-1">
          <Button variant="ghost" size="icon">
            <Twitter className="h-4 w-4" />
            <span className="sr-only">Twitter</span>
          </Button>
          <Button variant="ghost" size="icon">
            <Github className="h-4 w-4" />
            <span className="sr-only">GitHub</span>
          </Button>
        </div>
      </div>
    </footer>
  );
}
