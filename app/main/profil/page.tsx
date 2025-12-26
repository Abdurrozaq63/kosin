'use client';
import { useState, useEffect } from 'react';
import { Eye, EyeOff, Edit3, Save, X } from 'lucide-react';
import { useIdStore } from '@/store/useDataStore';

type User = {
  nama: string;
  email: string;
  password: string;
};

export default function ProfilPage() {
  const [user, setUser] = useState<User | null>(null);
  const [showPassword, setShowPassword] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const { idStore } = useIdStore();
  const [form, setForm] = useState<User>({ nama: '', email: '', password: '' });

  useEffect(() => {
    // Fetch data user (dummy sementara, ganti dengan fetch API Anda)
    if (!idStore) return;
    const fetchUser = async () => {
      const res = await fetch('/api/user');
      const data = await res.json();
      const filtUser = data.find((item: any) => item.id_user === idStore);

      console.log('filter user', filtUser);
      console.log('id user', idStore);
      setUser(filtUser);
      setForm(filtUser);
    };
    fetchUser();
    console.log('idUser', idStore);
  }, [idStore]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSave = async () => {
    await fetch('/api/user', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        id_user: idStore,
        nama: form.nama,
        email: form.email,
        password: form.password,
      }),
    });

    console.log('Data tersimpan:', form);
    setUser(form);
    setIsEditing(false);
  };

  return (
    <div className="w-full">
      <div className="w-3/6 mx-auto p-6">
        <h1 className="text-2xl font-bold text-slate-700 mb-6">
          Profil Pengguna
        </h1>

        <div className="bg-white shadow-md rounded-2xl p-6 space-y-6 border">
          {/* Nama */}
          <div>
            <label className="block text-sm text-gray-500 mb-1">Nama</label>
            {isEditing ? (
              <input
                type="text"
                name="nama"
                value={form.nama}
                onChange={handleChange}
                className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-400 outline-none text-gray-700"
              />
            ) : (
              <p className="text-lg font-medium text-gray-800">{user?.nama}</p>
            )}
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm text-gray-500 mb-1">Email</label>
            {isEditing ? (
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-400 outline-none text-gray-700"
              />
            ) : (
              <p className="text-lg font-medium text-gray-800">{user?.email}</p>
            )}
          </div>

          {/* Password */}
          <div>
            <label className="block text-sm text-gray-500 mb-1">Password</label>
            {isEditing ? (
              <div className="flex items-center gap-2">
                <input
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  value={form.password}
                  onChange={handleChange}
                  className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-400 outline-none text-gray-700"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="text-gray-500 hover:text-gray-700">
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <p className="text-lg font-medium text-gray-800">
                  {showPassword ? user?.password : '••••••••'}
                </p>
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="text-gray-500 hover:text-gray-700">
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
            )}
          </div>

          {/* Tombol Aksi */}
          <div className="flex justify-end gap-3">
            {isEditing ? (
              <>
                <button
                  onClick={() => setIsEditing(false)}
                  className="flex items-center gap-1 px-4 py-2 bg-gray-200 rounded-lg hover:bg-gray-300">
                  <X size={18} /> Batal
                </button>
                <button
                  onClick={handleSave}
                  className="flex items-center gap-1 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600">
                  <Save size={18} /> Simpan
                </button>
              </>
            ) : (
              <button
                onClick={() => setIsEditing(true)}
                className="flex items-center gap-1 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600">
                <Edit3 size={18} /> Edit Profil
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
