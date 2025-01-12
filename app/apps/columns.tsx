'use client';

import { App } from '@prisma/client';
import { ColumnDef } from '@tanstack/react-table';
import Image from 'next/image';
export const columns: ColumnDef<App>[] = [
  {
    accessorKey: 'logo',
    header: 'Logo',
    cell: ({ row }) => {
      const app = row.original;
      return app.logo ? (
        <div className="relative w-12 h-12 rounded-full overflow-hidden">
          <Image src={app.logo} alt={app.name} fill className="object-cover" />
        </div>
      ) : null;
    },
  },
  {
    accessorKey: 'name',
    header: 'Name',
  },
];
