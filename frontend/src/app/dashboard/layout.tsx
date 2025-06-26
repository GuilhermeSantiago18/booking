'use client';

import Loading from '@/components/Loading';
import Sidebar from '@/components/sidebar/Sidebar';
import { useUser } from '@/hooks/useUser';

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const { data: user, isLoading } = useUser();


  if (isLoading) return <Loading />
  if (!user) return <p>Usuário não encontrado</p>;


  return (
    <div className="min-h-screen bg-white">
      <Sidebar
        firstName={user.firstName}
        lastName={user.lastName}
        role={user.role}
      />
      <main className="flex-1 p-4 md:ml-64">{children}</main>
    </div>
  );
}
