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

export default async function Apps() {
  const apps = await prisma.app.findMany();
  console.log(apps);

  return (
    <main>
      <h1>Apps</h1>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>App</TableHead>
            <TableHead>Name</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {apps.map((app) => (
            <Link href={`/apps/${app.id}`} key={app.id} legacyBehavior>
              <TableRow key={app.id}>
                <TableCell>
                  {app.logo && (
                    <div className="relative w-16 h-16 rounded-full overflow-hidden">
                      <Image src={app.logo} alt={app.name} fill className="object-cover" />
                    </div>
                  )}
                </TableCell>
                <TableCell>{app.name}</TableCell>
              </TableRow>
            </Link>
          ))}
        </TableBody>
      </Table>
    </main>
  );
}
