'use client';

import { AccessPolicy, App } from '@prisma/client';
import { ColumnDef } from '@tanstack/react-table';
import Image from 'next/image';

type AccessPolicyWithApp = AccessPolicy & {
  app: Pick<App, 'name' | 'logo'>;
};

export const accessPolicyColumns: ColumnDef<AccessPolicyWithApp>[] = [
  {
    accessorKey: 'name',
    header: 'Name',
  },
  {
    accessorKey: 'description',
    header: 'Description',
  },
  {
    accessorKey: 'app',
    header: 'App',
    cell: ({ row }) => {
      const app = row.original.app;
      return (
        <div className="flex items-center gap-1">
          {app.name}
          {app.logo && <Image src={app.logo} alt={app.name} width={16} height={16} />}
        </div>
      );
    },
  },
];
