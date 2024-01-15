import useSWR from 'swr'
import { ClassService } from '@/service/class.service';

function useCourse(courseId: string) {
    const classService = new ClassService();

    const fetcher = async (courseId: string) => {
        const response = await classService.getCourseById(courseId);
        return response.data;
    }

    const { data, error, isLoading, mutate } = useSWR(courseId, fetcher)

    return {
      course: data,
      courseIsLoading: isLoading,
      courseError: error,
      courseMutate: mutate
    }
}

export default useCourse;