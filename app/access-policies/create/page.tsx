import prisma from '@/lib/prisma';
import { AccessPolicyForm } from './form';

export default async function CreateAccessPolicy() {
  const apps = await prisma.app.findMany();
  return (
    <div className="max-w-2xl mx-auto p-6">
      <AccessPolicyForm apps={apps} />
    </div>
  );
}
