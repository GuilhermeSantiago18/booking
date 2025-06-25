'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import MainButton from '../buttons/MainButton';
import CustomInput from '../Inputs/CustomInput';
import { checkCep } from '@/services/checkCep';
import { register } from '@/services/authService';
import { AxiosError } from 'axios';

export default function RegisterForm() {
  const router = useRouter();

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [postalCode, setPostalCode] = useState('');
  const [address, setAddress] = useState({
    street: '',
    city: '',
    state: '',
    district: '',
  });

  const [number, setNumber] = useState('');
  const [complement, setComplement] = useState('');

  const inputBgClass = address.street ? 'bg-[#F0F0F0]' : 'bg-transparent';


  const handleCepChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    let raw = e.target.value.replace(/\D/g, '');
    if (raw.length > 8) raw = raw.slice(0, 8);
    const formatted = raw.length > 5 
      ? raw.replace(/^(\d{5})(\d{0,3})/, '$1-$2')
      : raw;

    setPostalCode(formatted);

    if (raw.length === 8) {
      try {
        const data = await checkCep(raw);

        if (data.erro) {
          alert('CEP inválido');
          setAddress({ street: '', city: '', state: '', district: '' });
          setNumber('');
          setComplement('');
          return;
        }

        setAddress({
          street: data.street || data.logradouro || '',
          city: data.city || data.localidade || '',
          state: data.state || data.uf || '',
          district: data.district || data.bairro || '',
        });
      } catch (err) {
        alert('Erro ao buscar o CEP');
      }
    } else {
      setAddress({ street: '', city: '', state: '', district: '' });
      setNumber('');
      setComplement('');
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
  e.preventDefault();

  if (
    !firstName ||
    !lastName ||
    !email ||
    !password ||
    !postalCode
  ) {
    alert('Preencha todos os campos obrigatórios');
    return;
  }

  const dataRegister = {
    firstName,
    lastName,
    email,
    password,
    postalCode,
    ...address,
    number,
    complement,
    role: 'client'
  };

  try {
    console.log("data register", JSON.stringify(dataRegister))
    const response = await register(dataRegister);
    console.log("RESPONSE ", response)
    if (response || response === 201) {
      router.push('/login');
    }
  } catch (error) {
  if (error instanceof AxiosError && error.response) {
    const errorMessage = error.response.data?.error || 'Erro inesperado';
    alert(errorMessage);
  } else {
    alert('Erro inesperado. Tente novamente.');
  }
  }
};



  return (
    <div className="w-full max-w-sm sm:max-w-md md:max-w-lg mt-18">
      <h2 className="text-2xl font-semibold mb-6 text-center font-montserrat max-w-md">Cadastre-se</h2>
      <form className="flex flex-col max-w-md bg-white p-4 md:p-8 rounded shadow-md" onSubmit={handleSubmit}>
        <div className="flex gap-x-4">
          <CustomInput
            label="Nome"
            titleRight="(Obrigatório)"
            onChange={(e) => setFirstName(e.target.value)}
            placeholder="Ex: Jose"
            value={firstName}
          />
          <CustomInput
            label="Sobrenome"
            titleRight="(Obrigatório)"
            onChange={(e) => setLastName(e.target.value)}
            placeholder="Ex: Lima"
            value={lastName}
          />
        </div>

        <CustomInput
          label="E-mail"
          titleRight="(Obrigatório)"
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Insira seu email"
          value={email}
        />
        <CustomInput
          label="Senha de acesso"
          titleRight="(Obrigatório)"
          onChange={(e) => setPassword(e.target.value)}
          type="password"
          placeholder="Insira sua senha"
          value={password}
        />
        <hr className="border-t border-gray-300 mb-4" />
        <CustomInput
          label="CEP"
          titleRight="(Obrigatório)"
          value={postalCode}
          onChange={handleCepChange}
          maxLength={9}
          placeholder="Insira seu CEP"
        />

        {address.street && (
          <>
            <CustomInput
              label="Endereço"
              value={address.street}
              onChange={(e) => setAddress(prev => ({ ...prev, street: e.target.value }))}
              placeholder="Rua, avenida, etc."
               inputClassName={inputBgClass}
            />
            <CustomInput
              label="Número"
              value={number}
              onChange={(e) => setNumber(e.target.value)}
              placeholder="Número"
            />
            <CustomInput
              label="Complemento"
              value={complement}
              onChange={(e) => setComplement(e.target.value)}
              placeholder="Apartamento, bloco, etc."
            />
            <CustomInput
              label="Bairro"
              value={address.district}
              onChange={(e) => setAddress(prev => ({ ...prev, district: e.target.value }))}
              placeholder="Bairro"
              inputClassName={inputBgClass}
            />
            <CustomInput
              label="Cidade"

              value={address.city}
              onChange={(e) => setAddress(prev => ({ ...prev, city: e.target.value }))}
              placeholder="Cidade"
              inputClassName={inputBgClass}
            />
            <CustomInput
              label="Estado"
              value={address.state}
              onChange={(e) => setAddress(prev => ({ ...prev, state: e.target.value }))}
              placeholder="Estado"
                inputClassName={inputBgClass}
            />
          </>
        )}

        <MainButton
          type='submit'
          children="Cadastrar-se"
          className="font-montserrat font-medium mt-2"
          disabled={email.length === 0}
        />
      </form>
    </div>
  );
}
