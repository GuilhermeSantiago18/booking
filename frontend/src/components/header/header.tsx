'use client';

import Image from 'next/image';
import { usePathname, useRouter } from 'next/navigation';
import MainButton from '../buttons/MainButton';

const pageMetadata: Record<string, { title: string; description: string }> = {
  '/login': {
    title: 'Bem-vindo de volta!',
    description: 'Faça login para acessar sua conta e gerenciar seus agendamentos.',
  },
  '/register': {
    title: 'Crie sua conta',
    description: 'Preencha seus dados para começar a usar o sistema.',
  },
  '/dashboard/agendamentos': {
    title: 'Agendamento',
    description: 'Acompanhe todos os seus agendamentos de forma simples',
  },
  '/dashboard/logs': {
    title: 'Logs do sistema',
    description: 'Acompanhe os registros de ações realizadas na aplicação.',
  },
  '/dashboard/minha-conta': {
    title: 'Minha Conta',
    description: 'Gerencie seus dados pessoais e preferências da conta.',
  },
  '/dashboard/clientes': {
    title: 'Clientes',
    description: 'Gerencie os usuários do sistema.',
  },
};

export default function Header() {
  const pathname = usePathname();
  const router = useRouter();

  const metadata = pageMetadata[pathname];

  const isLoginOrRegister = pathname === '/login' || pathname === '/register';
  const buttonLabel = pathname === '/login' ? 'Cadastre-se' : 'Login';
  const targetRoute = pathname === '/login' ? '/register' : '/login';

  return (
    <header className="flex justify-between items-center w-full p-6 bg-[#F6F4F1] border-b-2 border-gray-300">
  <div className="flex items-center gap-4">
    <Image src="/assets/logo.svg" alt="Logo" width={60} height={60} />
    
    {metadata && (
      <div className="ml-0 md:ml-42">
        <h1 className="text-2xl font-semibold font-montserrat">{metadata.title}</h1>
        <p className="text-xs text-black font-medium font-montserrat">{metadata.description}</p>
      </div>
    )}
  </div>

  {isLoginOrRegister && (
    <MainButton
      onClick={() => router.push(targetRoute)}
      className="max-w-[150px] px-6 py-2 font-montserrat text-sm"
    >
      {buttonLabel}
    </MainButton>
  )}
</header>
  )
}
