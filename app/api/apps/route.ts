import { PrismaClient } from '@prisma/client';
import { type NextRequest, NextResponse } from 'next/server';

const prisma = new PrismaClient();

export async function GET(request: NextRequest) {
  const apps = await prisma.app.findMany();
  return NextResponse.json(apps);
}
