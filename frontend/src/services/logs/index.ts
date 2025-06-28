import { ICreateLog, ILogs } from "../../types/Logs";
import { api } from "../api";

export async function getAllLogs(): Promise<ILogs[]> {
  const response = await api.get('/logs');
  return response.data;
}


export async function createLog(data: ICreateLog): Promise<ILogs> {
  const response = await api.post('/logs', data);
  return response.data;
}