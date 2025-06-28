import { IUser } from "./User";

export interface ILogs {
  id: number;
  type: string;
  module: string;
  user: IUser
  createdAt: Date,
  updatedAt: Date

}


export interface ICreateLog {
  type: string,
  module: string
}



export interface ILogRowTable {
  id: number;
  client: string;
  type: string;
  module: string;
  dateTime: string;
}

