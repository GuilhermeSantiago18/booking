import { IClient } from '@/types/Client';
import { api } from '../api';

export async function getAllClients(): Promise<IClient[]> {
  const response = await api.get('/clients'); 
  return response.data;
}