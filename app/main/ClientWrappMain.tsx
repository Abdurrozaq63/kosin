'use client';

import { useEffect } from 'react';
import { useSavedTipes, SavedTipe, useIdStore } from '@/store/useDataStore';

export default function ClientWrappMain({
  children,
}: {
  children: React.ReactNode;
}) {
  const { setAllSavedTipes } = useSavedTipes();
  const { idStore } = useIdStore();

  useEffect(() => {
    if (!idStore) return;
    const simpanFetch = async () => {
      const res = await fetch('/api/simpan/pilih', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: idStore }),
      });
      const data: SavedTipe[] = await res.json();
      setAllSavedTipes(data || []);
    };

    simpanFetch();
  }, [idStore, setAllSavedTipes]);
  return <>{children}</>;
}
