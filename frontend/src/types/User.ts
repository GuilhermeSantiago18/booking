export interface IUser {
  firstName: string;
  lastName: string;
  role: IRole;
}

export interface IUserFormData {
  cep: string;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  postalCode: string;
  street: string;
  city: string;
  state: string;
  district: string;
  number?: string;
  complement?: string;
  role: IRole;
  canViewLogs: boolean,
  canSchedule: boolean,
  status: boolean
}


export enum IRole {
  ADMIN = 'admin',
  CLIENT = 'client',

}