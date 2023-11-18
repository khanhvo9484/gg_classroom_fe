import { IBaseResponse } from "./base.model";

export interface IMember {
  id: string;
  name: string;
  avatar: string;
  email?: string;
  bio?: string;
  role?: string;
  dob?: string;
  phoneNumber?: string;
}

export interface IMemberRespone extends IBaseResponse<IMember> {
  createAt: string;
  updatedAt: string;
}
