'use client';

import CustomInput from '@/components/Inputs/CustomInput';
import Sidebar from '@/components/sidebar/Sidebar';
import { useEffect, useState } from 'react';

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<{ firstName: string; lastName: string; role: 'admin' | 'client' } | null>(null);
   const [search, setSearch] = useState('');

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  if (!user) return null;

 return (
  <div className="flex">

    <Sidebar
      firstName={user.firstName}
      lastName={user.lastName}
      role={user.role}
    />
    <section className="flex-1 mt-6">{children}
    </section>
  </div>
);

}
