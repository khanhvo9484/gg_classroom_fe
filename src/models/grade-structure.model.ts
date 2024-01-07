import { IBase, IBaseResponse } from "./base.model"

export interface IGradeStructureComponent extends IBase {
	name: string
	percentage: number
	status: GradeStructureStatus
	order: number
	gradeSubComponent: IGradeSubComponent[]
}

export interface IGradeSubComponent extends IBase {
	name: string
	status: GradeSubComponentStatus
	percentage: number
}

export enum GradeStructureStatus {
	IS_NOT_GRADED = 'is_not_graded',
	IS_GRADED = 'is_graded'
}

export enum GradeSubComponentStatus {
	IS_NOT_GRADED = 'is_not_graded',
	IS_GRADED = 'is_graded'
}

export interface IGradeStructureComponentsRespone extends IBaseResponse<IGradeStructureComponent[]> {}
export interface IGradeStructureComponentRespone extends IBaseResponse<IGradeStructureComponent> {}