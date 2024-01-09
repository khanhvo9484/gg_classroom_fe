import useSWR from 'swr'
import { ClassService } from '@/service/class.service';

function useAllCourses() {
    const classService = new ClassService();

    const fetcher = async (nothing: string) => {
        console.log(nothing);
        const response = await classService.getAllCourses();
        return response.data;
    }

    const { data, error, isLoading, mutate } = useSWR("all-courses", fetcher)

    return {
      courses: data,
      coursesIsLoading: isLoading,
      coursesError: error,
      coursesMutate: mutate
    }
}

export default useAllCourses;