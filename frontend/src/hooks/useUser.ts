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
    onMutate: async (newUserData: IUserFormData) => {
           queryClient.cancelQueries({queryKey: ['user']})
      const previousUserData = queryClient.getQueryData<IUserFormData>(['user']);
      queryClient.setQueryData(['user'], newUserData);
      return { previousUserData };
    },
    onError: (err, newUserData, context) => {
      if (context?.previousUserData) {
        queryClient.setQueryData(['user'], context.previousUserData);
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries({queryKey: ['user']});
      queryClient.invalidateQueries({queryKey: ['logs']});
    },
    onSuccess: () => {
      toast.success('Perfil atualizado com sucesso!');
    }
  });

  return {
    user: data,
    isLoading,
    error,
    updateUser: updateMutation,
  };
}
