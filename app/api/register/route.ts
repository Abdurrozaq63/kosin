import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

export async function POST(req: Request) {
  try {
    const { nama, email, password } = await req.json();

    //cek apakah email sudah terdaftar
    const existinguser = await prisma.user.findUnique({ where: { email } });
    if (existinguser) {
      return NextResponse.json(
        { error: 'Email already in use' },
        { status: 400 }
      );
    }

    //hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    //simpan user baru
    const user = await prisma.user.create({
      data: { nama, email, password: hashedPassword },
    });

    return NextResponse.json({ message: 'User registered successfully', user });
  } catch {
    return NextResponse.json({ error: 'Registration failed' }, { status: 500 });
  }
}
