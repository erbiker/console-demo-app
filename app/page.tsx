'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function Home() {
  return (
    <main className="container min-h-screen max-w-screen-2xl xs:px-12 sm:px-16 md:px-24 py-16 overflow-x-hidden md:overflow-x-auto flex flex-col justify-items-start gap-y-8">
      <Card>
        <CardHeader>
          <CardTitle>Access Control</CardTitle>
        </CardHeader>
        <CardContent>
          <p>Access Control</p>
        </CardContent>
      </Card>
    </main>
  );
}
