'use client';
import { HiHome, HiUserCircle, HiLogout } from 'react-icons/hi';
import { useRouter, usePathname } from 'next/navigation';
import { IconContext } from 'react-icons';

export function Sidebar() {
  const router = useRouter();
  const pathname = usePathname();

  const handleLogout = async () => {
    console.log('mencoba logout');
    await fetch('/api/auth/logout', { method: 'POST' });
    router.push('/login');
  };

  const menuItems = [
    { label: 'Beranda', path: '/kos', icon: <HiHome /> },
    { label: 'Profil', path: '/kos/profil', icon: <HiUserCircle /> },
  ];

  return (
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
  );
}
