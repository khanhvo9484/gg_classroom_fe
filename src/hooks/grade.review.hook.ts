import useSWR from 'swr'
import { GradeReviewService } from '@/service/grade.review.service';


function useGradeReview (courseId) {
    const gradeReviewService = new GradeReviewService();

    const fetcher = async (courseId: string) => {
        const response = await gradeReviewService.getAllGradeReview(courseId);
        return response.data;
    }

    const { data, error, isLoading } = useSWR(courseId, fetcher)

    return {
      gradeReviews: data,
      gradeReviewsIsLoading: isLoading,
      gradeReviewsError: error
    }
}

export default useGradeReview;