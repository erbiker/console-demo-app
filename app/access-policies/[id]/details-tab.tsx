/* eslint-disable react-hooks/exhaustive-deps */
'use client';

import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useDebounce } from '@/hooks/use-debounce';
import { useUpdateToast } from '@/hooks/use-update-toast';
import { useEffect, useState, useTransition } from 'react';
import { updatePolicy } from './actions';

interface DetailsTabProps {
  policyId: string;
  initialName: string;
  initialDescription: string | null;
}

export function DetailsTab({ policyId, initialName, initialDescription }: DetailsTabProps) {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [isPending, startTransition] = useTransition();
  const { showUpdateToast } = useUpdateToast();

  const [name, setName] = useState(initialName);
  const [description, setDescription] = useState(initialDescription ?? '');

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
          <Label htmlFor="name">Name</Label>
          <Input id="name" value={name} onChange={(e) => setName(e.target.value)} required />
        </div>
        <div className="space-y-1">
          <Label htmlFor="description">Description</Label>
          <Textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
      </CardContent>
    </Card>
  );
}
