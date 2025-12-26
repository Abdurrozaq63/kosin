'use client';
import { useEffect, useState } from 'react';
import {
  useTipeKos,
  useIdStore,
  useKos,
  useIdKosSelect,
} from '@/store/useDataStore';
import Modal from '@/app/kos/component/modal';
import Detail from '@/app/main/component/detail';
import { Home, MapPin, Phone, Ruler, Wallet } from 'lucide-react';

export default function TipeKos() {
  const { idStore } = useIdStore();
  const { KosStore } = useKos();
  const { idKosSelect } = useIdKosSelect();
  const { TipeKosStore } = useTipeKos();
  const [tipeKosSelect, setTipeKosSelect] = useState<any[]>([]);
  const [selectedId_Tipe, setSelectedId_Tipe] = useState<string | null>(null);

  const [openModal, setOpenModal] = useState<null | 'detail'>(null);

  const kosSelect = KosStore.find((k) => k.id_kos == idKosSelect);

  useEffect(() => {
    const selectKos = async () => {
      const res = await fetch('/api/tipekos/pemilik', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id_kos: idKosSelect }),
      });
      const data = await res.json();
      setTipeKosSelect(data);
    };
    selectKos();
  }, []);

  const handleDetail = async (id_tipe: string) => {
    setSelectedId_Tipe(id_tipe);
    setOpenModal('detail');
  };
  const handleClose = () => setOpenModal(null);

  return (
    <div className="w-full flex flex-col items-center">
      {/* Header */}
      <div className="w-full max-w-5xl p-5 mt-6 bg-white shadow-md rounded-xl border">
        <h1 className="text-slate-700 text-2xl font-bold">
          {kosSelect?.nama_kos}
        </h1>
        <p className="text-slate-500 text-sm mt-1">
          Daftar tipe kos yang tersedia
        </p>
      </div>

      {/* List Kos */}
      <div className="w-full mt-6 ">
        {tipeKosSelect.length === 0 ? (
          <p className="text-slate-500 text-center mt-10 text-lg">
            Tidak ada data kos yang disimpan
          </p>
        ) : (
          tipeKosSelect.map((kos, index) => {
            //const koss = KosStore.find((k) => k.id_kos === kos.id_kos);

            return (
              <div
                key={index}
                className="w-full bg-white shadow-sm hover:shadow-md transition rounded-2xl p-5 flex gap-5 mt-5 border-2 border-gray-200">
                {/* Gambar */}
                <div className="relative w-72 aspect-[5/3] bg-gray-200 rounded-xl overflow-hidden">
                  {/* Background blur */}
                  <img
                    src={`/api/upimg/${kos.nama_tipe + kos.id_kos}`}
                    alt="Background Blur"
                    className="absolute inset-0 w-full h-full object-cover blur-sm scale-110"
                  />

                  {/* Gambar utama */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <img
                      src={`/api/upimg/${kos.nama_tipe + kos.id_kos}`}
                      alt="Uploaded Image"
                      className="max-w-full max-h-full object-contain rounded-lg"
                    />
                  </div>
                </div>

                {/* Info */}
                <div className="flex-1 flex flex-col justify-between">
                  <div className="grid md:grid-cols-3 gap-4 text-gray-500">
                    {/* Kolom 1 */}
                    <div>
                      <p className="text-gray-500 text-sm mt-2">Tipe Kos</p>
                      <p className="font-semibold">{kos.nama_tipe}</p>

                      <p className="text-gray-500 text-sm mt-2">Jenis Kos</p>
                      <p className="font-semibold">{kos.jenis_kos}</p>
                    </div>
                    <div>
                      <p className="text-gray-500 text-sm mt-2">Jarak Kampus</p>
                      <p className="font-semibold">{kos.jarak} m</p>
                      <p className="text-gray-500 text-sm mt-2">Luas Kamar</p>
                      <p className="font-semibold">{kos.luas_kamar} m²</p>
                      {/* <p className="text-gray-500 text-sm mt-2">Jumlah Kamar</p>
                      <p className="font-semibold">{kos.jmlh_kamar}</p>

                      <p className="text-gray-500 text-sm mt-2">Kamar Terisi</p>
                      <p className="font-semibold">{kos.kmr_terisi}</p> */}
                    </div>
                    <div>
                      <p className="text-gray-500 text-sm mt-2">Harga</p>
                      <p className="font-semibold text-blue-600">
                        Rp. {kos.harga.toLocaleString()}
                      </p>
                    </div>
                  </div>

                  {/* Tombol */}
                  <div className="flex gap-3 mt-5">
                    <button
                      onClick={() => handleDetail(kos.id_tipe)}
                      className="px-4 py-2 rounded-xl bg-blue-500 text-white font-medium shadow hover:bg-blue-600 transition">
                      🔍 Detail
                    </button>
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>

      {/* Modal */}
      <Modal isOpen={openModal !== null} onClose={handleClose}>
        {openModal === 'detail' && (
          <div>
            <h2 className="text-lg font-semibold mb-2 text-slate-700">
              Detail Kos
            </h2>
            <Detail
              id_tipe={selectedId_Tipe}
              onSuccess={() => {
                handleClose();
              }}
            />
          </div>
        )}
      </Modal>
    </div>
  );
}
