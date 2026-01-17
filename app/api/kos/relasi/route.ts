import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export async function GET() {
  const allKosWithTipe = await prisma.kos.findMany({
    include: {
      tipeKos: true,
    },
  });
  return NextResponse.json(allKosWithTipe);
}
