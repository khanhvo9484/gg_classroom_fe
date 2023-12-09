import {
  API_COURSES,
  API_GET_ALL_COURSE,
  API_GET_COURSE_BY_ID,
} from "@/api/api.constant";
import { customAxios } from "@/api/custom-axios";
import { ICourseRespone, ICoursesRespone } from "@/models/class.model";

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
}
