import useSWR from "swr";
import { NotificationService } from "@/service/notification.service";

function useNotification(userId: string) {
  const notificationService = new NotificationService();

  const fetcher = async (userId: string) => {
    const response = await notificationService.getNotification(userId);
    return response;
  };
  const { data, error, isLoading } = useSWR(userId, fetcher); // Fix: Remove the immediate invocation of fetcher

  return {
    notifications: data,
    notificationIsLoading: isLoading,
    notificationError: error,
  };
}

export default useNotification;
