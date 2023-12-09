import {
  API_COURSES,
  API_GET_ALL_COURSE,
  API_GET_COURSE_BY_ID,
  API_SEND_INVITATION,
} from "@/api/api.constant";
import { customAxios } from "@/api/custom-axios";
import { IBaseResponse } from "@/models/base.model";
import {
  ICourseRespone,
  ICoursesRespone,
  IInvitationCourseRequest,
  IInvitationCourseResponse,
} from "@/models/class.model";

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

  async sendInvitationToJoinCourse(
    invitationRequest: IInvitationCourseRequest
  ): Promise<IBaseResponse<IInvitationCourseResponse>> {
    const { data: response } = await customAxios.post<
      IBaseResponse<IInvitationCourseResponse>
    >(`${API_COURSES}${API_SEND_INVITATION}`, invitationRequest);

    return response;
  }
}
