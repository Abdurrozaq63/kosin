import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

//GET: mengambil data riwayat
export async function GET() {
  //lanjut nanti
  const preferensiWithUser = await prisma.riwayat_preferensi.findMany({
    include: {
      user: true,
    },
  });
}

//POST: menambahkan riwayat baru
export async function POST(req: Request) {
  const {
    id_preferensi,
    id_user,
    harga,
    jarak,
    luas_kamar,
    fasilitas_kamar,
    fasilitas_umum,
    keamanan,
    jenis_kos,
  } = await req.json();
  if (!id_preferensi) {
    return NextResponse.json({ error: 'error' }, { status: 400 });
  }
  const newPreffHystorys = await prisma.riwayat_preferensi.create({
    data: {
      id_preferensi,
      id_user,
      harga,
      jarak,
      luas_kamar,
      fasilitas_kamar,
      fasilitas_umum,
      keamanan,
      jenis_kos,
    },
  });
  return NextResponse.json(newPreffHystorys);
}
