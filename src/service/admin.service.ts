import {
  API_ADMIN,
  API_ADMIN_BLOCK_USER,
  API_ADMIN_UN_BLOCK_USER,
} from "@/api/api.constant";
import { customAxios } from "@/api/custom-axios";
import { IBaseResponse } from "@/models/base.model";

export interface response {}

export class AdminService {
  async blockUser(userId: string): Promise<IBaseResponse<response>> {
    const response = await customAxios.post<IBaseResponse<response>>(
      `${API_ADMIN}${API_ADMIN_BLOCK_USER}`,
      { userId: userId }
    );

    return response.data;
  }
  async unblockUser(userId: string): Promise<IBaseResponse<response>> {
    const response = await customAxios.post<IBaseResponse<response>>(
      `${API_ADMIN}${API_ADMIN_UN_BLOCK_USER}`,
      { userId: userId }
    );

    return response.data;
  }
  async updateOfficialId(
    userId: string,
    officialId: string
  ): Promise<IBaseResponse<response>> {
    const response = await customAxios.post<IBaseResponse<response>>(
      `/admin/update-user-official-id`,
      { userId: userId, officialId: officialId }
    );
    return response.data;
  }
}
