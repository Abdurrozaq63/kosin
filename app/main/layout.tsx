import Navbar from './component/navbar';
import { Sidebar } from './component/Sidebar';
import ClientWrappMain from './ClientWrappMain';
export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex bg-zinc-100">
      <Sidebar />
      {children}
    </div>
  );
}
