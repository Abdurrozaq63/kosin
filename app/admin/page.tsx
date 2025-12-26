'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useKos, useTipeKos } from '@/store/useDataStore';
import { Home, Building2, Users } from 'lucide-react';

export default function Admin() {
  const router = useRouter();
  const { KosStore } = useKos();
  const { TipeKosStore } = useTipeKos();
  const [userFetch, setUserFetch] = useState<any[]>([]);
  const [kosWT, setKosWT] = useState<any[]>([]);
  const [userMostAktif, setUserMost] = useState<any[]>([]);

  useEffect(() => {
    const fetchUser = async () => {
      const res = await fetch('/api/user');
      const data = await res.json();
      setUserFetch(data);
    };

    const fetchKosWT = async () => {
      const res = await fetch('/api/kos/populer');
      const data = await res.json();
      setKosWT(data);
    };

    const fetchUserMost = async () => {
      const res = await fetch('/api/user/aktif');
      const data = await res.json();
      setUserMost(data);
    };

    fetchUser();
    fetchKosWT();
    fetchUserMost();
  }, []);

  return (
    <div className="w-full flex flex-col min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      {/* Header */}
      <div className="w-full px-6 py-6 border-b bg-white shadow-sm">
        <h1 className="text-slate-700 font-bold text-3xl">Dashboard</h1>
        <p className="text-slate-500 text-sm mt-1">
          Ringkasan Informasi Sistem Kos
        </p>
      </div>

      {/* Statistik utama */}
      <div className="w-full p-6 grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="p-6 bg-white rounded-2xl shadow-md flex flex-col items-center justify-center hover:shadow-lg transition">
          <Home className="w-8 h-8 text-indigo-500 mb-2" />
          <h2 className="font-medium text-slate-500">Jumlah Kos Terdaftar</h2>
          <h5 className="text-4xl font-bold text-slate-800 mt-2">
            {KosStore.length}
          </h5>
        </div>
        <div className="p-6 bg-white rounded-2xl shadow-md flex flex-col items-center justify-center hover:shadow-lg transition">
          <Building2 className="w-8 h-8 text-emerald-500 mb-2" />
          <h2 className="font-medium text-slate-500">Jumlah Tipe Kamar Kos</h2>
          <h5 className="text-4xl font-bold text-slate-800 mt-2">
            {TipeKosStore.length}
          </h5>
        </div>
        <div className="p-6 bg-white rounded-2xl shadow-md flex flex-col items-center justify-center hover:shadow-lg transition">
          <Users className="w-8 h-8 text-rose-500 mb-2" />
          <h2 className="font-medium text-slate-500">Total Pengguna</h2>
          <h5 className="text-4xl font-bold text-slate-800 mt-2">
            {userFetch.length}
          </h5>
        </div>
      </div>

      {/* Bagian tabel */}
      <div className="w-full p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Kos Terpopuler */}
        <div className="bg-white rounded-2xl shadow-md p-4">
          <h3 className="font-semibold text-slate-700 mb-3">
            Kos & Tipe Terpopuler
          </h3>
          <div className="overflow-hidden rounded-lg border border-slate-200">
            <div className="grid grid-cols-3 bg-slate-100 font-semibold text-slate-600 text-center border-b">
              <div className="p-2">Nama Kos</div>
              <div className="p-2">Nama Tipe</div>
              <div className="p-2">Jumlah Kunjungan</div>
            </div>
            {kosWT.map((k, index) => {
              const tipeSelect = TipeKosStore.find(
                (item) => item.id_tipe === k.id_tipe
              );
              const kosSelect = KosStore.find(
                (item) => item.id_kos === tipeSelect?.id_kos
              );
              return (
                <div
                  key={index}
                  className={`grid grid-cols-3 text-center ${
                    index % 2 === 0 ? 'bg-white' : 'bg-slate-50'
                  }`}>
                  <div className="p-2 border-b text-gray-700">
                    {kosSelect?.nama_kos}
                  </div>
                  <div className="p-2 border-b text-gray-700">
                    {tipeSelect?.nama_tipe}
                  </div>
                  <div className="p-2 border-b font-medium text-gray-700">
                    {k.total_kunjungan}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* User Paling Aktif */}
        <div className="bg-white rounded-2xl shadow-md p-4">
          <h3 className="font-semibold text-slate-700 mb-3">
            User Paling Aktif
          </h3>
          <div className="overflow-hidden rounded-lg border border-slate-200">
            <div className="grid grid-cols-2 bg-slate-100 font-semibold text-slate-600 text-center border-b">
              <div className="p-2">Nama User</div>
              <div className="p-2">Total Riwayat</div>
            </div>
            {userMostAktif.map((k, index) => (
              <div
                key={index}
                className={`grid grid-cols-2 text-center ${
                  index % 2 === 0 ? 'bg-white' : 'bg-slate-50'
                }`}>
                <div className="p-2 border-b text-gray-700">{k.nama}</div>
                <div className="p-2 border-b font-medium text-gray-700">
                  {k.total_kunjungan}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
