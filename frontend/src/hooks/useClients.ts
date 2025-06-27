import { useMutation, useQueryClient, useQuery } from '@tanstack/react-query';
import { getAllClients } from '@/services/clients';
import { IClient } from '@/types/Client';
import { updateClient } from '@/services/clients';


export function useCLients() {
  const queryClient = useQueryClient();

  const { data, isLoading, error } = useQuery<IClient[]>({
    queryKey: ['clients'],
    queryFn: getAllClients,
    staleTime: 1000 * 60 * 30,
    retry: 1,
    refetchOnWindowFocus: false,
  });

  const updateClientMutation = useMutation({
    mutationFn: updateClient,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['clients'] });
      queryClient.invalidateQueries({ queryKey: ['user'] });
    }
  });


  return {
    clients: data,
    isLoading,
    error,
    updateClient: updateClientMutation
  }
}