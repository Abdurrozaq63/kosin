// app/kos/component/tambahTipe.tsx
'use client';

import { useEffect, useState } from 'react';
import { useIdStore } from '@/store/useDataStore';

type Fasilitas = Record<string, boolean>;

type TambahTipeProps = {
  onSuccess?: () => void;
};

export default function TambahTipe({ onSuccess }: TambahTipeProps) {
  const { idStore } = useIdStore();

  const [id_kos, setId_kos] = useState('');
  const [nama_tipe, setNama_tipe] = useState('');
  const [jenis_kos, setJenis_kos] = useState('');
  const [harga, setHarga] = useState(0);
  const [jarak, setJarak] = useState(0);
  const [luas_kamar, setLuas_kamar] = useState(''); // tetap string
  const [jam_malam, setJam_malam] = useState('');
  const [jmlh_kamar, setJmlh_kamar] = useState(0);
  const [kmr_terisi, setKmr_terisi] = useState(0);

  const [fasilitas_kamar, setFasilitas_kamar] = useState<Fasilitas>({
    kasur: false,
    lemari: false,
    meja: false,
    kursi: false,
    ac: false,
    kamar_mandi: false,
    kipas_angin: false,
  });

  const [fasilitas_umum, setFasilitas_umum] = useState<Fasilitas>({
    dapur: false,
    ruang_tamu: false,
    parkir: false,
    jemuran: false,
    wifi: false,
    kulkas: false,
    mesin_cuci: false,
  });

  const [keamanan, setKeamanan] = useState<Fasilitas>({
    cctv: false,
    penjaga: false,
    gerbang: false,
    kartu_akses: false,
  });

  const [loading, setLoading] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const [uploadedImageUrl, setUploadedImageUrl] = useState<string | null>(null);

  // ambil id_kos dari store
  useEffect(() => {
    if (!idStore) return;
    setId_kos(idStore);
  }, [idStore]);

  const renameFile = (file: File) => {
    const ext = file.name.split('.').pop();
    const newFileName = `${nama_tipe}${id_kos}.${ext}`;
    return new File([file], newFileName, { type: file.type });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selected = e.target.files?.[0];
    if (selected) setFile(renameFile(selected));
  };

  const handleCheckbox = (
    setState: React.Dispatch<React.SetStateAction<Fasilitas>>,
    prevState: Fasilitas,
    key: string
  ) => {
    setState({ ...prevState, [key]: !prevState[key] });
  };

  const handleUpload = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    // simpan tipe kos
    const resTipe = await fetch('/api/tipekos', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        id_kos,
        nama_tipe,
        jenis_kos,
        harga,
        jarak,
        luas_kamar, // string
        jam_malam,
        jmlh_kamar,
        kmr_terisi,
        fasilitas_kamar,
        fasilitas_umum,
        keamanan,
      }),
    });

    if (!resTipe.ok) {
      console.error('Gagal menyimpan tipe kos');
      setLoading(false);
      return;
    }

    // upload gambar
    if (!file) {
      setLoading(false);
      console.error('Tidak ada file dipilih');
      return;
    }

    setUploading(true);
    const formData = new FormData();
    formData.append('file', file);

    try {
      const resImg = await fetch('/api/upimg', {
        method: 'POST',
        body: formData,
      });
      const data = await resImg.json();
      if (resImg.ok) setUploadedImageUrl(data.filePath);
      else console.error('Gagal upload gambar', data.error);
    } catch (err) {
      console.error(err);
    } finally {
      setUploading(false);
      setLoading(false);
      onSuccess?.();
    }
  };

  return (
    <form onSubmit={handleUpload} className="grid grid-cols-3 gap-4">
      <input
        type="text"
        placeholder="Nama Tipe"
        value={nama_tipe}
        onChange={(e) => setNama_tipe(e.target.value)}
        className="border p-2 col-span-1"
        required
      />
      <input
        type="text"
        placeholder="Jenis Kos"
        value={jenis_kos}
        onChange={(e) => setJenis_kos(e.target.value)}
        className="border p-2 col-span-1"
        required
      />
      <input
        type="number"
        placeholder="Harga"
        value={harga}
        onChange={(e) => setHarga(Number(e.target.value))}
        className="border p-2 col-span-1"
        required
      />
      <input
        type="number"
        placeholder="Jarak (m)"
        value={jarak}
        onChange={(e) => setJarak(Number(e.target.value))}
        className="border p-2 col-span-1"
        required
      />
      <input
        type="text"
        placeholder="Luas Kamar (contoh: 3x4)"
        value={luas_kamar}
        onChange={(e) => setLuas_kamar(e.target.value)}
        className="border p-2 col-span-1"
        required
      />
      <input
        type="text"
        placeholder="Jam Malam"
        value={jam_malam}
        onChange={(e) => setJam_malam(e.target.value)}
        className="border p-2 col-span-1"
        required
      />

      {/* File upload */}
      <input type="file" onChange={handleFileChange} className="col-span-3" />

      <button
        type="submit"
        className="col-span-3 bg-blue-500 text-white p-2 rounded"
        disabled={loading || uploading}>
        {loading ? 'Menyimpan...' : 'Simpan'}
      </button>
    </form>
  );
}
