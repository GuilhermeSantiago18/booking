import { useQuery } from '@tanstack/react-query';
import { IUserFormData } from '@/types/User';
import { fetchUser } from '@/services/users';


export function useUser() {
  return useQuery<IUserFormData>({
    queryKey: ['user'],
    queryFn: fetchUser,
    staleTime: 1000 * 60 * 30,
    retry: 1, 
    refetchOnWindowFocus: false
  });
}
