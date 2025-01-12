'use client';

import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import { App } from '@prisma/client';
import { useTransition } from 'react';
import { updatePolicyApp } from './actions';

interface AppPickerProps {
  apps: App[];
  selectedAppId: string | undefined;
  policyId: string | undefined;
}

export function AppPicker({ apps, selectedAppId, policyId }: AppPickerProps) {
  const [isPending, startTransition] = useTransition();
  const { toast } = useToast();

  return (
    <div className="flex flex-col gap-2">
      <Label htmlFor="app-select" className="text-sm font-semibold">
        App:
      </Label>
      <Select
        value={selectedAppId}
        onValueChange={(value) => {
          startTransition(async () => {
            const result = await updatePolicyApp(policyId!, value);
            if (result.success) {
              toast({
                title: 'Success',
                description: 'Changes saved',
                duration: 2000,
              });
            } else {
              toast({
                variant: 'destructive',
                title: 'Error',
                description: 'Failed to save changes',
                duration: 5000,
              });
            }
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
