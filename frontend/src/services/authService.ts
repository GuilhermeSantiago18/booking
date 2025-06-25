import { api } from './api';

interface LoginPayload {
  email: string;
  password: string;
}

interface RegisterPayload {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  cep: string;
  state: string;
  city: string;
  district: string;
  street: string;
  number?: string;
  complement?: string;
  role: string
}

export async function login(data: LoginPayload) {
  const response = await api.post('/v1/users/login', data);
  return response.data;
}

export async function register(data: RegisterPayload) {
  const response = await api.post('/v1/users/register', data);
  return response.data;
}
