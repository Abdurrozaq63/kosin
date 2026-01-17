'use client';
import {
  HiHome,
  HiCollection,
  HiClipboardList,
  HiInformationCircle,
} from 'react-icons/hi';
import { useRouter } from 'next/navigation';
import { IconContext } from 'react-icons';

export function Sidebar() {
  const router = useRouter();

  return (
    <div className="col-span-2 row-span-5 h-screen bg-black text-slate-300  sticky   border-violet-900">
      <ul className="align-middle mt-4 ml-5">
        <IconContext.Provider
          value={{
            size: '2em',
            color: '#d1d5db',
            className: 'global-class-name',
          }}>
          <li
            onClick={() => router.push('/dashboard')}
            className="flex h-20 tracking-wider cursor-pointer object-bottom flex-wrap items-center">
            <HiHome />
            <p className="text-xl ml-5 font-medium tracking-widest">
              Dashboard
            </p>
          </li>
          <li
            onClick={() => router.push('/dashboard/product')}
            className="flex h-20 tracking-wider cursor-pointer object-bottom flex-wrap items-center">
            <HiCollection />
            <p className="text-xl ml-5 font-medium tracking-widest">Product</p>
          </li>
          <li
            onClick={() => router.push('/dashboard/instruction')}
            className="flex h-20 tracking-wider cursor-pointer object-bottom flex-wrap items-center">
            <HiClipboardList />
            <p className="text-xl ml-5 font-medium tracking-widest">
              Instruction
            </p>
          </li>
          <li
            onClick={() => router.push('/dashboard/about')}
            className="flex h-20 tracking-wider cursor-pointer object-bottom flex-wrap items-center">
            <HiInformationCircle />
            <p className="text-xl ml-5 font-medium tracking-widest">About</p>
          </li>
        </IconContext.Provider>
      </ul>
    </div>
  );
}
