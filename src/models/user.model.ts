import { IBaseResponse } from "./base.model";

export default interface UserModel {
  id: string;
  name: string;
  email: string;
  role: string;
  dob: string;
  bio: string;
  avatar: string;
  accountType: string;
  phone_number: string;
  isSuspensed: boolean;
  isBlocked: boolean;
  studentOfficialId: string;
}

export interface UserModelsRespone extends IBaseResponse<UserModel[]> {}
export interface UserModelRespone extends IBaseResponse<UserModel> {}
