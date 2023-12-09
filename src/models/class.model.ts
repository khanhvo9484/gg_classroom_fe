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
