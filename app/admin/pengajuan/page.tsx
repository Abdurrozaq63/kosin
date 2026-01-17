'use client';
import { useEffect, useState } from 'react';
import Modal from '@/app/kos/component/modal';

export default function Pengajuan() {
  const [to, setTo] = useState('');
  const [subject, setSubject] = useState('');
  const [text, setText] = useState('');

  const [pengajuan, setPengajuan] = useState<any[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [idSelect, SetIdSelect] = useState<string | null>(null);

  useEffect(() => {
    fetchPengajuan();
  }, []);
  const handleVerifikasi = async (id_pengajuan: string) => {
    setOpenModal('verifikasi');
    SetIdSelect(id_pengajuan);

    //
  };
  const fetchPengajuan = async () => {
    const res = await fetch('/api/pengajuan');
    const data = await res.json();
    setPengajuan(data);
  };

  const handleTerima = async () => {
    //terima
    const filtPengajuan = pengajuan.find((k) => k.id_pengajuan === idSelect);
    const res = await fetch('/api/sendmail', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        id_pengajuan: idSelect,
        nama_kos: filtPengajuan.nama_kos,
        notelp: filtPengajuan.notelp,
        alamat: filtPengajuan.alamat,
        email: filtPengajuan.email,
        status: 'Disetujui',
        createdAt: filtPengajuan.createdAt,
        password: 'passwordawal123',
      }),
    });
    const data = await res.json();
    alert(data.success ? 'email terkirim!' : 'Gagal kiri email');

    const createAkun = await fetch('/api/kos', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        nama_kos: filtPengajuan.nama_kos,
        notelp: filtPengajuan.notelp,
        alamat: filtPengajuan.alamat,
        email: filtPengajuan.email,
        password: 'passwordawal123',
      }),
    });
    const data2 = await createAkun.json();

    if (!createAkun.ok) throw new Error('Gagal membuat akun');
    const deleted = await fetch('/api/pengajuan', {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id_pengajuan: idSelect }),
    });
    if (!deleted.ok) throw new Error('gagal menghapus data');

    handleClose();
    fetchPengajuan();
  };
  const handleTolak = async () => {
    const filtPengajuan = pengajuan.find((k) => k.id_pengajuan === idSelect);
    const res = await fetch('/api/sendmail', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        id_pengajuan: idSelect,
        nama_kos: filtPengajuan.nama_kos,
        notelp: filtPengajuan.notelp,
        alamat: filtPengajuan.alamat,
        email: filtPengajuan.email,
        status: 'Ditolak',
        createdAt: filtPengajuan.createdAt,
        password: 'p',
      }),
    });
    const data = await res.json();
    alert(data.success ? 'email terkirim!' : 'Gagal kiri email');

    const deleted = await fetch('/api/pengajuan', {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id_pengajuan: idSelect }),
    });
    if (!deleted.ok) throw new Error('gagal menghapus data');
    handleClose();
    fetchPengajuan();
  };

  const [openModal, setOpenModal] = useState<null | 'verifikasi'>(null);
  const handleClose = () => setOpenModal(null);

  return (
    <div className=" w-full flex flex-col  min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      {/* Header */}
      <div className="w-full text-start px-6 py-6 mb-4 border-b shadow-sm">
        <h1 className="text-3xl font-bold text-slate-800 tracking-wide">
          Pengajuan Kos
        </h1>
        <p className="text-sm text-gray-500">Daftar Kos Pengajuan Terbaru</p>
      </div>

      {/* Table Container */}
      <div className="w-full flex justify-center px-3">
        <div className="w-full bg-white shadow-lg rounded-2xl overflow-hidden border">
          <div className="overflow-x-auto">
            {/* Table */}
            <table className="w-full text-sm text-left text-gray-600">
              <thead className="bg-violet-600 text-white text-base sticky top-0">
                <tr>
                  <th className="px-4 py-3">Nama Kos</th>
                  <th className="px-4 py-3">No Telepon</th>
                  <th className="px-4 py-3">Alamat</th>
                  <th className="px-4 py-3">Email</th>
                  <th className="px-4 py-3 text-center">Aksi</th>
                </tr>
              </thead>
              <tbody>
                {pengajuan.map((k, index) => (
                  <tr
                    key={index}
                    className="border-b hover:bg-violet-50 transition-colors">
                    <td className="px-4 py-3">{k.nama_kos}</td>
                    <td className="px-4 py-3">{k.notelp}</td>
                    <td className="px-4 py-3">{k.alamat}</td>
                    <td className="px-4 py-3">{k.email}</td>
                    <td className="px-4 py-3 text-center">
                      <button
                        onClick={() => handleVerifikasi(k.id_pengajuan)}
                        className="px-3 py-1 bg-violet-600 text-white rounded-lg text-sm hover:bg-violet-700 transition">
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
                      Tidak ada data pengajuan.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <Modal isOpen={openModal !== null} onClose={handleClose}>
        {openModal === 'verifikasi' && (
          <div className="w-full">
            <h2 className="text-lg text-slate-700 font-semibold mb-3">
              Konfirmasi Pengajuan Kos
            </h2>
            <div className="flex justify-between mt-10">
              <button
                onClick={handleTerima}
                className="px-3 py-1 bg-violet-600 text-white rounded-lg text-sm hover:bg-violet-700 transition">
                Terima
              </button>
              <button
                onClick={handleTolak}
                className="px-3 py-1 bg-violet-600 text-white rounded-lg text-sm hover:bg-violet-700 transition">
                Tolak
              </button>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
}
