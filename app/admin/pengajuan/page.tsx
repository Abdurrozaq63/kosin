'use client';

import { useEffect, useState } from 'react';
import Modal from '@/app/kos/component/modal';

type Pengajuan = {
  id_pengajuan: string;
  nama_kos: string;
  notelp: string;
  alamat: string;
  email: string;
  createdAt: string;
};

export default function Pengajuan() {
  const [pengajuan, setPengajuan] = useState<Pengajuan[]>([]);
  const [idSelect, setIdSelect] = useState<string | null>(null);
  const [openModal, setOpenModal] = useState<null | 'verifikasi'>(null);

  useEffect(() => {
    fetchPengajuan();
  }, []);

  const fetchPengajuan = async () => {
    const res = await fetch('/api/pengajuan');
    const data: Pengajuan[] = await res.json();
    setPengajuan(data);
  };

  const handleVerifikasi = (id_pengajuan: string) => {
    setIdSelect(id_pengajuan);
    setOpenModal('verifikasi');
  };

  const handleClose = () => {
    setOpenModal(null);
    setIdSelect(null);
  };

  const handleTerima = async () => {
    if (!idSelect) return;

    const dataPengajuan = pengajuan.find((p) => p.id_pengajuan === idSelect);
    if (!dataPengajuan) return;

    await fetch('/api/sendmail', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        id_pengajuan: idSelect,
        nama_kos: dataPengajuan.nama_kos,
        notelp: dataPengajuan.notelp,
        alamat: dataPengajuan.alamat,
        email: dataPengajuan.email,
        status: 'Disetujui',
        createdAt: dataPengajuan.createdAt,
        password: 'passwordawal123',
      }),
    });

    const createAkun = await fetch('/api/kos', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        nama_kos: dataPengajuan.nama_kos,
        notelp: dataPengajuan.notelp,
        alamat: dataPengajuan.alamat,
        email: dataPengajuan.email,
        password: 'passwordawal123',
      }),
    });

    if (!createAkun.ok) throw new Error('Gagal membuat akun');

    const deleted = await fetch('/api/pengajuan', {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id_pengajuan: idSelect }),
    });

    if (!deleted.ok) throw new Error('Gagal menghapus pengajuan');

    handleClose();
    fetchPengajuan();
  };

  const handleTolak = async () => {
    if (!idSelect) return;

    const dataPengajuan = pengajuan.find((p) => p.id_pengajuan === idSelect);
    if (!dataPengajuan) return;

    await fetch('/api/sendmail', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        id_pengajuan: idSelect,
        nama_kos: dataPengajuan.nama_kos,
        notelp: dataPengajuan.notelp,
        alamat: dataPengajuan.alamat,
        email: dataPengajuan.email,
        status: 'Ditolak',
        createdAt: dataPengajuan.createdAt,
        password: 'p',
      }),
    });

    const deleted = await fetch('/api/pengajuan', {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id_pengajuan: idSelect }),
    });

    if (!deleted.ok) throw new Error('Gagal menghapus pengajuan');

    handleClose();
    fetchPengajuan();
  };

  return (
    <div className="w-full flex flex-col min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      <div className="w-full px-6 py-6 mb-4 border-b shadow-sm">
        <h1 className="text-3xl font-bold text-slate-800">Pengajuan Kos</h1>
        <p className="text-sm text-gray-500">Daftar Kos Pengajuan Terbaru</p>
      </div>

      <div className="w-full flex justify-center px-3">
        <div className="w-full bg-white shadow-lg rounded-2xl overflow-hidden border">
          <table className="w-full text-sm text-left text-gray-600">
            <thead className="bg-violet-600 text-white">
              <tr>
                <th className="px-4 py-3">Nama Kos</th>
                <th className="px-4 py-3">No Telepon</th>
                <th className="px-4 py-3">Alamat</th>
                <th className="px-4 py-3">Email</th>
                <th className="px-4 py-3 text-center">Aksi</th>
              </tr>
            </thead>
            <tbody>
              {pengajuan.map((p) => (
                <tr key={p.id_pengajuan} className="border-b">
                  <td className="px-4 py-3">{p.nama_kos}</td>
                  <td className="px-4 py-3">{p.notelp}</td>
                  <td className="px-4 py-3">{p.alamat}</td>
                  <td className="px-4 py-3">{p.email}</td>
                  <td className="px-4 py-3 text-center">
                    <button
                      onClick={() => handleVerifikasi(p.id_pengajuan)}
                      className="px-3 py-1 bg-violet-600 text-white rounded-lg hover:bg-violet-700">
                      Konfirmasi
                    </button>
                  </td>
                </tr>
              ))}
              {pengajuan.length === 0 && (
                <tr>
                  <td
                    colSpan={5}
                    className="px-4 py-6 text-center text-gray-400">
                    Tidak ada data pengajuan
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      <Modal isOpen={openModal !== null} onClose={handleClose}>
        {openModal === 'verifikasi' && (
          <div>
            <h2 className="text-lg font-semibold mb-6">Konfirmasi Pengajuan</h2>
            <div className="flex justify-between">
              <button
                onClick={handleTerima}
                className="px-4 py-2 bg-green-600 text-white rounded-lg">
                Terima
              </button>
              <button
                onClick={handleTolak}
                className="px-4 py-2 bg-red-600 text-white rounded-lg">
                Tolak
              </button>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
}
