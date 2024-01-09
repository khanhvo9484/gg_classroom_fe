import { IBase, IBaseResponse } from "./base.model";
import UserModel from "./user.model";

export interface ICourse extends IBase {
  name: string;
  description?: string;
  inviteCode: string;
  courseOwnerId: string;
  courseOwner: UserModel;
  roleInCourse: string;
  isDeleted?: boolean;
}

export interface ICoursesRespone extends IBaseResponse<ICourse[]> {}
export interface ICourseRespone extends IBaseResponse<ICourse> {}

export interface IInvitationCourseRequest {
  inviterId: string;
  inviteeEmail: string;
  courseId: string;
  roleInCourse: string;
}

export interface IInvitationCourse extends IBase {
  inviterId: string;
  inviteeEmail: string;
  status: string;
  courseId: string;
  roleInCourse: string;
}

export interface ITokenVeryfiJoinCourseRequest {
  inviteToken: string;
}

export interface IVeryfiJoinCourse extends IBase {
  userId: string;
  courseId: string;
  roleInCourse: string;
  invitationId: string;
}

export interface IVeryfiJoinCourseResponse
  extends IBaseResponse<IVeryfiJoinCourse> {}

export interface IJoinCourseByCodeRequest {
  inviteCode: string;
  userId: string;
}
