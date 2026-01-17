'use client';

import { useState, useEffect } from 'react';
import { Eye, EyeOff, Edit3, Save, X } from 'lucide-react';
import { useIdStore } from '@/store/useDataStore';

type Admin = {
  id_admin: string;
  email: string;
  password: string;
};

export default function ProfilPage() {
  const [user, setUser] = useState<Admin | null>(null);
  const [showPassword, setShowPassword] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const { idStore } = useIdStore();

  const [form, setForm] = useState<Omit<Admin, 'id_admin'>>({
    email: '',
    password: '',
  });

  useEffect(() => {
    if (!idStore) return;

    const fetchUser = async () => {
      const res = await fetch('/api/admin');
      const data: Admin[] = await res.json();

      const filtUser = data.find((item) => item.id_admin === idStore);

      if (!filtUser) return;

      setUser(filtUser);
      setForm({
        email: filtUser.email,
        password: filtUser.password,
      });
    };

    fetchUser();
  }, [idStore]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSave = async () => {
    if (!idStore) return;

    await fetch('/api/admin', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        id_admin: idStore,
        email: form.email,
        password: form.password,
      }),
    });

    setUser({
      id_admin: idStore,
      email: form.email,
      password: form.password,
    });

    setIsEditing(false);
  };

  return (
    <div className="w-full">
      <div className="w-3/6 mx-auto p-6">
        <h1 className="text-2xl font-bold text-slate-700 mb-6">Profil Admin</h1>

        <div className="bg-white shadow-xl rounded-2xl p-6 space-y-6 border">
          {/* Email */}
          <div>
            <label className="block text-sm text-gray-500 mb-1">Email</label>
            {isEditing ? (
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                className="w-full border rounded-lg px-3 py-2"
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
                  className="w-full border rounded-lg px-3 py-2"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}>
                  {showPassword ? <EyeOff /> : <Eye />}
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <p className="text-lg font-medium text-gray-800">
                  {showPassword ? user?.password : '••••••••'}
                </p>
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}>
                  {showPassword ? <EyeOff /> : <Eye />}
                </button>
              </div>
            )}
          </div>

          {/* Action */}
          <div className="flex justify-end gap-3">
            {isEditing ? (
              <>
                <button
                  onClick={() => setIsEditing(false)}
                  className="px-4 py-2 bg-gray-200 rounded-lg">
                  <X size={18} /> Batal
                </button>
                <button
                  onClick={handleSave}
                  className="px-4 py-2 bg-blue-500 text-white rounded-lg">
                  <Save size={18} /> Simpan
                </button>
              </>
            ) : (
              <button
                onClick={() => setIsEditing(true)}
                className="px-4 py-2 bg-blue-500 text-white rounded-lg">
                <Edit3 size={18} /> Edit Profil
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
