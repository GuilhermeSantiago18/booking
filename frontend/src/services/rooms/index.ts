import { IRoom } from '@/types/Room';
import { api } from '../api';

export async function getAllRooms(): Promise<IRoom[]> {
  const response = await api.get('/rooms');
  return response.data;
}


export async function updateRoom(data: IRoom): Promise<void> {
  await api.put(`/rooms/${data.roomId}`, data);
}
