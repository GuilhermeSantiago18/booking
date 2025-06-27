import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getAllRooms, updateRoom } from '@/services/rooms';
import { IRoom } from '@/types/Room';
import toast from 'react-hot-toast';

export function useRooms() {
  const queryClient = useQueryClient();

  const { data, isLoading, error } = useQuery<IRoom[]>({
    queryKey: ['rooms'],
    queryFn: getAllRooms,
    staleTime: 1000 * 60 * 30,
    retry: 1,
    refetchOnWindowFocus: false,
  });

  const updateRoomMutation = useMutation<void, Error, IRoom>({
    mutationFn: updateRoom,
    onSuccess: (_, variables) => {
      toast.success(`Sala "${variables.name}" atualizada com sucesso!`);
      queryClient.invalidateQueries({ queryKey: ['rooms'] });
    },
  });

  return {
    rooms: data,
    isLoading,
    error,
    updateRoom: updateRoomMutation,
  };
}
