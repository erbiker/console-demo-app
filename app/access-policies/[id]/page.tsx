import prisma from '@/lib/prisma';
import { AppPicker } from './app-picker';

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { DetailsTab } from './details-tab';

export default async function AccessPolicy({ params }: { params: { id: string } }) {
  const { id: policyId } = await params;
  const [accessPolicy, apps, users, groups] = await Promise.all([
    prisma.accessPolicy.findUnique({
      where: { id: policyId },
      include: { app: true, UserVisibility: true, UserGroupVisibility: true },
    }),
    prisma.app.findMany(),
    prisma.user.findMany(),
    prisma.userGroup.findMany(),
  ]);

  if (!accessPolicy) {
    return <div>Policy not found</div>;
  }

  return (
    <main>
      <h1 className="flex items-center gap-6">Policy: {accessPolicy.name}</h1>
      <p>{accessPolicy.description}</p>
      <AppPicker apps={apps} selectedAppId={accessPolicy.app?.id} policyId={accessPolicy.id} />
      <Tabs defaultValue="details" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="details">Details</TabsTrigger>
          <TabsTrigger value="approvals">Approvals</TabsTrigger>
          <TabsTrigger value="grant">Grant Access</TabsTrigger>
          <TabsTrigger value="revoke">Revoke Access</TabsTrigger>
        </TabsList>
        <TabsContent value="details">
          <DetailsTab
            policyId={accessPolicy.id}
            initialName={accessPolicy.name}
            initialDescription={accessPolicy.description}
            initialUniversalVisibility={accessPolicy.universalVisibility}
            initialIndefiniteAccess={accessPolicy.indefiniteAccess}
            initialAccessLength={accessPolicy.accessLengthDays}
            initialAccessUsers={accessPolicy.UserVisibility.map((user) => user.id)}
            initialAccessGroups={accessPolicy.UserGroupVisibility.map((group) => group.id)}
            allUsers={users}
            allGroups={groups}
          />
        </TabsContent>
      </Tabs>
    </main>
  );
}
