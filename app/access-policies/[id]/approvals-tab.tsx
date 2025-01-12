'use client';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useUpdateToast } from '@/hooks/use-update-toast';
import { AccessPolicyApproval, AccessPolicyApprovalReviewer, User } from '@prisma/client';
import { TrashIcon } from '@radix-ui/react-icons';
import { deleteApproval } from './actions';

type Props = {
  policyId: string;
  approvals: (AccessPolicyApproval & {
    ApprovalReviewers: (AccessPolicyApprovalReviewer & { User: User })[];
  })[];
};

export function ApprovalsTab({ policyId, approvals }: Props) {
  const { showUpdateToast } = useUpdateToast();

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
          <Button>Add Approval Step</Button>
        </div>
      </CardHeader>
      <CardContent className="mt-4 space-y-2">
        <div className="space-y-1">
          {approvals.map((approval) => (
            <Card key={approval.id} className="bg-zinc-100 dark:bg-zinc-800">
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle>Approval step {approval.priority}</CardTitle>
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
                <p>
                  {approval.ApprovalReviewers.map(
                    (reviewer) => reviewer.User.firstName + ' ' + reviewer.User.lastName,
                  ).join(', ')}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
