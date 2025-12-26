import { Sidebar } from '../kos/component/Sidebar';

export default function KosLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex bg-gray-100">
      <Sidebar />
      {children}
    </div>
  );
}
