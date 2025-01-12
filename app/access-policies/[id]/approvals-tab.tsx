'use client';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { MultiSelect } from '@/components/ui/multi-select';
import { useUpdateToast } from '@/hooks/use-update-toast';
import { AccessPolicyApproval, AccessPolicyApprovalReviewer, User } from '@prisma/client';
import { TrashIcon } from '@radix-ui/react-icons';
import { useTransition } from 'react';
import { addApproval, deleteApproval, updateApproval } from './actions';

type Props = {
  policyId: string;
  approvals: (AccessPolicyApproval & {
    ApprovalReviewers: (AccessPolicyApprovalReviewer & { User: User })[];
  })[];
  allUsers: User[];
};

export function ApprovalsTab({ policyId, approvals, allUsers }: Props) {
  const { showUpdateToast } = useUpdateToast();
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [isPending, startTransition] = useTransition();

  return (
    <Card>
      <CardHeader>
        <div className="flex flex-row items-center justify-between">
          <div className="flex flex-col gap-2">
            <CardTitle>Approvals</CardTitle>
            <CardDescription>
              Set an approver for the access grant, or a series of approvers.
            </CardDescription>
          </div>
          <Button
            onClick={async () => {
              const result = await addApproval(policyId);
              showUpdateToast(result);
            }}
          >
            Add Approval Step
          </Button>
        </div>
      </CardHeader>
      <CardContent className="mt-4 space-y-2">
        <div className="space-y-1">
          {approvals.map((approval, index) => (
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
                  onValueChange={(values) => {
                    console.log(values);
                    startTransition(async () => {
                      const result = await updateApproval(
                        approval.id,
                        {
                          ApprovalReviewers: {
                            set: values.map((id) => ({ id })),
                          },
                        },
                        policyId,
                      );
                      showUpdateToast(result);
                    });
                  }}
                  placeholder="Select approvers"
                  variant="inverted"
                  className="bg-zinc-400 hover:bg-zinc-400/80 dark:bg-zinc-800 dark:hover:bg-zinc-800/80 text-black dark:text-white"
                />
              </CardContent>
            </Card>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
