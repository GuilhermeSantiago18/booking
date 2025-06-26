import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getAllAppointments, createAppointment, cancelAppointment } from '@/services/appointments';
import { IAppointment } from '@/types/Appointment';
import toast from 'react-hot-toast';


export function useAppointments() {
  const queryClient = useQueryClient();


  const { data, isLoading, error } = useQuery<IAppointment[]>({
    queryKey: ['appointments'],
    queryFn: getAllAppointments,
    staleTime: 1000 * 60 * 10,
  });

  const createMutation = useMutation({
    mutationFn: createAppointment,
    onSuccess: () => {
      toast.success('Agendamento criado!');
      queryClient.invalidateQueries({ queryKey: ['appointments'] });
    },
    onError: () => toast.error('Erro ao criar agendamento'),
  });

  const cancelMutation = useMutation({
    mutationFn: cancelAppointment,
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
    createAppointment: createMutation,
    cancelAppointment: cancelMutation,
  };
}
