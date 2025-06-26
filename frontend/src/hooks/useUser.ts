import { useQuery } from '@tanstack/react-query';
import { api } from '@/services/api';
import { IUserFormData } from '@/types/User';

async function fetchUser(): Promise<IUserFormData> {
  const response = await api.get('/users/me'); 
  return response.data;
}

export function useUser() {
  return useQuery<IUserFormData>({
    queryKey: ['user'],
    queryFn: fetchUser,
    staleTime: 1000 * 60 * 30,
    retry: 1, 
  });
}
