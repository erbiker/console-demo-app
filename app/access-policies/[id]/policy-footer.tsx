'use client';

import { Button } from '@/components/ui/button';
import { useUpdateToast } from '@/hooks/use-update-toast';
import { AccessPolicy } from '@prisma/client';
import { useRouter } from 'next/navigation';
import { deletePolicy, publishPolicy, unpublishPolicy } from './actions';

export function PolicyFooter({ accessPolicy }: { accessPolicy: AccessPolicy }) {
  const { showUpdateToast } = useUpdateToast();
  const router = useRouter();
  return (
    <div className="flex flex-row gap-2 justify-end items-center">
      <Button
        variant="secondary"
        className="text-red-500 dark:text-red-700"
        onClick={async () => {
          const result = await deletePolicy(accessPolicy.id);
          showUpdateToast(result);
          if (result.success) {
            router.push('/access-policies');
          }
        }}
      >
        Delete Policy
      </Button>
      {accessPolicy.publishedAt ? (
        <Button
          variant="outline"
          onClick={async () => {
            const result = await unpublishPolicy(accessPolicy.id);
            showUpdateToast(result);
          }}
        >
          Unpublish Policy
        </Button>
      ) : (
        <Button
          variant="outline"
          onClick={async () => {
            const result = await publishPolicy(accessPolicy.id);
            showUpdateToast(result, {
              successMessage: result.warnings?.length ? result.warnings[0] : undefined,
              errorMessage: result.errors?.length ? result.errors[0] : undefined,
            });
          }}
        >
          Publish Policy
        </Button>
      )}
    </div>
  );
}
