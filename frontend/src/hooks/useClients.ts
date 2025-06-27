import { useQuery } from '@tanstack/react-query';
import { getAllClients } from '@/services/clients';
import { IClient } from '@/types/Client';


export function useCLients() {

  const { data, isLoading, error } = useQuery<IClient[]>({
    queryKey: ['clients'],
    queryFn: getAllClients,
    staleTime: 1000 * 60 * 30,
    retry: 1,
    refetchOnWindowFocus: false,
  });


  return {
    clients: data,
    isLoading,
    error,
  }
}