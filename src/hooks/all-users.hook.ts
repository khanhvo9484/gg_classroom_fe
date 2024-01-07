import useSWR from 'swr'
import { UserService } from '@/service/user.service';


function useAllUser() {
    const userService = new UserService();

    const fetcher = async (nothing: string) => {
        console.log(nothing);
        const response = await userService.getAllUsers();
        return response.data;
    }

    const { data, error, isLoading } = useSWR("Nothing", fetcher)

    return {
      users: data,
      usersIsLoading: isLoading,
      usersError: error
    }
}

export default useAllUser;