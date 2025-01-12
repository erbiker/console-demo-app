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
    </main>
  );
}
