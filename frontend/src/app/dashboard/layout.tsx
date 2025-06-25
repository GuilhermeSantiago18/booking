'use client';

import Sidebar from '@/components/sidebar/Sidebar';
import { useEffect, useState } from 'react';

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<{ firstName: string; lastName: string; role: 'admin' | 'client' } | null>(null);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  if (!user) return null;

  return (
    <div className="flex min-h-screen">
      <Sidebar
        firstName={user.firstName}
        lastName={user.lastName}
        role={user.role}
      />
      <main className="flex-1 p-6 ml-0 md:ml-64">{children}</main>
    </div>
  );
}
