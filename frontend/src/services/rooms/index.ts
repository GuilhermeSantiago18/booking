import { api } from '../api';

export async function getAllRooms() {
  const response = await api.get('/rooms');
  return response.data;
}
