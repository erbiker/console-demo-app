'use client';

import { User, UserGroup } from '@prisma/client';
import { ColumnDef } from '@tanstack/react-table';
import Image from 'next/image';

export const userColumns: ColumnDef<User>[] = [
  {
    accessorKey: 'avatar',
    header: 'User',
    cell: ({ row }) => {
      const user = row.original;
      return user.avatar ? (
        <div className="relative w-12 h-12 rounded-full overflow-hidden">
          <Image src={user.avatar} alt={user.firstName} fill className="object-cover" />
        </div>
      ) : null;
    },
  },
  {
    accessorKey: 'firstName',
    header: 'Name',
    cell: ({ row }) => {
      const user = row.original;
      return `${user.firstName} ${user.lastName}`;
    },
  },
];

export const groupColumns: ColumnDef<UserGroup>[] = [
  {
    accessorKey: 'name',
    header: 'Group',
  },
  {
    accessorKey: '_count.Users',
    header: 'Members',
  },
];
