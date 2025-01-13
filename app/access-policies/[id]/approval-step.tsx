'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { MultiSelect } from '@/components/ui/multi-select';
import { useUpdateToast } from '@/hooks/use-update-toast';
import { AccessPolicyApproval, AccessPolicyApprovalReviewer, User } from '@prisma/client';
import { TrashIcon } from '@radix-ui/react-icons';
import { deleteApproval, updateApproval } from './actions';

type Props = {
  approval: AccessPolicyApproval & {
    ApprovalReviewers: (AccessPolicyApprovalReviewer & { User: User })[];
  };
  index: number;
  policyId: string;
  allUsers: User[];
};

export function ApprovalStep({ approval, index, policyId, allUsers }: Props) {
  const { showUpdateToast } = useUpdateToast();

  return (
    <Card key={approval.id} className="bg-zinc-100 dark:bg-zinc-800">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Approval step {index + 1}</CardTitle>
        <Button
          variant="destructive"
          size="icon"
          onClick={async () => {
            const result = await deleteApproval(approval.id, policyId);
            showUpdateToast(result);
          }}
        >
          <TrashIcon />
        </Button>
      </CardHeader>
      <CardContent>
        <p className="text-sm font-semibold">Approvers:</p>
        <MultiSelect
          options={allUsers.map((user) => ({
            label: user.firstName + ' ' + user.lastName,
            value: user.id,
          }))}
          defaultValue={approval.ApprovalReviewers.map((reviewer) => reviewer.userId)}
          onValueChange={async (values) => {
            const result = await updateApproval(
              approval.id,
              {
                ApprovalReviewers: {
                  deleteMany: {},
                  create: values.map((id) => ({ userId: id })),
                },
              },
              policyId,
            );
            showUpdateToast(result);
          }}
          placeholder="Select approvers"
          variant="inverted"
          className="bg-zinc-400 hover:bg-zinc-400/80 dark:bg-zinc-800 dark:hover:bg-zinc-800/80 text-black dark:text-white"
        />
      </CardContent>
    </Card>
  );
}
