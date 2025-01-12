'use client';
import Link from 'next/link';
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuTrigger,
  NavigationMenuContent,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from '@/components/ui/navigation-menu';
import { ThemeToggle } from '@/components/MainNavigation';
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
          <span className="ml-2 text-primary">Access</span>
          <span className="text-primary-700">Control</span>
        </Link>
      </div>
      <NavigationMenu className="max-w-full justify-between">
        <NavigationMenuList>
          <NavigationMenuItem>
            <NavigationMenuTrigger>
              <Link href="/access-policies">Access Policies</Link>
            </NavigationMenuTrigger>
            <NavigationMenuContent>
              <div className="p-4 w-fit">
                <div>
                  <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                    <Link href="/access-policies/create">Create an Access Policy</Link>
                  </NavigationMenuLink>
                </div>
              </div>
            </NavigationMenuContent>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <Link href="/users" legacyBehavior passHref>
              <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                Users & Groups
              </NavigationMenuLink>
            </Link>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <Link href="/apps" legacyBehavior passHref>
              <NavigationMenuLink className={navigationMenuTriggerStyle()}>Apps</NavigationMenuLink>
            </Link>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>
      <ThemeToggle />
    </header>
  );
};

export default MainNav;
