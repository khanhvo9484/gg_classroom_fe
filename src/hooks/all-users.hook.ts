import useSWR from 'swr'
import { UserService } from '@/service/user.service';


function useAllUser() {
    const userService = new UserService();

    const fetcher = async (nothing: string) => {
        console.log(nothing);
        const response = await userService.getAllUsers();
        return response.data;
    }

    const { data, error, isLoading, mutate } = useSWR("all-users", fetcher)

    return {
      users: data,
      usersIsLoading: isLoading,
      usersError: error,
      usersMutate: mutate
    }
}

export default useAllUser;