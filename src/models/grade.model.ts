import { IBase } from "./base.model"

export interface IGrade extends IBase{
	gradeComponent: Array<{
		gradeComponentId: string
		gradeComponentName: string
		percentage: number
		totalGrade: number
		gradeSubComponent: Array<{
			gradeSubComponentId: string
			gradeSubComponentName: string
			percentage: number
			grade: number
		}>
	}>
}

export interface IGradeSingle {
	gradeComponentId: string
	gradeComponentName: string
	percentage: number
	totalGrade: number
	gradeSubComponent: Array<{
		gradeSubComponentId: string
		gradeSubComponentName: string
		percentage: number
		grade: number
	}>
}

export interface ISubGrade {
	gradeSubComponentId: string
	gradeSubComponentName: string
	percentage: number
	grade: number
}

export interface IGradesRespone extends IBaseResponse<IGrade[]> {}
export interface IGradeRespone extends IBaseResponse<IGrade> {}

import { IBaseResponse } from "./base.model";

export interface IGradeItem {
  id?: string;
  _id?: string;
  index?: string;
  name: string;
  description?: string;
  percentage: string;
  order?: string;
  status?: string;
}

export interface IGradeItemComponent {
  index?: number;
  id?: string;
  _id?: string;
  name: string;
  description?: string;
  percentage: string;
  order?: string;
  status?: string;
  gradeSubComponent?: IGradeItem[];
}

export interface IGradeStructure {
  id?: string;
  _id?: string;
  courseId: string;
  status?: string;
  gradeComponent: IGradeItemComponent[];
}

export interface IGradeStructureResponse
  extends IBaseResponse<IGradeStructure> {}

export interface IGradeStructureUpdateRequest {
  courseId: string;
  gradeComponent: IGradeItemComponent[];
}

