'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useIdStore } from '@/store/useDataStore';

export default function Aksi() {
  const router = useRouter();
  const { idStore } = useIdStore();
  const [kosVisited, setKosVisited] = useState<any[]>([]);

  useEffect(() => {
    const fetchKosVisit = async () => {
      const res = await fetch('/api/kos/kunjungan', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id_kos: idStore }),
      });
      const data = await res.json();
      setKosVisited(data);
    };
    fetchKosVisit();
  }, []);

  return (
    <div className="w-full flex- flex-col justify-start items-center">
      <div className="w-full px-3 py-3 text-center mt-1 text-sm text-gray-500">
        <h1 className="text-gray-500 text-start ml-5 text-2xl">Riwayat Aksi</h1>
      </div>
    </div>
  );
}
