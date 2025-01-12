import prisma from '@/lib/prisma';
import Image from 'next/image';

export default async function App({ params }: { params: { id: string } }) {
  const app = await prisma.app.findUnique({
    where: {
      id: params.id,
    },
  });

  console.log(app);

  return (
    <main>
      <h1 className="flex items-center gap-6">
        {app?.logo && <Image src={app?.logo} alt={app?.name} width={48} height={48} />}
        {app?.name}
      </h1>
    </main>
  );
}
