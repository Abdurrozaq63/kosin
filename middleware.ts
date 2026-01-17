import { NextRequest, NextResponse } from 'next/server';
import * as jose from 'jose';

// Definisikan tipe untuk payload JWT
// Ini memastikan TypeScript dapat mengenali struktur data di dalam token
interface JwtPayload {
  role: 'admin' | 'pemilik_kos' | 'pengguna';
}

// Path publik yang bisa diakses tanpa token
const PUBLIC_PATHS = [
  '/',
  '/login',
  '/register',
  '/pengajuan',
  '/unauthorized',
];

// Peta (map) untuk menghubungkan role dengan path yang diizinkan
const ROLE_BASED_PATHS: Record<JwtPayload['role'], string> = {
  admin: '/admin',
  pemilik_kos: '/kos',
  pengguna: '/main',
};

// Pastikan fungsi middleware adalah async karena jose.jwtVerify bersifat async
export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // 1. Cek apakah path yang diminta adalah publik
  // Jika ya, langsung izinkan akses tanpa perlu verifikasi token
  if (PUBLIC_PATHS.includes(pathname)) {
    return NextResponse.next();
  }

  // 2. Ambil token dari cookie atau header Authorization
  const token =
    req.cookies.get('token')?.value ||
    req.headers.get('authorization')?.replace('Bearer ', '');

  // 3. Jika tidak ada token, redirect ke halaman login
  if (!token) {
    return NextResponse.redirect(new URL('/login', req.url));
  }

  // 4. Verifikasi token dan cek otorisasi
  try {
    const secret = process.env.JWT_SECRET;
    if (!secret) {
      throw new Error('JWT_SECRET is not defined in environment variables.');
    }

    // Menggunakan jose.jwtVerify untuk memverifikasi token
    const { payload } = await jose.jwtVerify(
      token,
      new TextEncoder().encode(secret)
    );

    // Atasi error TypeScript dengan mengkonversi ke 'unknown' terlebih dahulu
    const decoded = payload as unknown as JwtPayload;

    const userRole = decoded.role;
    let isAuthorized = false;

    // Cek apakah role pengguna memiliki akses ke path yang diminta
    for (const [role, path] of Object.entries(ROLE_BASED_PATHS)) {
      if (pathname.startsWith(path)) {
        if (userRole === role) {
          isAuthorized = true;
          break;
        }
      }
    }

    // Jika pengguna tidak diizinkan, redirect ke halaman unauthorized
    if (!isAuthorized) {
      return NextResponse.redirect(new URL('/unauthorized', req.url));
    }

    // Jika semua cek berhasil, lanjutkan ke halaman yang dituju
    return NextResponse.next();
  } catch (error) {
    console.error('Middleware Error:', error);
    // Jika verifikasi token gagal (misalnya, token kedaluwarsa atau tidak valid),
    // redirect pengguna ke halaman login
    return NextResponse.redirect(new URL('/login', req.url));
  }
}

// Konfigurasi `matcher` untuk menentukan path mana yang akan diproses oleh middleware ini
export const config = {
  matcher: [
    // Middleware akan berjalan untuk semua path yang dimulai dengan ini
    '/admin/:path*',
    '/kos/:path*',
    '/main/:path*',
  ],
};
