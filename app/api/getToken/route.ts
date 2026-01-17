import { NextResponse, NextRequest } from 'next/server';
import * as jose from 'jose';
import { JwtPayload } from 'jsonwebtoken';

export async function POST(req: NextRequest) {
  const token = req.cookies.get('token')?.value;
  if (!token) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const secret = process.env.JWT_SECRET;
  if (!secret) {
    return NextResponse.json(
      { error: 'JWT secret not found' },
      { status: 500 }
    );
  }

  try {
    const { payload } = await jose.jwtVerify(
      token,
      new TextEncoder().encode(secret)
    );
    const decoded = payload as JwtPayload;
    return NextResponse.json(decoded);
  } catch {
    return NextResponse.json({ error: 'Invalid token' }, { status: 401 });
  }
}
