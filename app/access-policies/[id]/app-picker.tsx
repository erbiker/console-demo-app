'use client';

import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useUpdateToast } from '@/hooks/use-update-toast';
import { App } from '@prisma/client';
import { useTransition } from 'react';
import { updatePolicy } from './actions';

interface AppPickerProps {
  apps: App[];
  selectedAppId: string | undefined;
  policyId: string | undefined;
}

export function AppPicker({ apps, selectedAppId, policyId }: AppPickerProps) {
  const [isPending, startTransition] = useTransition();
  const { showUpdateToast } = useUpdateToast();

  return (
    <div className="flex flex-col gap-2">
      <Label htmlFor="app-select" className="text-sm font-semibold">
        App:
      </Label>
      <Select
        value={selectedAppId}
        onValueChange={(value) => {
          startTransition(async () => {
            const result = await updatePolicy(policyId!, { appId: value });
            showUpdateToast(result);
          });
        }}
        disabled={isPending}
      >
        <SelectTrigger>
          <SelectValue placeholder="Select an app" />
        </SelectTrigger>
        <SelectContent>
          {apps.map((app) => (
            <SelectItem key={app.id} value={app.id}>
              {app.name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      {isPending && <span>Updating...</span>}
    </div>
  );
}
