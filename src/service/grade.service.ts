import { API_STUDENT_GRADE } from "@/api/api.constant";
import { customAxios } from "@/api/custom-axios";
import { IBaseResponse } from "@/models/base.model";
import {
  IStudentGrade,
} from "@/models/grade.model";

export class GradeService {
  async getGradeByStudentId(
    studentId: string,
    courseId: string
  ): Promise<IBaseResponse<IStudentGrade>> {
    const { data: response } = await customAxios.get<
      IBaseResponse<IStudentGrade>
    >(`${API_STUDENT_GRADE}${API_STUDENT_GRADE}/${courseId}/${studentId}`);

    return response;
  }
}
