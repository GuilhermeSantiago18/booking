import { api } from './api';
import { IUserFormData } from '@/types/User';


interface LoginPayload {
  email: string;
  password: string;
}


export async function login(data: LoginPayload) {
  const response = await api.post('/users/login', data);
  return response;
}

export async function register(data: IUserFormData) {
  const response = await api.post('/users/register', data);
  return response;
}
