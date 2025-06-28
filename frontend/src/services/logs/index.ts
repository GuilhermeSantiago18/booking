import { ILogs } from "../../types/Logs";
import { api } from "../api";

export async function getAllLogs(): Promise<ILogs[]> {
  const response = await api.get('/logs');
  return response.data;
}