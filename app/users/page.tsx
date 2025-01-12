import { Button } from '@/components/ui/button';
import { DataTable } from '@/components/ui/data-table';
import prisma from '@/lib/prisma';
import { groupColumns, userColumns } from './columns';

export default async function Users() {
  const users = await prisma.user.findMany();
  const groups = await prisma.userGroup.findMany({
    include: {
      _count: {
        select: { Users: true },
      },
    },
  });

  return (
    <main>
      <h1>Users</h1>
      <DataTable columns={userColumns} data={users} />

      <Button>Create User</Button>

      <h1>Groups</h1>
      <DataTable columns={groupColumns} data={groups} />
    </main>
  );
}
