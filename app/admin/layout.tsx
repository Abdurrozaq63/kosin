import { Sidebar } from './components/Sidebar';

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex bg-white">
      <Sidebar />
      {children}
    </div>
  );
}
