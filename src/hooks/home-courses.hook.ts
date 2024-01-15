import useSWR from 'swr'
import { ClassService } from '@/service/class.service';

function useHomeCourses() {
    const classService = new ClassService();

    const fetcher = async (key: string) => {
        console.log(key);
        const response = await classService.getAllCourse();
        return response.data;
    }

    const { data, error, isLoading, mutate } = useSWR("home-courses", fetcher)

    const returnData = data?.filter((course) => !course.isDeleted);

    return {
      courses: returnData,
      coursesIsLoading: isLoading,
      coursesError: error,
      coursesMutate: mutate
    }
}

export default useHomeCourses;