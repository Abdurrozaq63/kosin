'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useState, useCallback } from 'react';
import Image from 'next/image';
import Modal from './component/modal';
import TambahTipe from './component/tambahTipe';
import Edit from './component/edit';
import Hapus from './component/hapus';
import Detail from '../main/component/detail';
import { useKos, useIdStore } from '@/store/useDataStore';
import { Home, MapPin, Phone } from 'lucide-react';

/* ================= TYPE ================= */
type TipeKos = {
  id_tipe: string;
  id_kos: string;
  nama_tipe: string;
  jenis_kos: string;
  harga: number;
  jarak: number;
  luas_kamar: string;
  fasilitas_kamar: Record<string, boolean>;
  fasilitas_umum: Record<string, boolean>;
  keamanan: Record<string, boolean>;
  jam_malam: string;
  jmlh_kamar: number;
  kmr_terisi: number;
  status: string;
};

type KosData = {
  id_kos: string;
  nama_kos: string;
  alamat: string;
  notelp: number;
};

export default function Kos() {
  const router = useRouter();

  const [kosPemilik, setKosPemilik] = useState<TipeKos[]>([]);
  const [selectedKos, setSelectedKos] = useState<TipeKos | null>(null);
  const [selectedIdTipe, setSelectedIdTipe] = useState<string | null>(null);
  const [id_kos, setId_kos] = useState<string | null>(null);

  const { KosStore, fetchKoss } = useKos();
  const { idStore } = useIdStore();

  /* ================= FETCH ID KOS ================= */
  const fetchIdkos = useCallback(async () => {
    const res = await fetch('/api/getToken', {
      method: 'POST',
      credentials: 'include',
    });
    const data: { id: string } = await res.json();
    setId_kos(data.id);
  }, []);

  /* ================= FETCH TIPE KOS ================= */
  const fetchKos = useCallback(async () => {
    if (!id_kos) return;

    const res = await fetch('/api/tipekos/pemilik', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id_kos }),
    });

    const data: TipeKos[] = await res.json();
    setKosPemilik(data);
  }, [id_kos]);

  /* ================= EFFECT ================= */
  useEffect(() => {
    fetchIdkos();
    fetchKoss();
  }, [fetchIdkos, fetchKoss]);

  useEffect(() => {
    fetchKos();
  }, [fetchKos]);

  /* ================= MODAL ================= */
  const [openModal, setOpenModal] = useState<
    null | 'detail' | 'tambah' | 'edit' | 'hapus'
  >(null);

  const handleEdit = (kos: TipeKos) => {
    setSelectedKos(kos);
    setOpenModal('edit');
  };

  const handleDelete = (id_tipe: string) => {
    setSelectedIdTipe(id_tipe);
    setOpenModal('hapus');
  };

  const handleDetail = (id_tipe: string) => {
    setSelectedIdTipe(id_tipe);
    setOpenModal('detail');
  };

  const handleClose = () => setOpenModal(null);

  const kosin: KosData | undefined = KosStore.find(
    (k: KosData) => k.id_kos === idStore
  );

  return (
    <div className="flex flex-col w-full items-center mb-3">
      {/* INFO KOS */}
      <div className="w-full px-6 py-5 bg-white shadow-lg border border-slate-200">
        <h1 className="text-2xl font-bold flex items-center gap-2">
          <Home className="w-6 h-6 text-indigo-500" />
          {kosin?.nama_kos}
        </h1>

        <a
          href={kosin?.alamat}
          target="_blank"
          rel="noopener noreferrer"
          className="text-sky-500 flex items-center gap-2 mt-1">
          <MapPin className="w-4 h-4" /> Lihat Map
        </a>

        <p className="flex items-center gap-2 mt-1">
          <Phone className="w-4 h-4" /> {kosin?.notelp.toString()}
        </p>
      </div>

      {/* LIST TIPE */}
      <div className="w-full max-w-5xl mt-6">
        {kosPemilik.map((kos) => (
          <div
            key={kos.id_tipe}
            className="bg-white shadow rounded-2xl p-5 flex gap-5 mt-5">
            <div className="relative w-72 h-40 rounded-xl overflow-hidden">
              <Image
                src={`/api/upimg/${kos.nama_tipe + kos.id_kos}`}
                alt={kos.nama_tipe}
                fill
                className="object-cover"
              />
            </div>

            <div className="flex-1">
              <p className="font-semibold">{kos.nama_tipe}</p>
              <p>Jenis: {kos.jenis_kos}</p>
              <p>Harga: Rp {kos.harga.toLocaleString()}</p>

              <div className="flex gap-2 mt-3">
                <button onClick={() => handleDetail(kos.id_tipe)}>
                  Detail
                </button>
                <button onClick={() => handleEdit(kos)}>Edit</button>
                <button onClick={() => handleDelete(kos.id_tipe)}>Hapus</button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* MODAL */}
      <Modal isOpen={openModal !== null} onClose={handleClose}>
        {openModal === 'detail' && selectedIdTipe && (
          <Detail id_tipe={selectedIdTipe} onSuccess={handleClose} />
        )}
        {openModal === 'tambah' && (
          <TambahTipe
            onSuccess={() => {
              handleClose();
              fetchKos();
            }}
          />
        )}
        {openModal === 'edit' && selectedKos && (
          <Edit
            {...selectedKos}
            onSuccess={() => {
              handleClose();
              fetchKos();
            }}
          />
        )}
        {openModal === 'hapus' && selectedIdTipe && (
          <Hapus
            id_tipe={selectedIdTipe}
            onSuccess={() => {
              handleClose();
              fetchKos();
            }}
          />
        )}
      </Modal>
    </div>
  );
}
