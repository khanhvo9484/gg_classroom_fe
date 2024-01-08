import { API_GET_NOTIFICATION } from "@/api/api.constant";

import { customAxios } from "@/api/custom-axios";
import { INotification } from "@/models/notification.model";
export class NotificationService {
  async getNotification(userId: string): Promise<INotification[]> {
    const apiUrl = `${API_GET_NOTIFICATION.replace("{userId}", userId)}`;
    const response = await customAxios.get(apiUrl);
    return response.data.data;
  }
}
