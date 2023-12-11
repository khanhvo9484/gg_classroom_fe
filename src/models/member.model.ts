import { IBaseResponse } from "./base.model";
import { IInvitationCourse } from "./class.model";

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

export interface IMemberList {
  students: IMember[];
  teachers: IMember[];
}

export interface IAllMemberCourse {
  memberList: IMemberList;
  invitationList: IInvitationCourse[];
}

export interface IAllMemberCourseRespone
  extends IBaseResponse<IAllMemberCourse> {}
