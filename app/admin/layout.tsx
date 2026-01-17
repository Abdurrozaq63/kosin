import { Sidebar } from './components/Sidebar';

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
<<<<<<< HEAD
    <div className="flex min-h-screen bg-white">
      <Sidebar />
      <main className="flex-1 p-4 lg:ml-96">{children}</main>
=======
    <div className="flex bg-white">
      <Sidebar />
      {children}
>>>>>>> 2a02faad8cd902e30520f6939523dac72928d907
    </div>
  );
}
