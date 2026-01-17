'use client';
import { HiCube } from 'react-icons/hi';
import { IconContext } from 'react-icons';

export default function Navbar() {
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
