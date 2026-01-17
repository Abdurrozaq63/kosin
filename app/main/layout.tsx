import Navbar from './component/navbar';
import { Sidebar } from './component/Sidebar';
import ClientWrappMain from './ClientWrappMain';
export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen bg-white">
      <Sidebar />
      <main className="flex-1 p-4 lg:ml-96">{children}</main>
    </div>
  );
}
