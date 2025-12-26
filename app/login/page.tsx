'use client';

import { useState } from 'react';
import { setCookie } from 'cookies-next';
import { useRouter } from 'next/navigation';
import { useIdStore, useRole } from '@/store/useDataStore';
import Link from 'next/link';

export default function LoginPage() {
  const { setIdStore } = useIdStore();
  const { setRole } = useRole();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    const res = await fetch('/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });

    const data = await res.json();

    if (res.ok) {
      setCookie('token', data.token, {
        maxAge: 60 * 60 * 24, // 1 hari
        path: '/',
      });

      // Arahkan ke halaman sesuai role
      if (data.user.role === 'admin') router.push('/admin');
      else if (data.user.role === 'pemilik_kos') router.push('/kos');
      else router.push('/main');

      // Simpan ID dan Role
      setIdStore(data.user.id);
      setRole(data.user.role);
    } else {
      setError(data.message);
    }
  };

  return (
    <main className="min-h-screen flex flex-col bg-gradient-to-b from-white to-slate-100">
      {/* Header */}
      <header className="w-full px-8 py-4 flex justify-between items-center shadow-sm bg-white">
        <h1 className="text-2xl font-bold text-sky-600">KOSIN</h1>
        <nav className="flex gap-4">
          <Link
            href="/"
            className="px-4 py-2 rounded-lg text-sky-600 font-medium hover:bg-sky-50 transition">
            Beranda
          </Link>
          <Link
            href="/login"
            className="px-4 py-2 rounded-lg bg-sky-600 text-white font-medium hover:bg-sky-700 transition">
            Masuk
          </Link>
        </nav>
      </header>

      {/* Form */}
      <div className="w-full m-auto max-w-md bg-white rounded-2xl border shadow-lg p-8">
        <h1 className="text-3xl font-extrabold text-center text-slate-800 mb-6">
          Masuk ke <span className="text-blue-600">KOSIN</span>
        </h1>
        {error && (
          <p className="text-red-500 text-sm text-center mb-4">{error}</p>
        )}
        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none text-slate-900"
              required
            />
          </div>
          <div>
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none text-slate-900"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors duration-200">
            Masuk
          </button>
        </form>
        <p className="text-center text-sm text-gray-500 mt-6">
          Belum punya akun?{' '}
          <a
            href="/register"
            className="text-blue-600 hover:underline font-medium">
            Daftar
          </a>
        </p>
      </div>
    </main>
  );
}
