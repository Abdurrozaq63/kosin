'use client';
import { HiCube } from 'react-icons/hi';
import { IconContext } from 'react-icons';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function Navbar() {
  // const { data: session, status } = useSession();
  // const router = useRouter();

  // useEffect(() => {
  //   //jika masih ada sesi setelah logout, paksa logout
  //   if (session) {
  //     signOut({ redirect: false }).then(() => {
  //       router.replace('/login');
  //     });
  //   } navbar flex m-auto z-10 sticky top-0  h-14 border-2
  // }, [session, router]);

  return (
    <div className="navbar col-span-7 col-start-3 flex items-center justify-between">
      <div className="flex items-center ml-5">
        <IconContext.Provider
          value={{
            size: '2em',
            color: '#272829',
            className: 'global-class-name',
          }}>
          <HiCube />
        </IconContext.Provider>
        <h1 className="text-2xl ml-3 btn-logout">Navbar</h1>
      </div>
      <div className="">
        <button className="p-2 p-medium">
          <p className="btn-logout font-semibold">LOGOUT</p>
        </button>
      </div>
    </div>
  );
}
