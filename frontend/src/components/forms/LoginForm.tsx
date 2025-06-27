'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { login } from '@/services/authService';
import MainButton from '../buttons/MainButton';
import CustomInput from '../Inputs/CustomInput';
import toast from 'react-hot-toast';
import Cookies from 'js-cookie';
import { AxiosError } from 'axios';
import { useQueryClient } from '@tanstack/react-query';

export default function LoginForm() {
  const router = useRouter();
  const queryClient = useQueryClient();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const showPasswordInput = email.length > 0;

  const doLogin = async () => {
    setLoading(true);
    try {
      const loginResponse = await login({ email, password });
      localStorage.setItem('user', JSON.stringify(loginResponse.data.user));
      queryClient.setQueryData(['user'], loginResponse.data.user);
      Cookies.set('token', loginResponse.data.token, { path: '/', expires: 1 });
      toast.success(loginResponse.data.message);
      router.push('/dashboard/agendamentos');
    } catch (error) {
      console.error("Error login", error)
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    doLogin();
  };

  return (
    <div className="w-full max-w-sm sm:max-w-md p-4 md:p-2">
      <h2 className="text-2xl font-semibold mb-8 text-center font-montserrat max-w-md">
        Entre na sua conta
      </h2>
      <form onSubmit={handleSubmit} className="flex flex-col max-w-md bg-white p-4 md:p-8 rounded shadow-md">
        <CustomInput
          label="E-mail"
          titleRight="(Obrigatório)"
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Insira seu email"
          value={email}
          required
        />
        {showPasswordInput && (
          <CustomInput
            label="Senha de acesso"
            titleRight="(Obrigatório)"
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            placeholder="Insira sua senha"
            value={password}
            required
          />
        )}
        <MainButton disabled={loading || email.length === 0 || !password} className="font-montserrat font-medium text-sm">
          {loading ? 'Entrando...' : 'Acessar Conta'}
        </MainButton>
        <div className="flex justify-between items-center w-full mt-4">
          <p className="text-xs text-gray-900 font-montserrat">
            Ainda não tem um cadastro?
          </p>
          <a href="/register" className="underline font-montserrat font-semibold text-xs">
            Cadastre-se
          </a>
        </div>
      </form>
    </div>
  );
}
