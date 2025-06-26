export interface IUser {
  firstName: string;
  lastName: string;
  role: 'admin' | 'client';
}

export interface IUserFormData {
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
  role: string;
}
