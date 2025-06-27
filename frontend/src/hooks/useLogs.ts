import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getAllLogs } from '@/services/logs';
import { ILogs } from '@/types/Logs';

export function useLogs() {

  const { data, isLoading, error } = useQuery<ILogs[]>({
    queryKey: ['logs'],
    queryFn: getAllLogs,
    staleTime: 1000 * 60 * 30,
    retry: 1,
    refetchOnWindowFocus: false,
  });


  return {
    user: data,
    isLoading,
    error,
  }
}