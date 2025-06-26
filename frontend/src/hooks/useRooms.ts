import { useQuery } from '@tanstack/react-query';
import { api } from '@/services/api';
import { IRoom } from '@/types/Room';

async function fetchRooms(): Promise<IRoom[]> {
  const response = await api.get('/rooms');
  return response.data;
}

export function useRooms() {
  return useQuery<IRoom[]>({
    queryKey: ['rooms'],
    queryFn: fetchRooms,
    staleTime: 1000 * 60 * 30,
    retry: 1,
    refetchOnWindowFocus: false,
  });
}
