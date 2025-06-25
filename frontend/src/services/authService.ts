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
  postalCode: string;
  state: string;
  city: string;
  district: string;
  street: string;
  number?: string;
  complement?: string;
  role: string
}

export async function login(data: LoginPayload) {
  const response = await api.post('/users/login', data);
  return response;
}

export async function register(data: RegisterPayload) {
  const response = await api.post('/users/register', data);
  return response;
}
