import { api } from "./api";



export async function checkCep(cep: string) {
  console.log("api", api)
  const response = await api.get(`/api/cep/${cep}`,);
  return response;
}