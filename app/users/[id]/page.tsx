import prisma from '@/lib/prisma';
import Image from 'next/image';

export default async function User({ params }: { params: { id: string } }) {
  const user = await prisma.user.findUnique({
    where: {
      id: params.id,
    },
  });

  console.log(user);

  return (
    <main>
      <h1 className="flex items-center gap-6">
        {user?.avatar && <Image src={user?.avatar} alt={user?.firstName} width={48} height={48} />}
        {user?.firstName} {user?.lastName}
      </h1>
    </main>
  );
}
