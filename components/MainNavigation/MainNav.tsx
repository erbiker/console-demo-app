'use client';
import React from 'react';

import Link from 'next/link';
import Image from 'next/image';
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuTrigger,
  NavigationMenuContent,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from '@/components/ui/navigation-menu';
import { NavListItem } from '@/components/MainNavigation';
import { cn } from '@/lib/utils';

const MainNav: React.FC<{ className?: string }> = ({ className }) => {
  return (
    <header
      className={cn(
        'sticky top-0 w-full shadow-small z-10 px-4 py-1 flex space-x-4 backdrop-blur-xl',
        className,
      )}
    >
      <div className="flex items-center font-extrabold text-2xl">
        <Link href="/" className="flex">
          <Image src="/cyclefix.svg" alt="CycleFix Logo" width={40} height={27} priority />
          <span className="ml-2 text-primary">Cycle</span>
          <span className="text-primary-700">Fix</span>
        </Link>
      </div>
      <NavigationMenu className="max-w-full justify-between">
        <NavigationMenuList>
          <NavigationMenuItem>
            <NavigationMenuTrigger>
              <Link href="/services">Services</Link>
            </NavigationMenuTrigger>
            <NavigationMenuContent>
              <ul className="grid gap-3 p-6 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
                <li className="row-span-3">
                  <NavigationMenuLink asChild>
                    <Link href="/services/pro" legacyBehavior passHref>
                      <div className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-accent/50 to-accent p-6 no-underline outline-none focus:shadow-md">
                        <div className="mb-2 mt-4 text-lg font-medium">CycleFix [Pro]</div>
                        <p className="text-sm leading-tight text-muted-foreground">
                          Personal race mechanic, on retainer.
                        </p>
                      </div>
                    </Link>
                  </NavigationMenuLink>
                </li>
                <NavListItem href="/services/ondemand" title="On-demand">
                  Repairs you can trust, when you need them.
                </NavListItem>
                <NavListItem href="/services/waffles" title="Waffles">
                  Fresh waffles for your race, event, or group ride.
                </NavListItem>
              </ul>
            </NavigationMenuContent>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <Link href="/cf-app" legacyBehavior passHref>
              <NavigationMenuLink className={navigationMenuTriggerStyle()}>App</NavigationMenuLink>
            </Link>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <Link href="/blog" legacyBehavior passHref>
              <NavigationMenuLink className={navigationMenuTriggerStyle()}>Blog</NavigationMenuLink>
            </Link>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <Link href="/about" legacyBehavior passHref>
              <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                About
              </NavigationMenuLink>
            </Link>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>
    </header>
  );
};

export default MainNav;
