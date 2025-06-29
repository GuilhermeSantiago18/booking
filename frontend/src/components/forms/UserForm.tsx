'use client';

import { useMemo, useState } from 'react';
import CustomInput from '../Inputs/CustomInput';
import MainButton from '../buttons/MainButton';
import { checkCep } from '@/services/checkCep';
import Loading from '../Loading';
import { useQueryClient } from '@tanstack/react-query';
import { IRole, IUserFormData } from '@/types/User';

interface Address {
  street: string;
  city: string;
  state: string;
  district: string;
}

interface UserFormProps {
  mode: 'register' | 'edit';
  initialData: IUserFormData;
  onSubmit: (data: IUserFormData) => Promise<void>;
}

export default function UserForm({ mode, initialData, onSubmit }: UserFormProps) {
  const queryClient = useQueryClient();

  const [firstName, setFirstName] = useState(initialData.firstName || '');
  const [lastName, setLastName] = useState(initialData.lastName || '');
  const [email, setEmail] = useState(initialData.email || '');
  const [password, setPassword] = useState('');
  const [postalCode, setPostalCode] = useState(initialData.cep || '');
  const [address, setAddress] = useState<Address>({
    street: initialData.street || '',
    city: initialData.city || '',
    state: initialData.state || '',
    district: initialData.district || '',
  });
  const [number, setNumber] = useState(initialData.number || '');
  const [complement, setComplement] = useState(initialData.complement || '');
  const [load, setLoad] = useState(false);

  const isEditMode = mode === 'edit';

  const inputBgClass = address.city ? 'bg-[#F0F0F0]' : 'bg-transparent';

  const handleCepChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    let raw = e.target.value.replace(/\D/g, '');
    if (raw.length > 8) raw = raw.slice(0, 8);
    const formatted = raw.length > 5 ? raw.replace(/^(\d{5})(\d{0,3})/, '$1-$2') : raw;

    setPostalCode(formatted);

    if (raw.length === 8) {
      try {
        setLoad(true);
        const { data } = await checkCep(raw);
        if (data) {
          setAddress({
            street: data.street || data.logradouro || '',
            city: data.city || data.localidade || '',
            state: data.state || data.uf || '',
            district: data.district || data.bairro || '',
          });
        }
      } catch (error) {
        console.error('error user form', error);
      } finally {
        setLoad(false);
      }
    } else {
      setAddress({ street: '', city: '', state: '', district: '' });
      setNumber('');
      setComplement('');
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const payload: IUserFormData = {
      firstName,
      lastName,
      email,
      password,
      postalCode,
      ...address,
      number,
      complement,
      role: IRole.CLIENT,
      canViewLogs: true,
      canSchedule: true,
      status: true,
    };

    queryClient.setQueryData(['user'], payload);
    await onSubmit(payload);
  };

  const isFormChanged = useMemo(() => {
    return (
      firstName !== initialData.firstName ||
      lastName !== initialData.lastName ||
      email !== initialData.email ||
      postalCode !== initialData.cep ||
      address.street !== initialData.street ||
      address.city !== initialData.city ||
      address.state !== initialData.state ||
      address.district !== initialData.district ||
      number !== initialData.number ||
      complement !== initialData.complement ||
      password.trim() !== ''
    );
  }, [
    firstName,
    lastName,
    email,
    postalCode,
    address,
    number,
    complement,
    password,
    initialData,
  ]);

  return (
    <form
      className="flex flex-col max-w-md bg-white p-4 md:p-8 rounded shadow-md"
      onSubmit={handleSubmit}
    >
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
        readOnly={isEditMode}
      />

      <CustomInput
        label={isEditMode ? "Nova senha de acesso" : "Senha de acesso"}
        titleRight={isEditMode ? "" : "(Obrigatório)"}
        onChange={(e) => setPassword(e.target.value)}
        type="password"
        placeholder={isEditMode ? 'Nova senha' : 'Insira sua senha'}
        value={password}
      />

      <CustomInput
        label="CEP"
        titleRight="(Obrigatório)"
        value={postalCode}
        onChange={handleCepChange}
        maxLength={9}
        placeholder="Insira seu CEP"
      />

      {address.city && (
        <>
          <CustomInput
            label="Endereço"
            value={address.street}
            onChange={(e) =>
              setAddress((prev) => ({ ...prev, street: e.target.value }))
            }
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
            onChange={(e) =>
              setAddress((prev) => ({ ...prev, district: e.target.value }))
            }
            placeholder="Bairro"
            inputClassName={inputBgClass}
          />
          <CustomInput
            label="Cidade"
            value={address.city}
            onChange={(e) =>
              setAddress((prev) => ({ ...prev, city: e.target.value }))
            }
            placeholder="Cidade"
            inputClassName={inputBgClass}
          />
          <CustomInput
            label="Estado"
            value={address.state}
            onChange={(e) =>
              setAddress((prev) => ({ ...prev, state: e.target.value }))
            }
            placeholder="Estado"
            inputClassName={inputBgClass}
          />
        </>
      )}

      <MainButton
        type="submit"
        className="font-montserrat font-medium mt-2"
        disabled={isEditMode && !isFormChanged}
      >
        {mode === 'register' ? 'Cadastrar-se' : 'Atualizar Dados'}
      </MainButton>

      {load && <Loading />}
    </form>
  );
}
