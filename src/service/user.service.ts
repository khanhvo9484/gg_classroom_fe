import {
    API_GET_ALL_USER,
} from "@/api/api.constant";
import { customAxios } from "@/api/custom-axios";
import { UserModelsRespone } from "@/models/user.model";

export class UserService {
    async getAllUsers(): Promise<UserModelsRespone> {
        const response = await customAxios.get<UserModelsRespone>(
            `${API_GET_ALL_USER}`
        );

        return response.data;
    }

}
