'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { useUpdateToast } from '@/hooks/use-update-toast';
import { App } from '@prisma/client';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { createPolicy } from '../[id]/actions';

export function AccessPolicyForm({ apps }: { apps: App[] }) {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    appId: '',
  });

  const { showUpdateToast } = useUpdateToast();

  const handleSubmit = async () => {
    const result = await createPolicy(formData);
    if (result.success) {
      router.push(`/access-policies/${result.policy?.id}`);
    } else {
      showUpdateToast(result);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Create Access Policy</CardTitle>
      </CardHeader>
      <CardContent>
        <div>
          <Label htmlFor="name">Name</Label>
          <Input
            type="text"
            id="name"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            required
          />
        </div>

        <div>
          <Label htmlFor="description">Description</Label>
          <Textarea
            id="description"
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            rows={3}
          />
        </div>

        <div>
          <Label htmlFor="app">App</Label>
          <Select
            value={formData.appId}
            onValueChange={(value) => setFormData({ ...formData, appId: value })}
            defaultValue={formData.appId}
          >
            <SelectTrigger id="app">
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
        </div>
      </CardContent>
      <CardFooter>
        <Button type="submit" onClick={handleSubmit}>
          Create Access Policy
        </Button>
      </CardFooter>
    </Card>
  );
}
