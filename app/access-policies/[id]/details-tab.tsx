/* eslint-disable react-hooks/exhaustive-deps */
'use client';

import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Textarea } from '@/components/ui/textarea';
import { useDebounce } from '@/hooks/use-debounce';
import { useUpdateToast } from '@/hooks/use-update-toast';
import { useEffect, useState, useTransition } from 'react';
import { updatePolicy } from './actions';

interface DetailsTabProps {
  policyId: string;
  initialName: string;
  initialDescription: string | null;
  initialUniversalVisibility: boolean;
  initialAccessLength: number | null;
}

export function DetailsTab({
  policyId,
  initialName,
  initialDescription,
  initialUniversalVisibility,
  initialAccessLength,
}: DetailsTabProps) {
  const [isPending, startTransition] = useTransition();
  const { showUpdateToast } = useUpdateToast();

  const [name, setName] = useState(initialName);
  const [description, setDescription] = useState(initialDescription ?? '');
  const [universalVisibility, setUniversalVisibility] = useState(initialUniversalVisibility);
  const [accessLength, setAccessLength] = useState(initialAccessLength);

  const debouncedName = useDebounce(name, 1000);
  const debouncedDescription = useDebounce(description, 1000);

  useEffect(() => {
    if (debouncedName === initialName) {
      return;
    }

    startTransition(async () => {
      const result = await updatePolicy(policyId, { name: debouncedName });
      showUpdateToast(result);
    });
  }, [debouncedName]);

  useEffect(() => {
    if (debouncedDescription === initialDescription) {
      return;
    }

    startTransition(async () => {
      const result = await updatePolicy(policyId, { description: debouncedDescription });
      showUpdateToast(result);
    });
  }, [debouncedDescription]);

  return (
    <Card>
      <CardContent className="mt-4 space-y-2">
        <div className="space-y-1">
          <Label htmlFor="name" className="text-sm font-semibold">
            Name
          </Label>
          <Input id="name" value={name} onChange={(e) => setName(e.target.value)} required />
        </div>
        <div className="space-y-1">
          <Label htmlFor="description" className="text-sm font-semibold">
            Description
          </Label>
          <Textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
        <div className="space-y-1">
          <Label htmlFor="visibility">Visibility</Label>
          <Switch
            checked={universalVisibility}
            onCheckedChange={(checked) => {
              setUniversalVisibility(checked);
              startTransition(async () => {
                const result = await updatePolicy(policyId, { universalVisibility: checked });
                showUpdateToast(result);
              });
            }}
          />
        </div>
      </CardContent>
    </Card>
  );
}
