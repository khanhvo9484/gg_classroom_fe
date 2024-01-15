import useSWR from 'swr'
import { ClassService } from '@/service/class.service';

function useAllMembers(courseId: string) {
    const classService = new ClassService();

    const fetcher = async ([key, courseId] : [string, string]) => {
        console.log([key, courseId]);
        const response = await classService.getAllMemberInCourse(courseId);
        return response.data;
    }

    const { data, error, isLoading, mutate } = useSWR(["all-members", courseId], fetcher)

    return {
      members: data,
      membersIsLoading: isLoading,
      membersError: error,
      membersMutate: mutate
    }
}

export default useAllMembers;