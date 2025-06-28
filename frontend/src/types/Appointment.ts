import { IRole } from "./User";

export interface ICreateAppointmentData {
  date: string;
  time: string;
  room: string;
}


export enum AppointmentStatus {
  PENDENTE = 'PENDENTE',
  CONFIRMADO = 'CONFIRMADO',
  RECUSADO = 'RECUSADO'
}

export interface IUpdateStatusAppointment {
  id: number;
  status: AppointmentStatus;
}


export interface IAppointment {
  room_id: number;
  id: number;
  date: string;
  time: string;
  status: AppointmentStatus
  User: {
    role: IRole;
    firstName: string;
    lastName: string;
  };
  Room: {
    name: string;
    description?: string;
  };
  createdAt: string;
  updatedAt: string;
}

export interface IAppointmentRow {
  id: number;
  status: AppointmentStatus;
  date: string;
  nome: string;       
  roomName: string;   
  time: string;
  room_id: number;
}
