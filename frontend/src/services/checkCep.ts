import { api } from "./api";



export async function checkCep(cep: string) {
  const response = await api.get(`v1/api/cep/${cep}`,);
  return response.data;
}