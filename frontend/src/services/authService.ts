import { api } from './api';

interface LoginPayload {
  email: string;
  password: string;
}

interface RegisterPayload {
  name: string;
  email: string;
  password: string;
  cep: string;
  state: string;
  city: string;
  neighborhood: string;
  street: string;
  number?: string;
  complement?: string;
}

export async function login(data: LoginPayload) {
  const response = await api.post('/users/login', data);
  return response.data;
}

export async function register(data: RegisterPayload) {
  const response = await api.post('/users/register', data);
  return response.data;
}
