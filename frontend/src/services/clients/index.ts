import { IClient, IUpdateClient } from '@/types/Client';
import { api } from '../api';

export async function getAllClients(): Promise<IClient[]> {
  const response = await api.get('/clients'); 
  return response.data;
}

export async function updateClient({
  id,
  data,
}: {
  id: number;
  data: IUpdateClient;
}): Promise<IClient> {
  const response = await api.put(`/clients/${id}`, data);
  return response.data;
}
