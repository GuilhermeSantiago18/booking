'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { login } from '@/services/authService';
import MainButton from '../buttons/MainButton';

export default function LoginForm() {
  const router = useRouter();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    try {
      const data = await login({ email, password });
      localStorage.setItem('token', data.token);
      localStorage.setItem('user', JSON.stringify(data.user));
      router.push('/dashboard');
    } catch (err: any) {
      setError(err.response?.data?.message || 'Email ou senha inválidos');
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white p-8 rounded shadow-md w-full max-w-sm"
    >
      <h2 className="text-2xl font-semibold mb-6 text-center">Login</h2>

      {error && <p className="text-red-600 mb-4">{error}</p>}

      <label htmlFor="email" className="block mb-1 font-medium">
        Email
      </label>
      <input
        id="email"
        type="email"
        required
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="w-full border border-gray-300 rounded px-3 py-2 mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
      />

      <label htmlFor="password" className="block mb-1 font-medium">
        Senha
      </label>
      <input
        id="password"
        type="password"
        required
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="w-full border border-gray-300 rounded px-3 py-2 mb-6 focus:outline-none focus:ring-2 focus:ring-blue-500"
      />

        <MainButton children='Acessar Conta'/>

      <p className="mt-4 text-center text-sm text-gray-600">
        Não tem conta?{' '}
        <a
          href="/auth/register"
          className="text-blue-600 hover:underline"
        >
          Cadastre-se
        </a>
      </p>
    </form>
  );
}
