import { Button } from '@/components/ui/button';
import { DataTable } from '@/components/ui/data-table';
import prisma from '@/lib/prisma';
import { columns } from './columns';

export default async function Apps() {
  const apps = await prisma.app.findMany();
  console.log(apps);

  return (
    <main>
      <h1>Apps</h1>
      <DataTable columns={columns} data={apps} />
      <Button>Create App</Button>
    </main>
  );
}
