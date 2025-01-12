'use client';
import { MoonIcon, SunIcon, UpdateIcon } from '@radix-ui/react-icons';
import { useTheme } from 'next-themes';

import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';

export default function ThemeToggle() {
  const { theme, setTheme } = useTheme();

  return (
    <ToggleGroup type="single" variant="outline" defaultValue={theme}>
      <ToggleGroupItem value="light" className="" onClick={() => setTheme('light')}>
        <SunIcon className="h-full w-full" />
      </ToggleGroupItem>
      <ToggleGroupItem value="dark" className="" onClick={() => setTheme('dark')}>
        <MoonIcon className="h-full w-full" />
      </ToggleGroupItem>
      <ToggleGroupItem value="system" className="" onClick={() => setTheme('system')}>
        <UpdateIcon className="h-full w-full rotate-90 scale-100 transition-all" />
      </ToggleGroupItem>
    </ToggleGroup>
  );
}
