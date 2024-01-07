import { IBase, IBaseResponse } from "./base.model";

export enum GradeReviewStatus {
	PENDING = 'pending',
	APPROVED = 'approved',
	REJECTED = 'rejected'
}

export interface IGradeReview extends IBase {
	studentId: string
	gradeId: string
	currentGrade: number
	expectedGrade: number
	explaination: string
	imgURL: string
	status: GradeReviewStatus
}

export interface IGradeReviewsRespone extends IBaseResponse<IGradeReview[]> {}
export interface IGradeReviewRespone extends IBaseResponse<IGradeReview> {}

