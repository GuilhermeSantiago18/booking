import { IRole } from "./User";

export interface IClient {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  cep: string;
  street: string;
  number: string;
  complement: string;
  district: string;
  city: string;
  state: string;
  role: IRole
  canSchedule: boolean;
  canViewLogs: boolean;
  status: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface IClientRow {
  id: number;
  createdAt: string;
  nome: string;
  endereco: string;
  canSchedule: boolean;
  canViewLogs: boolean;
  status: boolean;
}

export interface IUpdateClient {
  canSchedule?: boolean,
  canViewLogs?: boolean,
  status?: boolean
}