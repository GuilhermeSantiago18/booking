import { IUserFormData } from "@/types/User";
import { api } from "../api";

export async function fetchUser(): Promise<IUserFormData> {
  const response = await api.get('/users/me'); 
  return response.data;
}


export async function updateUser(): Promise<IUserFormData> {
  const response = await api.put('/users/me'); 
  return response.data;
}