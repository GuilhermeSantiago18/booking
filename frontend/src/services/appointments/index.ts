import { api } from '../api';

export async function getAllAppointments() {
  const response = await api.get('/appointments');
  return response.data;
}

export async function createAppointment(data: {
  date: string;
  time: string;
  room: string;
}) {
  const response = await api.post('/appointments', data);
  return response.data;
}
