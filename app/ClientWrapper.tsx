// ClientWrapper.tsx
'use client';

import { useEffect, useState } from 'react';
import { useIdStore, useTipeKos, useKos, useRole } from '@/store/useDataStore';

export default function ClientWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const { idStore, setIdStore } = useIdStore();
  const { TipeKosStore, fetchTipeKoss } = useTipeKos();
  const { KosStore, fetchKoss } = useKos();
  const { setRole } = useRole();

  useEffect(() => {
    const fetchUserData = async () => {
      const res = await fetch('/api/getToken', {
        method: 'POST',
        credentials: 'include',
      });
      const data = await res.json();

      setIdStore(data.id);
      setRole(data.role);

      console.log('id client wrapper:', data.id);
      console.log('role:', data.role);
    };

    fetchUserData();
  }, [setIdStore, setRole]); // cukup depend ke setter (atau bahkan [])

  useEffect(() => {
    if (!idStore) return;
    fetchTipeKoss();
    fetchKoss();
  }, [idStore, fetchTipeKoss, fetchKoss]);

  return <>{children}</>;
}
