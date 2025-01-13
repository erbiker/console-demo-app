'use client';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useUpdateToast } from '@/hooks/use-update-toast';
import { AccessPolicyApproval, AccessPolicyApprovalReviewer, User } from '@prisma/client';
import { addApproval } from './actions';
import { ApprovalStep } from './approval-step';

type Props = {
  policyId: string;
  approvals: (AccessPolicyApproval & {
    ApprovalReviewers: (AccessPolicyApprovalReviewer & { User: User })[];
  })[];
  allUsers: User[];
};

export function ApprovalsTab({ policyId, approvals, allUsers }: Props) {
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
            <ApprovalStep
              key={approval.id}
              approval={approval}
              index={index}
              policyId={policyId}
              allUsers={allUsers}
            />
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
