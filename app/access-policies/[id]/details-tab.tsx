/* eslint-disable react-hooks/exhaustive-deps */
'use client';

import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { MultiSelect } from '@/components/ui/multi-select';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Textarea } from '@/components/ui/textarea';
import { useDebounce } from '@/hooks/use-debounce';
import { useUpdateToast } from '@/hooks/use-update-toast';
import { User, UserGroup } from '@prisma/client';
import { useEffect, useState, useTransition } from 'react';
import { updatePolicy } from './actions';

interface DetailsTabProps {
  policyId: string;
  initialName: string;
  initialDescription: string | null;
  initialUniversalVisibility: boolean;
  initialIndefiniteAccess: boolean;
  initialAccessUsers: string[];
  initialAccessGroups: string[];
  initialAccessLength: number | null;
  allUsers: User[];
  allGroups: UserGroup[];
}

export function DetailsTab({
  policyId,
  initialName,
  initialDescription,
  initialUniversalVisibility,
  initialIndefiniteAccess,
  initialAccessUsers,
  initialAccessGroups,
  initialAccessLength,
  allUsers,
  allGroups,
}: DetailsTabProps) {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [isPending, startTransition] = useTransition();
  const { showUpdateToast } = useUpdateToast();

  const [name, setName] = useState(initialName);
  const [description, setDescription] = useState(initialDescription ?? '');
  const [universalVisibility, setUniversalVisibility] = useState(initialUniversalVisibility);
  const [indefiniteAccess, setIndefiniteAccess] = useState(initialIndefiniteAccess);
  const [accessLength, setAccessLength] = useState<number | null>(initialAccessLength);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [accessUsers, setAccessUsers] = useState(initialAccessUsers);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [accessGroups, setAccessGroups] = useState(initialAccessGroups);

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
        <div className="flex flex-row items-center gap-2">
          <Label htmlFor="visibility" className="text-sm font-semibold">
            Visibility
          </Label>
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
        {!universalVisibility && (
          <div className="flex flex-col gap-2">
            <div className="space-y-1 p-4 py-2 bg-zinc-100 dark:bg-zinc-800 rounded-md">
              <Label htmlFor="accessUsers" className="text-sm font-semibold">
                Access Users
              </Label>
              <MultiSelect
                options={allUsers.map((user) => ({
                  label: user.firstName + ' ' + user.lastName,
                  value: user.id,
                }))}
                onValueChange={(values) => {
                  setAccessUsers(values);
                  startTransition(async () => {
                    const result = await updatePolicy(policyId, {
                      UserVisibility: {
                        set: values.map((id) => ({ id })),
                      },
                    });
                    showUpdateToast(result);
                  });
                }}
                placeholder="Select users"
                variant="inverted"
                className="bg-zinc-400 hover:bg-zinc-400/80 dark:bg-zinc-800 dark:hover:bg-zinc-800/80"
              />
            </div>
            <div className="space-y-1 p-4 py-2 bg-zinc-100 dark:bg-zinc-800 rounded-md">
              <Label htmlFor="accessGroups" className="text-sm font-semibold">
                Access Groups
              </Label>
              <MultiSelect
                options={allGroups.map((group) => ({
                  label: group.name,
                  value: group.id,
                }))}
                onValueChange={(values) => {
                  setAccessGroups(values);
                  startTransition(async () => {
                    const result = await updatePolicy(policyId, {
                      UserGroupVisibility: {
                        set: values.map((id) => ({ id })),
                      },
                    });
                    showUpdateToast(result);
                  });
                }}
                placeholder="Select groups"
                variant="inverted"
                className="bg-zinc-400 hover:bg-zinc-400/80 dark:bg-zinc-800 dark:hover:bg-zinc-800/80"
              />
            </div>
          </div>
        )}
        <div className="flex flex-row items-center gap-2">
          <Label htmlFor="indefiniteAccess" className="text-sm font-semibold">
            Indefinite Access
          </Label>
          <Switch
            checked={indefiniteAccess}
            onCheckedChange={(checked) => {
              setIndefiniteAccess(checked);
              startTransition(async () => {
                const result = await updatePolicy(policyId, {
                  indefiniteAccess: checked,
                });
                showUpdateToast(result);
              });
            }}
          />
        </div>
        {!indefiniteAccess && (
          <div className="space-y-1 p-4 py-2 bg-zinc-100 dark:bg-zinc-800 rounded-md">
            <Label htmlFor="accessLength" className="text-sm font-semibold">
              Access Length
            </Label>
            <Select
              value={accessLength?.toString() ?? 'null'}
              onValueChange={(value) => {
                const newLength = value === 'null' ? null : Number(value);
                setAccessLength(newLength);
                startTransition(async () => {
                  const result = await updatePolicy(policyId, {
                    accessLengthDays: newLength,
                  });
                  showUpdateToast(result);
                });
              }}
            >
              <SelectTrigger id="accessLength">
                <SelectValue placeholder="Select access length" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="1">1 day</SelectItem>
                <SelectItem value="7">1 week</SelectItem>
                <SelectItem value="30">1 month</SelectItem>
                <SelectItem value="90">3 months</SelectItem>
                <SelectItem value="180">6 months</SelectItem>
                <SelectItem value="365">1 year</SelectItem>
                <SelectItem value="null">Custom (Allow user to request access length)</SelectItem>
              </SelectContent>
            </Select>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
