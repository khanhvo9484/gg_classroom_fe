import useSWR from 'swr'
import { ClassService } from '@/service/class.service';
import { useContext } from 'react';
import LoadingContext from '@/context/loading.contenxt';

function useHomeCourses() {
    const classService = new ClassService();
    const { startLoading, stopLoading } = useContext(LoadingContext);
    startLoading();
    const fetcher = async (key: string) => {
        console.log(key);
        const response = await classService.getAllCourse();
        return response.data;
    }

    const { data, error, isLoading, mutate } = useSWR("home-courses", fetcher)

    const returnData = data?.filter((course) => !course.isDeleted);

    stopLoading();
    return {
      courses: returnData,
      coursesIsLoading: isLoading,
      coursesError: error,
      coursesMutate: mutate
    }
}

export default useHomeCourses;