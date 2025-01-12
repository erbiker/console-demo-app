/* eslint-disable @typescript-eslint/no-unused-vars */
import { type NextRequest, NextResponse } from 'next/server';

import prisma from '@/lib/prisma';

export async function GET(request: NextRequest) {
  const apps = await prisma.app.findMany();
  return NextResponse.json(apps);
}

export async function POST(request: NextRequest) {
  const app = await prisma.app.create({
    data: {
      name: 'New App',
      owner: {
        connect: {
          id: 'user_id',
        },
      },
    },
  });
  return NextResponse.json(app);
}
