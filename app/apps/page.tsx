import { Table, TableHead, TableHeader, TableRow } from '@/components/ui/table';

export default function Apps() {
  return (
    <main>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
          </TableRow>
        </TableHeader>
      </Table>
    </main>
  );
}
