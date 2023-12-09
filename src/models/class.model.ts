import { IBase, IBaseResponse } from "./base.model";
import { IMember } from "./member.model";

export interface ICourse extends IBase {
  name: string;
  description?: string;
  inviteCode: string;
  courseOwnerId: string;
  courseOwner: IMember;
}

export interface ICoursesRespone extends IBaseResponse<ICourse[]> {}
export interface ICourseRespone extends IBaseResponse<ICourse> {}

export interface IInvitationCourseRequest {
  inviterId: string;
  inviteeEmail: string;
  courseId: string;
  roleInCourse: string;
}

export interface IInvitationCourseResponse extends IBase {
  inviterId: string;
  inviteeEmail: string;
  status: string;
  courseId: string;
  roleInCourse: string;
}
