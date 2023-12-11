import {
  API_COURSES,
  API_GET_ALL_COURSE,
  API_GET_ALL_COURSE_MEMBER,
  API_GET_COURSE_BY_ID,
  API_JOIN_BY_TOKEN,
  API_SEND_INVITATION,
} from "@/api/api.constant";
import { customAxios } from "@/api/custom-axios";
import { IBaseResponse } from "@/models/base.model";
import {
  ICourseRespone,
  ICoursesRespone,
  IInvitationCourseRequest,
  IInvitationCourse,
  ITokenVeryfiJoinCourseResponse,
  ITokenVeryfiJoinCourseRequest,
} from "@/models/class.model";
import { IAllMemberCourseRespone } from "@/models/member.model";
import { getSearchParams } from "@/utils/http.util";

export class ClassService {
  async getAllCourse(): Promise<ICoursesRespone> {
    const { data: response } = await customAxios.get<ICoursesRespone>(
      `${API_COURSES}${API_GET_ALL_COURSE}`
    );

    return response;
  }

  async getCourseById(courseId: string): Promise<ICourseRespone> {
    const { data: response } = await customAxios.get<ICourseRespone>(
      `${API_COURSES}${API_GET_COURSE_BY_ID.replace("{courseId}", courseId)}`
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
  ): Promise<ITokenVeryfiJoinCourseResponse> {
    const { data: response } =
      await customAxios.post<ITokenVeryfiJoinCourseResponse>(
        `${API_COURSES}${API_JOIN_BY_TOKEN}`,
        tokenVerifyRequest
      );

    return response;
  }
}
