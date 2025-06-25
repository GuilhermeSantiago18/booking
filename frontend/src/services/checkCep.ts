import { api } from "./api";



export async function checkCep(cep: string) {
  const response = await api.get(`/api/cep/${cep}`,);
  return response;
}