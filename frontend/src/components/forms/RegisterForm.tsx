'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { login } from '@/services/authService';
import MainButton from '../buttons/MainButton';
import CustomInput from '../Inputs/CustomInput';

export default function LoginForm() {
  const router = useRouter();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [cep, setCep] = useState('');


    const handleCepChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const raw = e.target.value.replace(/\D/g, '');
    const formatted = raw.replace(/^(\d{5})(\d{0,3})/, '$1-$2');
    setCep(formatted);

    if (raw.length === 8) {
        try {
        const res = await fetch(`https://viacep.com.br/ws/${raw}/json/`);
        const data = await res.json();

        if (data.erro) {
            alert('CEP inválido');
            return;
        }

        setAddress({
            street: data.logradouro,
            city: data.localidade,
            state: data.uf,
        });
        } catch (err) {
        alert('Erro ao buscar o CEP');
        }
    }
    };



  return (
    <div className="w-full max-w-sm sm:max-w-md md:max-w-lg">
        <h2 className="text-2xl font-semibold mb-6 text-center font-montserrat max-w-md">Cadastre-se</h2>
    <form
        className="flex flex-col max-w-md bg-white p-4 md:p-8 rounded shadow-md"
    >   
        <div className='flex gap-x-4'>
        <CustomInput label='Nome' titleRight='(Obrigatorio)' onChange={(e) => setEmail(e.target.value)} placeholder='Insira seu email'/>
         <CustomInput label='Sobrenome' titleRight='(Obrigatorio)' onChange={(e) => setEmail(e.target.value)} placeholder='Insira seu email'/>
        </div>

        <CustomInput label='E-mail' titleRight='(Obrigatorio)' onChange={(e) => setEmail(e.target.value)} placeholder='Insira seu email'/>
        <CustomInput label='Senha de acesso'  titleRight='(Obrigatorio)'  onChange={(e) => setPassword(e.target.value)} type='password' placeholder='Insira sua senha'/>
                <hr className="border-t border-gray-300 mb-4" />

        <CustomInput label='CEP'  
        titleRight='(Obrigatorio)' 
        value={cep}
        onChange={handleCepChange}
        maxLength={9}
        placeholder='Insira seu CEP'/>
        <MainButton children='Cadastrar-se' className='font-montserrat font-medium'  disabled={email.length === 0}/>
        <div className="flex justify-between align-center w-full">
      </div>
    </form>
    </div>
  );
}
