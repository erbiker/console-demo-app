import { Button } from '@/components/ui/button';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import prisma from '@/lib/prisma';
import Image from 'next/image';
import Link from 'next/link';

export default async function Users() {
  const users = await prisma.user.findMany();
  const groups = await prisma.userGroup.findMany({
    include: {
      _count: {
        select: { Users: true },
      },
    },
  });
  console.log(users);

  return (
    <main>
      <h1>Users</h1>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>User</TableHead>
            <TableHead>Name</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {users.map((user) => (
            <Link href={`/users/${user.id}`} key={user.id} legacyBehavior>
              <TableRow key={user.id}>
                <TableCell>
                  {user.avatar && (
                    <div className="relative w-10 h-10 rounded-full overflow-hidden">
                      <Image src={user.avatar} alt={user.firstName} fill className="object-cover" />
                    </div>
                  )}
                </TableCell>
                <TableCell>
                  {user.firstName} {user.lastName}
                </TableCell>
              </TableRow>
            </Link>
          ))}
        </TableBody>
      </Table>

      <Button>Create User</Button>

      <h1>Groups</h1>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Group</TableHead>
            <TableHead>Members</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {groups.map((group) => (
            <TableRow key={group.id}>
              <TableCell>{group.name}</TableCell>
              <TableCell>{group._count.Users}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </main>
  );
}
