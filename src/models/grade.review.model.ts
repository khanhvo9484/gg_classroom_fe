import { IBase, IBaseResponse } from "./base.model";

export enum GradeReviewStatus {
  PENDING = "pending",
  APPROVED = "approved",
  REJECTED = "rejected",
}

export interface IGradeReview extends IBase {
  studentId: string;
  gradeId: string;
  currentGrade: number;
  courseId: string;
  expectedGrade?: number;
  explaination?: string;
  imgURL?: string;
  status?: GradeReviewStatus;
}

export interface IGradeReviewInfor {
  studentId: string;
  gradeId: string;
  currentGrade: number;
  name: string;
  expectedGrade?: number;
  explaination?: string;
  imgURL?: string;
  status?: GradeReviewStatus;
  courseId?: string;
}

export interface IGradeReviewRequest {
  studentId: string;
  gradeId: string;
  courseId: string;
  gradeName: string;
  currentGrade: number;
  expectedGrade: number;
  explaination?: string;
  file?: File;
}

export interface IGradeReviewsRespone extends IBaseResponse<IGradeReview[]> {}
export interface IGradeReviewRespone extends IBaseResponse<IGradeReview> {}
