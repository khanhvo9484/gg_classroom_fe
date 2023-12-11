import { IBase, IBaseResponse } from "./base.model";
import { IMember } from "./member.model";

export interface ICourse extends IBase {
  name: string;
  description?: string;
  inviteCode: string;
  courseOwnerId: string;
  courseOwner: IMember;
  roleInCourse: string;
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

export interface ITokenVeryfiJoinCourse extends IBase {
  userId: string;
  courseId: string;
  roleInCourse: string;
  invitationId: string;
}

export interface ITokenVeryfiJoinCourseResponse
  extends IBaseResponse<ITokenVeryfiJoinCourse> {}
