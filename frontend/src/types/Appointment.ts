export interface IAppointment {
  room_id: number;
  id: number;
  date: string;
  time: string;
  status: 'PENDENTE' | 'CONFIRMADO' | 'RECUSADO';
  User: {
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

export interface ICreateAppointmentData {
  date: string;
  time: string;
  room: string;
}



type Status = 'CONFIRMADO' | 'CANCELADO';

export interface IUpdateStatusAppointment {
  id: number;
  status: Status;
}
