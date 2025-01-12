import prisma from '@/lib/prisma';
import { AppPicker } from './app-picker';

export default async function AccessPolicy({ params }: { params: { id: string } }) {
  const [accessPolicy, apps] = await Promise.all([
    prisma.accessPolicy.findUnique({
      where: { id: params.id },
      include: { app: true },
    }),
    prisma.app.findMany(),
  ]);

  return (
    <main>
      <h1 className="flex items-center gap-6">Policy: {accessPolicy?.name}</h1>
      <p>{accessPolicy?.description}</p>
      <AppPicker apps={apps} selectedAppId={accessPolicy?.app?.id} policyId={accessPolicy?.id} />
    </main>
  );
}
