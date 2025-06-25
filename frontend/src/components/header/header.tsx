'use client';

import Image from 'next/image';
import { usePathname, useRouter } from 'next/navigation';
import MainButton from '../buttons/MainButton';

export default function Header() {
  const pathname = usePathname();
  const router = useRouter();

  const isLogin = pathname === '/login';
  const isRegister = pathname === '/register';

  const buttonLabel = isLogin ? 'Cadastre-se' : 'Login';
  const targetRoute = isLogin ? '/register' : '/login';

  return (
    <header className="flex justify-between items-center w-full px-24 py-4 shadow-sm bg-[#F6F4F1] border-b border-gray-300 w-full">
      <div className="flex items-center">
        <Image
          src="/assets/logo.svg"
          alt="Logo"
          width={40}
          height={40}
        />
      </div>

      {(isLogin || isRegister) && (
        <MainButton
          onClick={() => router.push(targetRoute)}
          className="max-w-[150px] px-6 py-2 font-montserrat text-sm"
        >
          {buttonLabel}
        </MainButton>
      )}
    </header>
  );
}
