'use client';

import Sidebar from '@/components/sidebar/Sidebar';
import { useEffect, useState } from 'react';
import { IUser } from '@/types/IUser';
import { useAuth } from '@/hooks/useAuth';

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<IUser | null>(null);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  if (!user) return null;

  return (
    <div className="flex min-h-screen bg-white">
      <Sidebar
        firstName={user.firstName}
        lastName={user.lastName}
        role={user.role}
      />
      <main className="flex-1 p-4 md:ml-64">{children}</main>
    </div>
  );
}
