import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { fetchUser, updateUser } from '@/services/users';
import { IUserFormData } from '@/types/User';
import toast from 'react-hot-toast';

export function useUser() {
  const queryClient = useQueryClient();

  const { data, isLoading, error } = useQuery<IUserFormData>({
    queryKey: ['user'],
    queryFn: fetchUser,
    staleTime: 1000 * 60 * 30,
    retry: 1,
    refetchOnWindowFocus: false,
  });

  const updateMutation = useMutation({
    mutationFn: updateUser,
    onSuccess: () => {
      toast.success('Perfil atualizado com sucesso!');
      queryClient.invalidateQueries({ queryKey: ['user'] });
      queryClient.invalidateQueries({ queryKey: ['logs'] }); 
    },
  });

  return {
    user: data,
    isLoading,
    error,
    updateUser: updateMutation,
  }
}