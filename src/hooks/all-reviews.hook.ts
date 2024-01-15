import { customAxios } from '@/api/custom-axios';
import { IGradeReviewResponseKZ } from '@/pages/class-page/review-request-list/ui/review-list.component';
import useSWR from 'swr'

function useReviews(courseId: string, isTeacher: boolean) {
    const API_GRADE_REVIEW_LIST =
    "/grade-review/all-grade-review/{courseId}?roleInCourse={roleInCourseInput}";

    const fetcher = async ([courseId, isTeacher] : [string, boolean]): Promise<IGradeReviewResponseKZ[]> => {
        if (isTeacher) {
          const { data: response } = await customAxios.get(
            API_GRADE_REVIEW_LIST.replace("{courseId}", courseId).replace(
              "{roleInCourseInput}",
              "teacher"
            )
          );
          return response.data;
        } else {
          const { data: response } = await customAxios.get(
            API_GRADE_REVIEW_LIST.replace("{courseId}", courseId).replace(
              "{roleInCourseInput}",
              "student"
            )
          );
          return response.data;
        }
    };

    const { data, error, isLoading, mutate } = useSWR([courseId, isTeacher], fetcher)

    return {
      reviews: data,
      reviewsIsLoading: isLoading,
      reviewsError: error,
      reviewsMutate: mutate
    }
}

export default useReviews;