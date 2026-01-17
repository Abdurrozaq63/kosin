'use client';

import { useEffect, useState } from 'react';
import { useIdStore } from '@/store/useDataStore';
import { Clock } from 'lucide-react';
import Modal from '@/app/kos/component/modal';
import Detail from '../component/detail';

// ✅ tipe data untuk riwayat
type RiwayatItem = {
  id_riwayat: string;
  createdAt: string; // ISO string
  id_tipe: string;
  tipeKos: {
    id_tipe: string;
    nama_tipe: string;
    kos: {
      id_kos: string;
      nama_kos: string;
    };
  };
};

export default function RiwayatPage() {
  const [riwayat, setRiwayat] = useState<RiwayatItem[]>([]);
  const { idStore } = useIdStore();
  const [selectedId_Tipe, setSelectedId_Tipe] = useState<string | null>(null);
  const [openModal, setOpenModal] = useState<null | 'detail'>(null);

  useEffect(() => {
    if (!idStore) return; // ✅ tambahkan pengecekan
    const fetchRiwayat = async () => {
      const res = await fetch('/api/riwayat_user/relasi', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id_user: idStore }),
      });
      const data: RiwayatItem[] = await res.json(); // ✅ tipe jelas
      setRiwayat(data);
    };
    fetchRiwayat();
  }, [idStore]); // ✅ tambahkan idStore ke dependency

  const handleDetail = (id_tipe: string) => {
    setSelectedId_Tipe(id_tipe);
    setOpenModal('detail');
  };

  const grouped = groupByDate(riwayat);

  const handleClose = () => setOpenModal(null);

  return (
    <div className="w-full mx-auto p-6 space-y-8 text-slate-700">
      <h1 className="text-3xl font-bold border-b-2 border-blue-500 pb-2">
        Riwayat Kunjungan
      </h1>

      {Object.keys(grouped).map((tanggal) => (
        <div key={tanggal} className="space-y-4 ">
          <h2 className="text-xl font-semibold text-blue-600">{tanggal}</h2>
          <div className="grid gap-4">
            {grouped[tanggal].map((item) => (
              <div
                key={item.id_riwayat}
                className="flex justify-between items-center rounded-xl border p-4 shadow-sm hover:shadow-md transition-shadow bg-white">
                <div className="space-y-1 flex justify-between">
                  <p className="font-semibold text-lg w-max">
                    {item.tipeKos.kos.nama_kos}
                  </p>
                  <p className="text-sm text-gray-600 flex items-center gap-1 m-2">
                    <span className="font-medium text-blue-500 ">
                      {item.tipeKos.nama_tipe}
                    </span>
                    •
                    <Clock className="w-4 h-4 text-gray-500" />
                    {new Date(item.createdAt).toLocaleTimeString('id-ID', {
                      hour: '2-digit',
                      minute: '2-digit',
                    })}
                  </p>
                </div>
                <button
                  onClick={() => handleDetail(item.id_tipe)}
                  className="px-4 py-2 rounded-lg bg-blue-500 text-white font-medium hover:bg-blue-600 transition-colors shadow">
                  Detail
                </button>
              </div>
            ))}
          </div>
        </div>
      ))}

      <Modal isOpen={openModal !== null} onClose={handleClose}>
        {openModal === 'detail' && (
          <div>
            <h2 className="text-lg font-semibold mb-3">Detail Kos</h2>
            <Detail id_tipe={selectedId_Tipe} onSuccess={handleClose} />
          </div>
        )}
      </Modal>
    </div>
  );
}

// Helper
function groupByDate(riwayat: RiwayatItem[]) {
  const today = new Date();
  const yesterday = new Date();
  yesterday.setDate(today.getDate() - 1);

  return riwayat.reduce((acc: Record<string, RiwayatItem[]>, item) => {
    const date = new Date(item.createdAt);
    const dateOnly = date.toLocaleDateString('id-ID', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    });

    if (date.toDateString() === today.toDateString()) {
      acc['Hari ini'] = acc['Hari ini'] || [];
      acc['Hari ini'].push(item);
    } else if (date.toDateString() === yesterday.toDateString()) {
      acc['Kemarin'] = acc['Kemarin'] || [];
      acc['Kemarin'].push(item);
    } else {
      acc[dateOnly] = acc[dateOnly] || [];
      acc[dateOnly].push(item);
    }

    return acc;
  }, {} as Record<string, RiwayatItem[]>);
}
