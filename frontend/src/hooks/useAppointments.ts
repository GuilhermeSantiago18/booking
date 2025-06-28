import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getAllAppointments, createAppointment, cancelAppointment, updateStatusAppointment } from '@/services/appointments';
import { IAppointment, IUpdateStatusAppointment } from '@/types/Appointment';
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
  });

  const cancelMutation = useMutation({
    mutationFn: cancelAppointment,
    onSuccess: () => {
      toast.success('Agendamento cancelado!');
      queryClient.invalidateQueries({ queryKey: ['appointments'] });
    },
  });

   const updateStatusMutation = useMutation<void, Error, IUpdateStatusAppointment>({
    mutationFn: updateStatusAppointment,
    onSuccess: (_, variables) => {
      toast.success(`Agendamento ${variables.status.toLowerCase()}!`);
      queryClient.invalidateQueries({ queryKey: ['appointments'] });
    },
  });

  return {
    appointments: data,
    isLoading,
    error,
    createAppointment: createMutation,
    cancelAppointment: cancelMutation,
    updateStatusAppointment: updateStatusMutation,
  };
}
