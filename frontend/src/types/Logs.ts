import { IUser } from "./User";

export interface ILogs {
  id: number;
  type: string;
  module: string;
  user: IUser
  createdAt: Date,
  updatedAt: Date

}
