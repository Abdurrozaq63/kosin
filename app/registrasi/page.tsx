'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function RegisterPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    nama: '',
    email: '',
    password: '',
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch('/api/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (!res.ok) {
        throw new Error('Registrasi gagal, coba lagi.');
      }

      alert('Registrasi berhasil! Silakan login.');
      router.push('/login'); // setelah register, arahkan ke login
    } catch (error) {
      alert((error as Error).message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-screen h-screen flex flex-col bg-gradient-to-br from-blue-50 via-white to-blue-100 px-4">
      <header className="w-full px-8 py-4 relative top-0 flex justify-between items-center shadow-sm bg-white">
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
      <form
        onSubmit={handleSubmit}
        className="w-96 p-6 bg-white shadow m-auto border rounded-xl space-y-4">
        <h2 className="text-2xl font-bold mb-4 text-slate-800 text-center">
          Buat Akun <span className="text-blue-600">KOSIN</span>
        </h2>

        <div className="text-slate-800">
          <label className="block font-medium mb-1">Nama</label>
          <input
            type="text"
            name="nama"
            value={formData.nama}
            onChange={handleChange}
            required
            className="w-full border rounded p-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
          />
        </div>

        <div className="text-slate-800">
          <label className="block font-medium mb-1">Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            className="w-full border rounded p-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
          />
        </div>

        <div className="text-slate-800">
          <label className="block font-medium mb-1">Password</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
            className="w-full border rounded p-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50">
          {loading ? 'Mendaftarkan...' : 'Daftar'}
        </button>

        <p className="text-center text-sm text-gray-500 mt-4">
          Sudah punya akun?{' '}
          <a
            href="/login"
            className="text-blue-600 hover:underline font-medium">
            Login
          </a>
        </p>
      </form>
    </div>
  );
}
