'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function FormPengajuanKos() {
  const [formData, setFormData] = useState({
    nama_kos: '',
    notelp: '',
    alamat: '',
    email: '',
    status: 'false',
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const konfirmasi = window.confirm(
      `Apakah data berikut sudah benar?\n\n` +
        `Nama Kos: ${formData.nama_kos}\n` +
        `No. Telepon: ${formData.notelp}\n` +
        `Lokasi: ${formData.alamat}\n` +
        `Email: ${formData.email}\n` +
        `Status: ${formData.status}\n\n` +
        `Setelah dikirim, data tidak bisa diubah.`
    );

    if (!konfirmasi) return;

    setLoading(true);
    try {
      const res = await fetch('/api/pengajuan', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (!res.ok) throw new Error('Gagal mengirim data');

      alert(
        'Terimakasih telah mengajukan Kos anda. Kami akan mengkonfirmasi pengajuan melalui email.'
      );

      setFormData({
        nama_kos: '',
        notelp: '',
        alamat: '',
        email: '',
        status: 'false',
      });
    } catch (error) {
      alert((error as Error).message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen flex flex-col bg-gradient-to-b from-white to-slate-100">
      {/* Header */}
      <header className="w-full px-8 py-4 flex justify-between items-center shadow-sm bg-white">
        <h1 className="text-2xl font-bold text-sky-600">Kosin</h1>
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
      <div className="flex-1 flex justify-center items-center px-4 py-10">
        <form
          onSubmit={handleSubmit}
          className="w-full max-w-lg p-8 bg-white rounded-2xl shadow-lg space-y-5 border border-slate-200">
          <h2 className="text-2xl font-bold text-slate-800 mb-4 text-center">
            Form Pengajuan Kos
          </h2>

          <div>
            <label className="block font-medium mb-1 text-slate-700">
              Nama Kos
            </label>
            <input
              type="text"
              name="nama_kos"
              value={formData.nama_kos}
              onChange={handleChange}
              required
              className="w-full border border-slate-300 rounded-lg p-3 focus:ring-2 focus:ring-sky-500 focus:outline-none text-slate-700"
            />
          </div>

          <div>
            <label className="block font-medium mb-1 text-slate-700">
              No. Telepon
            </label>
            <input
              type="text"
              name="notelp"
              value={formData.notelp}
              onChange={handleChange}
              required
              className="w-full border border-slate-300 rounded-lg p-3 focus:ring-2 focus:ring-sky-500 focus:outline-none text-slate-700"
            />
          </div>

          <div>
            <label className="block font-medium mb-1 text-slate-700">
              Lokasi (gunakan link Google Maps)
            </label>
            <textarea
              name="alamat"
              value={formData.alamat}
              onChange={handleChange}
              required
              className="w-full border border-slate-300 rounded-lg p-3 focus:ring-2 focus:ring-sky-500 focus:outline-none text-slate-700"
            />
          </div>

          <div>
            <label className="block font-medium mb-1 text-slate-700">
              Email
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full border border-slate-300 rounded-lg p-3 focus:ring-2 focus:ring-sky-500 focus:outline-none text-slate-700"
            />
          </div>

          <input type="hidden" name="status" value={formData.status} />

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-sky-600 text-white px-4 py-3 rounded-lg font-medium hover:bg-sky-700 transition disabled:opacity-50">
            {loading ? 'Mengirim...' : 'Kirim Pengajuan'}
          </button>
        </form>
      </div>
    </main>
  );
}
