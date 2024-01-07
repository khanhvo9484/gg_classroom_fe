import useSWR from 'swr'
import { GradeStructureService } from '@/service/grade-structure.service';


function useGradeStructure (courseId) {
    const gradeStructureService = new GradeStructureService();

    const fetcher = async (courseId: string) => {
        const response = await gradeStructureService.getGradeStructure(courseId);
        return response.data;
    }

    const { data, error, isLoading } = useSWR(courseId, fetcher)

    return {
      gradeStructure: data,
      gradeStructureIsLoading: isLoading,
      gradeStructureError: error
    }
}

export default useGradeStructure;