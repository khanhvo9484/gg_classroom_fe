import {
    API_GRADE_REVIEW,
    API_GET_ALL_GRADE_REVIEW,
} from "@/api/api.constant";
import { customAxios } from "@/api/custom-axios";
import { IGradeReview } from "@/models/grade.review.model";
import { IGradeReviewsRespone } from "@/models/grade.review.model";

export class GradeReviewService {
    async getAllGradeReview(courseId: string): Promise<IGradeReviewsRespone> {
        const { data: response } = await customAxios.get<IGradeReviewsRespone>(
            `${API_GRADE_REVIEW}${API_GET_ALL_GRADE_REVIEW}${courseId}`
        );

        return response;
    }
}
