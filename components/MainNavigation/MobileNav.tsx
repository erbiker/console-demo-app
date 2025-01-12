'use client';
import Image from 'next/image';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import { Sheet, SheetClose, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import ListItem from './NavListItem';
import { HamburgerMenuIcon } from '@radix-ui/react-icons';

const MobileNav: React.FC<{ className?: string }> = ({ className }) => {
  return (
    <header
      className={cn(
        'sticky top-0 w-full shadow-small z-10 px-4 py-1 flex justify-between space-x-4 backdrop-blur-xl',
        className,
      )}
    >
      <Sheet>
        <SheetTrigger className="flex items-center font-extrabold text-2xl">
          <HamburgerMenuIcon />
        </SheetTrigger>
        <SheetContent side="top">
          <div className="flex flex-col gap-y-4 mb-4">
            <SheetClose asChild>
              <Link href="/" className="flex font-bold">
                <Image src="/cyclefix.svg" alt="CycleFix Logo" width={40} height={27} priority />
                <span className="ml-2 text-primary">Cycle</span>
                <span className="text-secondary">Fix</span>
              </Link>
            </SheetClose>
          </div>
          <Accordion type="single" collapsible>
            <AccordionItem value="Services">
              <AccordionTrigger>
                <SheetClose asChild>
                  <Link href="/services">Services</Link>
                </SheetClose>
              </AccordionTrigger>
              <AccordionContent>
                <SheetClose asChild>
                  <Link href="/services/pro">
                    <div className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-accent/50 to-accent p-6 no-underline outline-none focus:shadow-md">
                      <div className="mb-2 mt-4 text-lg font-medium">CycleFix [Pro]</div>
                      <p className="text-sm leading-tight text-muted-foreground">
                        Personal race mechanic, on retainer.
                      </p>
                    </div>
                  </Link>
                </SheetClose>
                <SheetClose asChild>
                  <ListItem href="/services/ondemand" title="On-demand">
                    Repairs you can trust, when you need them.
                  </ListItem>
                </SheetClose>
                <SheetClose asChild>
                  <ListItem href="/services/waffles" title="Waffles">
                    Fresh waffles for your race, event, or group ride.
                  </ListItem>
                </SheetClose>
              </AccordionContent>
            </AccordionItem>
            <AccordionItem
              value="App"
              className="flex flex-1 items-center justify-between py-4 font-medium transition-all hover:underline"
            >
              <SheetClose asChild>
                <Link href="/cf-app">App</Link>
              </SheetClose>
            </AccordionItem>
            <AccordionItem
              value="Blog"
              className="flex flex-1 items-center justify-between py-4 font-medium transition-all hover:underline"
            >
              <SheetClose asChild>
                <Link href="/blog">Blog</Link>
              </SheetClose>
            </AccordionItem>
            <AccordionItem
              value="About"
              className="flex flex-1 items-center justify-between py-4 font-medium transition-all hover:underline"
            >
              <SheetClose asChild>
                <Link href="/about">About</Link>
              </SheetClose>
            </AccordionItem>
          </Accordion>
        </SheetContent>
      </Sheet>
    </header>
  );
};

export default MobileNav;
