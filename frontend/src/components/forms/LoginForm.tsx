'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { login } from '@/services/authService';
import MainButton from '../buttons/MainButton';
import CustomInput from '../Inputs/CustomInput';
import toast from 'react-hot-toast';
import Cookies from 'js-cookie';
import { AxiosError } from 'axios';

export default function LoginForm() {
  const router = useRouter();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const loginResponse = await login({ email, password });
      Cookies.set('token', loginResponse.data.token, { path: '/', expires: 1 });
      toast.success(loginResponse.data.message);
      router.push('/dashboard/agendamentos');
    } catch (error) {
    if (error instanceof AxiosError && error.response) {
    const errorMessage = error.response.data?.error || 'Erro inesperado';
    toast.error(errorMessage);
    }
  };
}

  return (
  <div className="w-full max-w-sm sm:max-w-md p-4 md:p-2">
        <h2 className="text-2xl font-semibold mb-8 text-center font-montserrat max-w-md">Entre na sua conta</h2>
    <form
      onSubmit={handleSubmit}
        className="flex flex-col max-w-md bg-white p-4 md:p-8 rounded shadow-md"
    >
      {error && <p className="text-red-600 mb-4 text-sm font-montserrat">{error}</p>}

        <CustomInput label='E-mail' titleRight='(Obrigatorio)' onChange={(e) => setEmail(e.target.value)} placeholder='Insira seu email'/>
        {email.length > 0 && 
        <CustomInput label='Senha de acesso'  titleRight='(Obrigatorio)'  
        onChange={(e) => setPassword(e.target.value)} type='password' placeholder='Insira sua senha'/>}
        <MainButton children='Acessar Conta' className='font-montserrat font-medium text-sm'  disabled={email.length === 0}/>
        <div className="flex justify-between align-between w-full">
        <p className="mt-4 text-center text-xs text-gray-900 font-montserrat">
       Ainda não tem um cadastro?
        </p>
        <a
          href="/register"
          className="underline mt-4 font-montserrat font-semibold text-xs mr-8"
        >
         Cadastre-se
        </a>

      </div>
    </form>
    </div>
  );
}
