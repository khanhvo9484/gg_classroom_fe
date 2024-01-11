import {
  API_COURSES,
  API_GET_ALL_COURSE,
  API_GET_ALL_ARCHIVED_COURSE,
  API_GET_ALL_COURSE_MEMBER,
  API_GET_COURSE_BY_ID,
  API_JOIN_BY_CODE,
  API_JOIN_BY_TOKEN,
  API_SEND_INVITATION,
  API_GET_GRADE_STRUCTURE,
  API_GRADE_STRUCTURE,
  API_UPDATE_GRADE_REWRITE,
  API_STUDENT_GRADE,
  API_GET_STUDENT_GRADE_BOARD,
  API_GET_ALL_COURSES,
  API_UPDATE_STUDENT_GRADE,
  API_MARK_GRADE_FINAL,
} from "@/api/api.constant";
import { customAxios } from "@/api/custom-axios";
import { IBaseResponse } from "@/models/base.model";
import {
  ICourseRespone,
  ICoursesRespone,
  IInvitationCourseRequest,
  IInvitationCourse,
  IVeryfiJoinCourseResponse,
  ITokenVeryfiJoinCourseRequest,
  IJoinCourseByCodeRequest,
  ICourse,
} from "@/models/class.model";
import {
  IGradeStructure,
  IGradeStructureResponse,
  IMarkFinallyGrade,
  IStudentBoardGradeResponse,
  IStudentGrade,
  IUpdateStudentGradeRequest,
} from "@/models/grade.model";
import { IAllMemberCourseRespone } from "@/models/member.model";
import { getSearchParams } from "@/utils/http.util";

export class ClassService {
  async getAllCourses(): Promise<ICoursesRespone> {
    const { data: response } = await customAxios.get<ICoursesRespone>(
      `${API_GET_ALL_COURSES}`
    );

    return response;
  }

  async getAllCourse(): Promise<ICoursesRespone> {
    const { data: response } = await customAxios.get<ICoursesRespone>(
      `${API_COURSES}${API_GET_ALL_COURSE}`
    );

    return response;
  }

  async getAllArchivedCourse(): Promise<ICoursesRespone> {
    const { data: response } = await customAxios.get<ICoursesRespone>(
      `${API_COURSES}${API_GET_ALL_ARCHIVED_COURSE}`
    );

    return response;
  }

  async getCourseById(
    courseId: string,
    signal?: AbortSignal
  ): Promise<ICourseRespone> {
    if (!signal) {
      const { data: response } = await customAxios.get<ICourseRespone>(
        `${API_COURSES}${API_GET_COURSE_BY_ID.replace("{courseId}", courseId)}`
      );
      return response;
    } else {
      const { data: response } = await customAxios.get<ICourseRespone>(
        `${API_COURSES}${API_GET_COURSE_BY_ID.replace("{courseId}", courseId)}`,
        { signal }
      );
      return response;
    }
  }

  async archivedCourseById(courseId: string): Promise<ICourseRespone> {
    const { data: response } = await customAxios.post(
      `${API_COURSES}/delete-course/${courseId}`
    );

    return response;
  }

  async reviveCourse(course: ICourse): Promise<ICourseRespone> {
    const payload = {
      description: course.description,
      name: course.name,
      isDeleted: false,
      id: course.id,
    };
    const { data: response } = await customAxios.put(
      "/courses/update-course",
      payload
    );

    return response;
  }

  async getAllMemberInCourse(
    courseId: string
  ): Promise<IAllMemberCourseRespone> {
    const { data: response } = await customAxios.get<IAllMemberCourseRespone>(
      `${API_COURSES}${API_GET_ALL_COURSE_MEMBER}`,
      {
        params: getSearchParams({
          courseId: courseId,
        }),
      }
    );

    return response;
  }

  async sendInvitationToJoinCourse(
    invitationRequest: IInvitationCourseRequest
  ): Promise<IBaseResponse<IInvitationCourse>> {
    const { data: response } = await customAxios.post<
      IBaseResponse<IInvitationCourse>
    >(`${API_COURSES}${API_SEND_INVITATION}`, invitationRequest);

    return response;
  }

  async verifyTokenInviteCourse(
    tokenVerifyRequest: ITokenVeryfiJoinCourseRequest
  ): Promise<IVeryfiJoinCourseResponse> {
    const { data: response } =
      await customAxios.post<IVeryfiJoinCourseResponse>(
        `${API_COURSES}${API_JOIN_BY_TOKEN}`,
        tokenVerifyRequest
      );

    return response;
  }

  async joinCourseByInviteCode(
    joinByCodeRequest: IJoinCourseByCodeRequest
  ): Promise<IVeryfiJoinCourseResponse> {
    const { data: response } =
      await customAxios.post<IVeryfiJoinCourseResponse>(
        `${API_COURSES}${API_JOIN_BY_CODE}`,
        joinByCodeRequest
      );

    return response;
  }

  async getGradeStructureCourse(courseId): Promise<IGradeStructureResponse> {
    const { data: response } = await customAxios.get<IGradeStructureResponse>(
      `${API_GRADE_STRUCTURE}${API_GET_GRADE_STRUCTURE.replace(
        "{courseId}",
        courseId
      )}`
    );

    return response;
  }

  async updateGradeStructureCourse(
    gradeStructureRequest: IGradeStructure
  ): Promise<IGradeStructureResponse> {
    const { data: response } = await customAxios.put<IGradeStructureResponse>(
      `${API_GRADE_STRUCTURE}${API_UPDATE_GRADE_REWRITE}`,
      gradeStructureRequest
    );

    return response;
  }

  async getStudentGradeBoardByCourseId(
    courseId: string
  ): Promise<IStudentBoardGradeResponse> {
    const { data: response } =
      await customAxios.get<IStudentBoardGradeResponse>(
        `${API_STUDENT_GRADE}${API_GET_STUDENT_GRADE_BOARD.replace(
          "{courseId}",
          courseId
        )}`
      );

    return response;
  }

  async updateStudentGrade(
    updateStudentGradeRequest: IUpdateStudentGradeRequest
  ): Promise<IBaseResponse<IStudentGrade>> {
    const { data: response } = await customAxios.put<
      IBaseResponse<IStudentGrade>
    >(
      `${API_STUDENT_GRADE}${API_UPDATE_STUDENT_GRADE}`,
      updateStudentGradeRequest
    );

    return response;
  }

  async markFinalizeGrade(
    markFinallizeGrade: IMarkFinallyGrade
  ): Promise<IGradeStructureResponse> {
    const { data: response } = await customAxios.put<IGradeStructureResponse>(
      `${API_GRADE_STRUCTURE}${API_MARK_GRADE_FINAL}`,
      markFinallizeGrade
    );

    return response;
  }
}
