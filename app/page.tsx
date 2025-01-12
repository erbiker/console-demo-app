import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import Image from 'next/image';
import Link from 'next/link';

export default function Home() {
  return (
    <main>
      <div className="flex flex-col gap-y-12 items-center">
        <Card className="w-3/5">
          <CardHeader>
            <CardTitle>Access Policies</CardTitle>
            <CardDescription>Create and manage policies for your applications</CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col gap-y-4 items-center">
            <div className="flex rounded-lg overflow-hidden w-fit h-fit">
              <Image src="/policies.jpg" alt="Access Policies" width={200} height={200} />
            </div>
            <Button>
              <Link href="/access-policies">Create New Policy</Link>
            </Button>
          </CardContent>
        </Card>
        <div className="flex flex-row gap-x-12 justify-center">
          <Card className="w-2/5">
            <CardHeader>
              <CardTitle>Users & Groups</CardTitle>
              <CardDescription>Manage users and groups for your applications</CardDescription>
            </CardHeader>
            <CardContent>
              <Button>
                <Link href="/users">See Users</Link>
              </Button>
            </CardContent>
          </Card>
          <Card className="w-2/5">
            <CardHeader>
              <CardTitle>Apps</CardTitle>
              <CardDescription>Manage applications and their policies</CardDescription>
            </CardHeader>
            <CardContent>
              <Button>
                <Link href="/apps">Manage Apps</Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </main>
  );
}
