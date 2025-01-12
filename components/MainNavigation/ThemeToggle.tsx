'use client';
import { MoonIcon, SunIcon } from '@radix-ui/react-icons';
import { useTheme } from 'next-themes';

import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';
import { Tooltip } from '@nextui-org/tooltip';
import { SystemThemeIcon } from '@/components/svg-icons';

export default function ThemeToggle() {
  const { theme, setTheme } = useTheme();

  return (
    <ToggleGroup type="single" variant="outline" defaultValue={theme}>
      <Tooltip content="Light" placement="bottom">
        <ToggleGroupItem value="light" className="px-0" onClick={() => setTheme('light')}>
          <SunIcon className="h-full w-full p-2" />
        </ToggleGroupItem>
      </Tooltip>
      <Tooltip content="Dark" placement="bottom">
        <ToggleGroupItem value="dark" className="px-0" onClick={() => setTheme('dark')}>
          <MoonIcon className="h-full w-full p-2" />
        </ToggleGroupItem>
      </Tooltip>
      <Tooltip content="System" placement="bottom">
        <ToggleGroupItem value="system" className="px-0" onClick={() => setTheme('system')}>
          <SystemThemeIcon className="h-full w-full p-1.5 rotate-90 scale-100 transition-all" />
        </ToggleGroupItem>
      </Tooltip>
    </ToggleGroup>
  );
}
