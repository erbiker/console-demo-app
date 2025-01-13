import { Button } from '@/components/ui/button';
import { DataTable } from '@/components/ui/data-table';
import prisma from '@/lib/prisma';
import Link from 'next/link';
import { accessPolicyColumns } from './columns';

export default async function AccessPolicies() {
  const accessPolicies = await prisma.accessPolicy.findMany({
    include: {
      App: {
        select: {
          name: true,
          logo: true,
        },
      },
    },
  });
  console.log(accessPolicies);

  return (
    <main>
      <h1>Access Policies</h1>
      <DataTable columns={accessPolicyColumns} data={accessPolicies} />
      <Link href="/access-policies/create">
        <Button>Create Access Policy</Button>
      </Link>
    </main>
  );
}
