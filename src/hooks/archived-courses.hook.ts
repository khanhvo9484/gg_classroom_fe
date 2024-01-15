import useSWR from 'swr'
import { ClassService } from '@/service/class.service';

function useArchivedCourses() {
    const classService = new ClassService();

    const fetcher = async (key: string) => {
        console.log(key);
        const response = await classService.getAllArchivedCourse();
        return response.data;
    }

    const { data, error, isLoading, mutate } = useSWR("archived-courses", fetcher)

    return {
      coursesArchived: data,
      coursesIsLoading: isLoading,
      coursesError: error,
      coursesArchivedMutate: mutate
    }
}

export default useArchivedCourses;