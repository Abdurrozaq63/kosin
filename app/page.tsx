'use client';

import Link from 'next/link';
import { Home, Search, Users, Shield } from 'lucide-react';

export default function LandingPage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-white to-slate-100 flex flex-col">
      {/* Navbar */}
      <header className="w-full px-8 py-4 flex justify-between items-center shadow-sm bg-white sticky top-0 z-50">
        <h1 className="text-2xl font-bold text-sky-600">KOSIN</h1>
        <nav className="flex gap-4">
          <Link
            href="/registrasi"
            className="px-4 py-2 rounded-lg text-sky-600 font-medium hover:bg-sky-50 transition">
            Register
          </Link>
          <Link
            href="/login"
            className="px-4 py-2 rounded-lg bg-sky-600 text-white font-medium hover:bg-sky-700 transition">
            Masuk
          </Link>
          <Link
            href="/pengajuan_kos"
            className="px-4 py-2 rounded-lg border border-sky-600 text-sky-600 font-medium hover:bg-sky-50 transition">
            Daftarkan Kos
          </Link>
        </nav>
      </header>

      {/* Hero Section */}
      <section className="flex-1 flex flex-col md:flex-row items-center justify-between px-10 md:px-20 py-16 gap-10">
        {/* Text */}
        <div className="flex-1">
          <h2 className="text-4xl md:text-5xl font-extrabold text-slate-800 leading-tight">
            Temukan Kos Impianmu dengan{' '}
            <span className="text-sky-600">Kosin</span>
          </h2>
          <p className="text-slate-600 mt-4 text-lg">
            Platform pencarian dan pendaftaran kos modern untuk mahasiswa.
            Mudah, cepat, dan terpercaya.
          </p>

          <div className="flex gap-4 mt-6">
            <Link
              href="/registrasi"
              className="px-6 py-3 bg-sky-600 text-white rounded-lg font-medium hover:bg-sky-700 transition">
              Mulai Sekarang
            </Link>
            <Link
              href="/pengajuan_kos"
              className="px-6 py-3 border border-sky-600 text-sky-600 rounded-lg font-medium hover:bg-sky-50 transition">
              Daftarkan Kos
            </Link>
          </div>
        </div>

        {/* Image / Illustration */}
        <div className="flex-1 flex justify-center">
          <div className="w-full max-w-md h-72 bg-gradient-to-tr from-sky-400 to-sky-600 rounded-2xl shadow-lg flex items-center justify-center text-white text-3xl font-bold">
            🏠 Kosin
          </div>
        </div>
      </section>

      {/* Keunggulan Section */}
      <section className="bg-white py-16 px-10 md:px-20">
        <h3 className="text-3xl font-bold text-center text-slate-800">
          Kenapa memilih <span className="text-sky-600">KOSIN?</span>
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
          <div className="bg-slate-50 p-6 rounded-xl shadow-sm hover:shadow-md transition">
            <Home className="w-10 h-10 text-sky-600 mb-4" />
            <h4 className="font-semibold text-slate-700">Banyak Pilihan</h4>
            <p className="text-slate-600 text-sm mt-2">
              kos tersedia dengan berbagai tipe dan harga sesuai kebutuhan.
            </p>
          </div>

          <div className="bg-slate-50 p-6 rounded-xl shadow-sm hover:shadow-md transition">
            <Search className="w-10 h-10 text-sky-600 mb-4" />
            <h4 className="font-semibold text-slate-700">Pencarian Mudah</h4>
            <p className="text-slate-600 text-sm mt-2">
              Cari kos berdasarkan jarak ke kampus, harga, fasilitas, dan jarak
              kampus.
            </p>
          </div>

          <div className="bg-slate-50 p-6 rounded-xl shadow-sm hover:shadow-md transition">
            <Users className="w-10 h-10 text-sky-600 mb-4" />
            <h4 className="font-semibold text-slate-700">
              Untuk Pemilik & Penyewa
            </h4>
            <p className="text-slate-600 text-sm mt-2">
              Pemilik kos bisa mendaftarkan kos, penyewa bisa langsung mencari.
            </p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-6 text-center text-slate-500 text-sm">
        © {new Date().getFullYear()} Kosin. All rights reserved.
      </footer>
    </main>
  );
}
