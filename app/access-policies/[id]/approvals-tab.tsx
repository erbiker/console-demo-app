'use client';

import { Card, CardContent } from '@/components/ui/card';
import { Label } from '@/components/ui/label';

export function ApprovalsTab() {
  return (
    <Card>
      <CardContent className="mt-4 space-y-2">
        <div className="space-y-1">
          <Label htmlFor="name" className="text-sm font-semibold">
            Name
          </Label>
        </div>
      </CardContent>
    </Card>
  );
}
