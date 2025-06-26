import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { api } from '@/services/api';
import { IAppointment } from '@/types/Appointment';
import toast from 'react-hot-toast';

export function useAppointments() {
  const queryClient = useQueryClient();

  const { data, isLoading, error } = useQuery<IAppointment[]>({
    queryKey: ['appointments'],
    queryFn: async () => {
      const response = await api.get('/appointments');
      return response.data;
    },
    staleTime: 1000 * 60 * 10,
  });

  const createAppointment = useMutation({
    mutationFn: async (newData: {
      date: string;
      time: string;
      room: string;
    }) => {
      return api.post('/appointments', newData);
    },
    onSuccess: () => {
      toast.success('Agendamento criado!');
      queryClient.invalidateQueries({ queryKey: ['appointments'] });
    },
    onError: () => toast.error('Erro ao criar agendamento'),
  });

  const cancelAppointment = useMutation({
    mutationFn: async (id: number) => {
      return api.delete(`/appointments/${id}`);
    },
    onSuccess: () => {
      toast.success('Agendamento cancelado!');
      queryClient.invalidateQueries({ queryKey: ['appointments'] });
    },
    onError: () => toast.error('Erro ao cancelar agendamento'),
  });

  return {
    appointments: data,
    isLoading,
    error,
    createAppointment,
    cancelAppointment,
  };
}
