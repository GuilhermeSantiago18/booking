export interface IAppointment {
  id: number;
  date: string;
  time: string; 
  status: 'PENDENTE' | 'CONFIRMADO' | 'RECUSADO';
  user: {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
  };
  room: {
    id: number;
    name: string;
    description?: string;
  };
  createdAt: string;
  updatedAt: string;
}
