'use client';

import { useUser } from '@/hooks/useUser';
import UserForm from '@/components/forms/UserForm';
import { IUserFormData } from '@/types/User';
import Loading from '@/components/Loading';

export default function Profile() {
  const { user, isLoading, updateUser } = useUser();

 const handleUpdateSubmit = async (formData: IUserFormData) => {
  updateUser.mutate(formData);
};

  if (isLoading) return <Loading />
  if (!user) return <p>Erro ao carregar perfil.</p>;

  return (
    <div className='w-full  md:flex md:justify-center'>
    <UserForm
      mode="edit"
      initialData={user}
      onSubmit={handleUpdateSubmit}
    />
    </div>
  );
}
