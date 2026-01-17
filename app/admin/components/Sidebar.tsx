'use client';
<<<<<<< HEAD

import {
=======
import {
  HiHome,
>>>>>>> 2a02faad8cd902e30520f6939523dac72928d907
  HiCollection,
  HiClipboardList,
  HiTable,
  HiLogout,
  HiUserCircle,
<<<<<<< HEAD
  HiMenu,
  HiX,
} from 'react-icons/hi';
import { useRouter, usePathname } from 'next/navigation';
import { IconContext } from 'react-icons';
import { useState } from 'react';
=======
} from 'react-icons/hi';
import { useRouter, usePathname } from 'next/navigation';
import { IconContext } from 'react-icons';
>>>>>>> 2a02faad8cd902e30520f6939523dac72928d907

export function Sidebar() {
  const router = useRouter();
  const pathname = usePathname();
<<<<<<< HEAD
  const [open, setOpen] = useState(false);

  const handleLogout = async () => {
=======

  const handleLogout = async () => {
    console.log('mencoba logout');
>>>>>>> 2a02faad8cd902e30520f6939523dac72928d907
    await fetch('/api/auth/logout', { method: 'POST' });
    router.push('/login');
  };

  const menuItems = [
    { label: 'Dashboard', path: '/admin', icon: <HiTable /> },
    { label: 'Pengajuan', path: '/admin/pengajuan', icon: <HiCollection /> },
    {
      label: 'Daftar Kos',
      path: '/admin/daftar_kos',
      icon: <HiClipboardList />,
    },
    {
      label: 'Profil',
      path: '/admin/profil',
      icon: <HiUserCircle />,
    },
  ];

  return (
<<<<<<< HEAD
    <>
      {/* Toggle Button (Mobile Only) */}
      <button
        onClick={() => setOpen(!open)}
        className="fixed top-4 left-4 z-50 p-2 rounded-md bg-indigo-600 text-white lg:hidden">
        {open ? <HiX size={24} /> : <HiMenu size={24} />}
      </button>

      {/* Overlay (Mobile Only) */}
      {open && (
        <div
          className="fixed inset-0 bg-black/40 z-40 lg:hidden"
          onClick={() => setOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`
          fixed top-0 left-0 z-50
          h-screen w-80
          bg-gradient-to-b from-indigo-600 to-indigo-800
          text-white flex flex-col shadow-2xl
          transform transition-transform duration-300
          ${open ? 'translate-x-0' : '-translate-x-full'}
          lg:translate-x-0
        `}>
        {/* Logo */}
        <div className="flex items-center justify-center h-20 border-b border-indigo-500">
          <h1 className="text-3xl font-extrabold tracking-widest">KOSIN</h1>
        </div>

        {/* Menu */}
        <ul className="flex-1 mt-6">
          <IconContext.Provider value={{ size: '1.7em' }}>
            {menuItems.map((item, idx) => {
              const active = pathname === item.path;
              return (
                <li
                  key={idx}
                  onClick={() => {
                    router.push(item.path);
                    setOpen(false); // auto-close di mobile
                  }}
                  className={`flex items-center gap-4 px-6 py-3 my-2 mx-3 rounded-xl cursor-pointer transition-all duration-200
                    ${
                      active
                        ? 'bg-white text-indigo-700 font-semibold shadow-md'
                        : 'text-gray-200 hover:bg-indigo-700 hover:shadow-md'
                    }`}>
                  {item.icon}
                  <span className="text-lg">{item.label}</span>
                </li>
              );
            })}
          </IconContext.Provider>
        </ul>

        {/* Logout */}
        <div className="border-t border-indigo-500">
          <button
            onClick={handleLogout}
            className="flex items-center gap-4 px-6 py-3 w-full text-gray-200 hover:bg-red-600 hover:text-white transition-all duration-200">
            <HiLogout size="1.7em" />
            <span className="text-lg font-medium">Keluar</span>
          </button>
        </div>
      </aside>
    </>
=======
    <div className="h-screen w-96 bg-gradient-to-b from-indigo-600 to-indigo-800 text-white flex flex-col shadow-2xl sticky top-0">
      {/* Logo */}
      <div className="flex items-center justify-center h-20 border-b border-indigo-500">
        <h1 className="text-3xl font-extrabold tracking-widest">KOSIN</h1>
      </div>

      {/* Menu */}
      <ul className="flex-1 mt-6">
        <IconContext.Provider
          value={{
            size: '1.7em',
            className: 'global-class-name',
          }}>
          {menuItems.map((item, idx) => {
            const active = pathname === item.path;
            return (
              <li
                key={idx}
                onClick={() => router.push(item.path)}
                className={`flex items-center gap-4 px-6 py-3 my-2 mx-3 rounded-xl cursor-pointer transition-all duration-200 
                  ${
                    active
                      ? 'bg-white text-indigo-700 font-semibold shadow-md'
                      : 'text-gray-200 hover:bg-indigo-700 hover:shadow-md'
                  }`}>
                {item.icon}
                <span className="text-lg">{item.label}</span>
              </li>
            );
          })}
        </IconContext.Provider>
      </ul>

      {/* Logout */}
      <div className="border-t border-indigo-500">
        <button
          onClick={handleLogout}
          className="flex items-center gap-4 px-6 py-3 w-full text-gray-200 hover:bg-red-600 hover:text-white transition-all duration-200">
          <HiLogout size="1.7em" />
          <span className="text-lg font-medium">Keluar</span>
        </button>
      </div>
    </div>
>>>>>>> 2a02faad8cd902e30520f6939523dac72928d907
  );
}
