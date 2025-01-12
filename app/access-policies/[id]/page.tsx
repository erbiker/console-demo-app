import prisma from '@/lib/prisma';
import { AppPicker } from './app-picker';

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ApprovalsTab } from './approvals-tab';
import { DetailsTab } from './details-tab';

export default async function AccessPolicy({ params }: { params: { id: string } }) {
  const { id: policyId } = await params;
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [accessPolicy, apps, users, groups, approvals, grantActions, revokeActions] =
    await Promise.all([
      prisma.accessPolicy.findUnique({
        where: { id: policyId },
        include: { App: true, UserVisibility: true, UserGroupVisibility: true },
      }),
      prisma.app.findMany(),
      prisma.user.findMany(),
      prisma.userGroup.findMany(),
      prisma.accessPolicyApproval.findMany({
        where: { accessPolicyId: policyId },
        include: { ApprovalReviewers: { include: { User: true } } },
      }),
      prisma.accessPolicyProvisioningAction.findMany({
        where: {
          accessPolicyId: policyId,
          actionType: 'GRANT_ACCESS',
        },
      }),
      prisma.accessPolicyProvisioningAction.findMany({
        where: {
          accessPolicyId: policyId,
          actionType: 'REVOKE_ACCESS',
        },
      }),
    ]);

  if (!accessPolicy) {
    return <div>Policy not found</div>;
  }

  return (
    <main>
      <h1 className="flex items-center gap-6">Policy: {accessPolicy.name}</h1>
      <p>{accessPolicy.description}</p>
      <AppPicker apps={apps} selectedAppId={accessPolicy.App?.id} policyId={accessPolicy.id} />
      <Tabs defaultValue="details" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="details">Details</TabsTrigger>
          <TabsTrigger value="approvals">Approvals</TabsTrigger>
          <TabsTrigger value="grant">Grant Access</TabsTrigger>
          <TabsTrigger value="revoke">Revoke Access</TabsTrigger>
        </TabsList>
        <TabsContent value="details">
          <DetailsTab accessPolicy={accessPolicy} allUsers={users} allGroups={groups} />
        </TabsContent>
        <TabsContent value="approvals">
          <ApprovalsTab policyId={policyId} approvals={approvals} allUsers={users} />
        </TabsContent>
      </Tabs>
    </main>
  );
}
