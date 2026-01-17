import { create } from 'zustand';

interface get_id {
  idStore: string;
  setIdStore: (value: string) => void;
}
//store untuk
export const useIdStore = create<get_id>((set) => ({
  idStore: '',
  setIdStore: (value) => set({ idStore: value }),
}));

//store untuk mendapatkan role
interface get_role {
  role: string;
  setRole: (value: string) => void;
}
export const useRole = create<get_role>((set) => ({
  role: '',
  setRole: (value) => set({ role: value }),
}));

//store untuk tipe kos di daftar kos
interface get_idSelect {
  idKosSelect: string;
  setIdKosSelect: (value: string) => void;
}

export const useIdKosSelect = create<get_idSelect>((set) => ({
  idKosSelect: '',
  setIdKosSelect: (value) => set({ idKosSelect: value }),
}));

// store/useSavedTipes.ts

export interface SavedTipe {
  id_simpan: string;
  id_tipe: string;
  id_user: string;
}

interface SavedTipeState {
  savedTipes: SavedTipe[];
  addSavedTipe: (tipe: SavedTipe) => void;
  removeSavedTipe: (id_tipe: string) => void;
  setAllSavedTipes: (tipes: SavedTipe[]) => void;
  isTipeSaved: (id_tipe: string) => boolean;
}

export const useSavedTipes = create<SavedTipeState>((set, get) => ({
  savedTipes: [],

  addSavedTipe: (tipe) =>
    set((state) => ({
      savedTipes: [...state.savedTipes, tipe],
    })),

  removeSavedTipe: (id_tipe) =>
    set((state) => ({
      savedTipes: state.savedTipes.filter((t) => t.id_tipe !== id_tipe),
    })),
  setAllSavedTipes: (tipes) =>
    set(() => ({
      savedTipes: tipes,
    })),

  isTipeSaved: (id_tipe) => get().savedTipes.some((t) => t.id_tipe === id_tipe),
}));

interface vgaMatch {
  vga: string;
  setVgas: (value: string) => void;
}
export const useVgaMatch = create<vgaMatch>((set) => ({
  vga: '',
  setVgas: (value) =>
    set({
      vga: value,
    }),
}));

//store untuk kos
type KosStore = {
  id_kos: string;
  nama_kos: string;
  notelp: number;
  alamat: string;
  email: string;
};

type kosStoreState = {
  KosStore: KosStore[];
  isLoading: boolean;
  error: string | null;

  setKosStore: (data: KosStore[]) => void;
  fetchKoss: () => Promise<void>;
};

export const useKos = create<kosStoreState>((set) => ({
  KosStore: [],
  isLoading: false,
  error: null,
  setKosStore: (data) => set({ KosStore: data }),

  fetchKoss: async () => {
    set({ isLoading: true, error: null });
    try {
      const res = await fetch('/api/kos');

      if (!res.ok) throw new Error('Failed to fetch');
      const data = await res.json();

      set({ KosStore: data, isLoading: false });
    } catch (err: any) {
      set({ error: err.message, isLoading: false });
    }
  },
}));

//store untuk list tipe kos
type TipeKosStore = {
  id_tipe: string;
  id_kos: string;
  nama_tipe: string;
  jenis_kos: string;
  harga: number;
  jarak: number;
  luas_kamar: string;
  fasilitas_kamar: string;
  fasilitas_umum: string;
  keamanan: string;
  jam_malam: string;
  jmlh_kamar: number;
  kmr_terisi: number;
  status: string;
};

type tipeKosStoreState = {
  TipeKosStore: TipeKosStore[];
  isLoading: boolean;
  error: string | null;

  setTipeKosStore: (data: TipeKosStore[]) => void;
  fetchTipeKoss: () => Promise<void>;
};

export const useTipeKos = create<tipeKosStoreState>((set) => ({
  TipeKosStore: [],
  isLoading: false,
  error: null,
  setTipeKosStore: (data) => set({ TipeKosStore: data }),

  fetchTipeKoss: async () => {
    set({ isLoading: true, error: null });
    try {
      const res = await fetch('/api/tipekos');

      if (!res.ok) throw new Error('Failed to fetch');
      const data = await res.json();
      set({ TipeKosStore: data, isLoading: false });
    } catch (err: any) {
      set({ error: err.message, isLoading: false });
    }
  },
}));
