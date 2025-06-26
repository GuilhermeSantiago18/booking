'use client';

import { useUser } from '@/hooks/useUser';
import UserForm from '@/components/forms/UserForm';
import { api } from '@/services/api';
import toast from 'react-hot-toast';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { IUserFormData } from '@/types/User';
import Loading from '@/components/Loading';

export default function Profile() {
  const { data: user, isLoading, isError } = useUser();
  const queryClient = useQueryClient();

  const updateUserMutation = useMutation({
  mutationFn: async (updatedData: IUserFormData) => {
    return api.put('/users/me', updatedData);
  },
  onSuccess: (response) => {
    toast.success('Perfil atualizado com sucesso!');
    queryClient.setQueryData(['user'], response.data);
  },
  onError: () => {
    toast.error('Erro ao atualizar perfil.');
  },
});


 const handleUpdateSubmit = async (formData: IUserFormData) => {
  updateUserMutation.mutate(formData);
};

    console.log("isError", isError, 'USER', user)
  if (isLoading) return <Loading />
  if (isError || !user) return <p>Erro ao carregar perfil.</p>;

  return (
    <UserForm
      mode="edit"
      initialData={user}
      onSubmit={handleUpdateSubmit}
    />
  );
}
