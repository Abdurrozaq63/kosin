'use client';
import { stat } from 'fs';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
type EditProps = {
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
  onSuccess?: () => void;
};

export default function Edit({
  id_tipe,
  id_kos,
  nama_tipe,
  jenis_kos,
  harga,
  jarak,
  luas_kamar,
  fasilitas_kamar,
  fasilitas_umum,
  keamanan,
  jam_malam,
  jmlh_kamar,
  kmr_terisi,
  status,
  onSuccess,
}: EditProps) {
  const [nama, setNama] = useState(nama_tipe);
  const [jenis, setJenis] = useState(jenis_kos);
  const [hargaKos, setHarga] = useState(harga);
  const [jarakKos, setJarak] = useState(jarak);
  const [luas_kamarKos, setLuas_kamar] = useState(luas_kamar);
  const [fasilitas_kamarKos, setFasilitas_kamar] = useState({
    kasur: fasilitas_kamar.kasur ?? false,
    lemari: fasilitas_kamar.lemari ?? false,
    meja: fasilitas_kamar.meja ?? false,
    kursi: fasilitas_kamar.kursi ?? false,
    ac: fasilitas_kamar.ac ?? false,
    kamar_mandi: fasilitas_kamar.kamar_mandi ?? false,
    kipas_angin: fasilitas_kamar.kipas_angin ?? false,
  });

  const [fasilitas_umumKos, setFasilitas_umum] = useState({
    dapur: fasilitas_umum.dapur ?? false,
    ruang_tamu: fasilitas_umum.ruang_tamu ?? false,
    parkir: fasilitas_umum.parkir ?? false,
    jemuran: fasilitas_umum.jemuran ?? false,
    wifi: fasilitas_umum.wifi ?? false,
    kulkas: fasilitas_umum.kulkas ?? false,
    mesin_cuci: fasilitas_umum.mesin_cuci ?? false,
  });

  const [keamananKos, setKeamanan] = useState({
    cctv: keamanan.cctv ?? false,
    penjaga: keamanan.penjaga ?? false,
    gerbang: keamanan.gerbang ?? false,
    kartu_akses: keamanan.kartu_akses ?? false,
  });

  const [jam_malamKos, setJam_malam] = useState(jam_malam);
  const [jmlh_kamarKos, setJmlh_kamar] = useState(jmlh_kamar);
  const [kmr_terisiKos, setKmr_terisi] = useState(kmr_terisi);
  const [statusKos, setStatus] = useState(status);
  const [loading, setLoading] = useState(false);

  const handleUpload = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const res = await fetch('/api/tipekos', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          id_tipe,
          id_kos,
          nama_tipe: nama,
          jenis_kos: jenis,
          harga: hargaKos,
          jarak: jarakKos,
          luas_kamar: luas_kamarKos,
          fasilitas_kamar: fasilitas_kamarKos,
          fasilitas_umum: fasilitas_umumKos,
          keamanan: keamananKos,
          jam_malam: jam_malamKos,
          jmlh_kamar: jmlh_kamarKos,
          kmr_terisi: kmr_terisiKos,
          status: statusKos,
        }),
      });
      if (!res.ok) throw new Error('Gagal update data');

      const updated = await res.json();
      console.log('Update sukses:', updated);

      if (onSuccess) onSuccess();
    } catch (err) {
      console.error('Error update kos:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleCheckbox = (setState: any, prevState: any, key: string) => {
    setState({ ...prevState, [key]: !prevState[key] });
  };
  return (
    <div className="flex flex-col justify-start items-center">
      <div className="space-y-4">
        <h2 className="text-xl font-bold text-slate-800">Tambah Tipe Kos</h2>

        <form onSubmit={handleUpload} className="grid grid-cols-3 gap-4">
          {/* input biasa */}
          <div className="col-span-3 grid grid-cols-3 gap-3">
            <div>
              <label className="text-gray-500">Nama Tipe</label>
              <input
                type="text"
                placeholder="Nama Tipe Kos"
                value={nama}
                onChange={(e) => setNama(e.target.value)}
                className="w-full p-2 border rounded text-slate-800"
                required
              />
            </div>
            <div>
              <label className="text-gray-500">jenis Kos</label>
              <input
                type="text"
                placeholder="Jenis Kos"
                value={jenis}
                onChange={(e) => setJenis(e.target.value)}
                className="w-full p-2 border rounded text-slate-800"
                required
              />
            </div>
            <div>
              <label className="text-gray-500">Harga</label>
              <input
                type="number"
                placeholder="Harga"
                value={hargaKos}
                onChange={(e) => setHarga(Number(e.target.value))}
                className="w-full p-2 border rounded text-slate-800"
                required
              />
            </div>
            <div>
              <label className="text-gray-500">Jarak</label>
              <input
                type="number"
                placeholder="Jarak Kos Ke Kampus"
                value={jarakKos}
                onChange={(e) => setJarak(Number(e.target.value))}
                className="w-full p-2 border rounded text-slate-800"
                required
              />
            </div>
            <div>
              <label className="text-gray-500">Luas kamar</label>
              <input
                type="text"
                placeholder="Format 3x4"
                value={luas_kamarKos}
                onChange={(e) => setLuas_kamar(e.target.value)}
                className="w-full p-2 border rounded text-slate-800"
                required
              />
            </div>
          </div>

          {/* ✅ Checklist fasilitas_kamar */}
          <div className="col-span-3 gap-2 grid grid-cols-3">
            <div className="">
              <h3 className="font-semibold text-slate-700">Fasilitas Kamar</h3>
              <div className="grid grid-cols-2 gap-2">
                {Object.keys(fasilitas_kamarKos).map((key) => (
                  <label
                    key={key}
                    className="flex items-center gap-2 text-gray-500">
                    <input
                      type="checkbox"
                      className="text-gray-500"
                      checked={
                        fasilitas_kamarKos[
                          key as keyof typeof fasilitas_kamarKos
                        ]
                      }
                      onChange={() =>
                        setFasilitas_kamar({
                          ...fasilitas_kamarKos,
                          [key]:
                            !fasilitas_kamarKos[
                              key as keyof typeof fasilitas_kamarKos
                            ],
                        })
                      }
                    />
                    {key}
                  </label>
                ))}
              </div>
            </div>

            {/* ✅ Checklist fasilitas_umum */}
            <div className="">
              <h3 className="font-semibold text-slate-700">Fasilitas Umum</h3>
              <div className="grid grid-cols-2 gap-2">
                {Object.keys(fasilitas_umumKos).map((key) => (
                  <label
                    key={key}
                    className="flex items-center gap-2 text-gray-500">
                    <input
                      type="checkbox"
                      checked={
                        fasilitas_umumKos[key as keyof typeof fasilitas_umumKos]
                      }
                      onChange={() =>
                        setFasilitas_umum({
                          ...fasilitas_umumKos,
                          [key]:
                            !fasilitas_umumKos[
                              key as keyof typeof fasilitas_umumKos
                            ],
                        })
                      }
                    />
                    {key}
                  </label>
                ))}
              </div>
            </div>

            {/* ✅ Checklist keamanan */}
            <div className="">
              <h3 className="font-semibold text-slate-700">Keamanan</h3>
              <div className="grid grid-cols-1 gap-1">
                {Object.keys(keamananKos).map((key) => (
                  <label
                    key={key}
                    className="flex items-center gap-2 text-gray-500">
                    <input
                      type="checkbox"
                      checked={keamananKos[key as keyof typeof keamananKos]}
                      onChange={() =>
                        setKeamanan({
                          ...keamananKos,
                          [key]: !keamananKos[key as keyof typeof keamananKos],
                        })
                      }
                    />
                    {key}
                  </label>
                ))}
              </div>
            </div>
          </div>

          {/* input lainnya */}
          <div className="col-span-3 grid grid-cols-3 gap-2">
            <div>
              <label className="text-gray-500">Jam Malam</label>
              <input
                type="text"
                placeholder="Jam Malam"
                value={jam_malam}
                onChange={(e) => setJam_malam(e.target.value)}
                className="w-full p-2 border rounded text-slate-800"
                required
              />
            </div>
            <div>
              <label className="text-gray-500">Jumlah Kamar</label>
              <input
                type="number"
                placeholder="Jumlah Kamar Kos"
                value={jmlh_kamar}
                onChange={(e) => setJmlh_kamar(Number(e.target.value))}
                className="w-full p-2 border rounded text-slate-800"
                required
              />
            </div>
            <div>
              <label className="text-gray-500">Kamar Terisi</label>
              <input
                type="number"
                placeholder="Kamar yang Sudah Terisi"
                value={kmr_terisi}
                onChange={(e) => setKmr_terisi(Number(e.target.value))}
                className="w-full p-2 border rounded text-slate-800"
                required
              />
            </div>
          </div>

          {/* Tombol */}
          <div className="col-span-3 col-start-3 ">
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-blue-500 text-white p-2 rounded">
              {loading ? 'Menyimpan...' : 'Simpan'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
