'use client';

import Loading from '@/components/Loading';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function HomePage() {
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      router.replace('/login');
    } else {
      router.replace('/dashboard');
    }
  }, [router]);

  return (
    <div className="flex items-center justify-center">
      <Loading size={24}/>
    </div>
  );
}
