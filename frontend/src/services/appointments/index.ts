import { ICreateAppointmentData, IAppointment } from '@/types/Appointment';
import { api } from '../api';

export async function getAllAppointments(): Promise<IAppointment[]> {
  const response = await api.get('/appointments');
  return response.data;
}

export async function createAppointment(data: ICreateAppointmentData): Promise<IAppointment> {
  const response = await api.post('/appointments', data);
  return response.data;
}

export async function cancelAppointment(id: number): Promise<void> {
  await api.delete(`/appointments/${id}`);
}

export async function confirmAppointment(id: number): Promise<void> {
  await api.patch(`/appointments/${id}`);
}

