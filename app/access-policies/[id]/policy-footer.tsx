'use client';

import { Button } from '@/components/ui/button';
import { AccessPolicy } from '@prisma/client';
import { deletePolicy, publishPolicy, unpublishPolicy } from './actions';

export function PolicyFooter({ accessPolicy }: { accessPolicy: AccessPolicy }) {
  return (
    <div className="flex flex-row gap-2 justify-end items-center">
      <Button
        variant="secondary"
        className="text-red-500 dark:text-red-700"
        onClick={() => deletePolicy(accessPolicy.id)}
      >
        Delete Policy
      </Button>
      {accessPolicy.publishedAt ? (
        <Button variant="outline" onClick={() => unpublishPolicy(accessPolicy.id)}>
          Unpublish Policy
        </Button>
      ) : (
        <Button variant="outline" onClick={() => publishPolicy(accessPolicy.id)}>
          Publish Policy
        </Button>
      )}
    </div>
  );
}
