import { IBase } from "./base.model";
import { IBaseResponse } from "./base.model";

export interface IGrade extends IBase {
  gradeComponent: Array<{
    gradeComponentId: string;
    gradeComponentName: string;
    percentage: number;
    totalGrade: number;
    gradeSubComponent: Array<{
      gradeSubComponentId: string;
      gradeSubComponentName: string;
      percentage: number;
      grade: number;
    }>;
  }>;
}

export interface IGradeSingle {
  gradeComponentId: string;
  gradeComponentName: string;
  percentage: number;
  totalGrade: number;
  gradeSubComponent: Array<{
    gradeSubComponentId: string;
    gradeSubComponentName: string;
    percentage: number;
    grade: number;
  }>;
}

export interface ISubGrade {
  gradeSubComponentId: string;
  gradeSubComponentName: string;
  percentage: number;
  grade: number;
}

export interface IGradesRespone extends IBaseResponse<IGrade[]> {}
export interface IGradeRespone extends IBaseResponse<IGrade> {}

export interface IGradeItem {
  id?: string;
  _id?: string;
  index?: string;
  name: string;
  description?: string;
  percentage: string;
  order?: string;
  status?: string;
  grade?: string;
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
  totalGrade?: string;
  gradeSubComponent?: IGradeItem[];
}

export interface IGradeStructureUpdateRequest {
  courseId: string;
  gradeComponent: IGradeItemComponent[];
}

export interface IGradeItem {
  id?: string;
  _id?: string;
  index?: string;
  name: string;
  description?: string;
  percentage: string;
  order?: string;
  status?: string;
  grade?: string;
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
  totalGrade?: string;
  gradeSubComponent?: IGradeItem[];
}

export interface IGradeStructure {
  id?: string;
  _id?: string;
  courseId: string;
  status?: string;
  isEditable?: boolean;
  gradeComponent: IGradeItemComponent[];
}

export interface IGradeStructureResponse
  extends IBaseResponse<IGradeStructure> {}

export interface IGradeStructureUpdateRequest {
  courseId: string;
  gradeComponent: IGradeItemComponent[];
}

export interface IStudentGrade {
  id?: string;
  courseId: string;
  studentOfficialId: string;
  fullName: string;
  finalGrade?: string;
  status?: string;
  grade: IGradeStructure;
}

export interface IStudentBoardGradeResponse
  extends IBaseResponse<IStudentGrade[]> {}

export interface IUpdateStudentGradeRequest {
  courseId: string;
  gradeId: string;
  studentOfficialId: string;
  grade: number;
}

export interface IMarkFinallyGrade {
  courseId: string;
  gradeComponentId: string;
}
