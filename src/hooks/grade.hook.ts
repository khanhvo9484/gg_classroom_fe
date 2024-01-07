import useSWR from 'swr'
import { GradeService } from '@/service/grade.service';


function useGrade(courseId) {
    const gradeService = new GradeService();

    const fetcher = async (courseId: string) => {
        const response = await gradeService.getGrade(courseId);
        return response.data;
    }

    const { data, error, isLoading } = useSWR(courseId, fetcher)

    return {
      grade: data,
      gradeIsLoading: isLoading,
      gradeError: error
    }
}

export default useGrade;