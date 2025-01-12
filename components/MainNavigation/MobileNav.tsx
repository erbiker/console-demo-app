'use client';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Sheet, SheetClose, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { cn } from '@/lib/utils';
import { HamburgerMenuIcon } from '@radix-ui/react-icons';
import Link from 'next/link';

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
          <div className="mt-4">
            <HamburgerMenuIcon />
          </div>
        </SheetTrigger>
        <SheetContent side="top">
          <div className="flex flex-col gap-y-4 mb-4">
            <SheetClose asChild>
              <Link href="/" className="flex font-bold">
                <span className="ml-2 text-primary">Access</span>
                <span className="text-primary-700">Control</span>
              </Link>
            </SheetClose>
          </div>
          <Accordion type="single" collapsible>
            <AccordionItem value="Access Policies">
              <AccordionTrigger>
                <SheetClose asChild>
                  <Link href="/access-policies" className="text-lg">
                    Access Policies
                  </Link>
                </SheetClose>
              </AccordionTrigger>
              <AccordionContent>
                <SheetClose asChild>
                  <Link href="/access-policies/create">Create an Access Policy</Link>
                </SheetClose>
              </AccordionContent>
            </AccordionItem>
            <AccordionItem
              value="Users & Groups"
              className="flex flex-1 items-center justify-between py-4 font-medium transition-all hover:underline"
            >
              <SheetClose asChild>
                <Link href="/users">Users & Groups</Link>
              </SheetClose>
            </AccordionItem>
            <AccordionItem
              value="Apps"
              className="flex flex-1 items-center justify-between py-4 font-medium transition-all hover:underline"
            >
              <SheetClose asChild>
                <Link href="/apps">Apps</Link>
              </SheetClose>
            </AccordionItem>
          </Accordion>
        </SheetContent>
      </Sheet>
    </header>
  );
};

export default MobileNav;
