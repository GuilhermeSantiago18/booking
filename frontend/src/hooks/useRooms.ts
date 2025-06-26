import { useQuery } from '@tanstack/react-query';
import { IRoom } from '@/types/Room';
import { getAllRooms } from '@/services/rooms';


export function useRooms() {
  return useQuery<IRoom[]>({
    queryKey: ['rooms'],
    queryFn: getAllRooms,
    staleTime: 1000 * 60 * 30,
    retry: 1,
    refetchOnWindowFocus: false,
  });
}
