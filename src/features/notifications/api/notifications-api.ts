import { apiClient } from "@/services/axios";
import type { NotificationsPage } from "../types/notification.types";

export const getNotifications = async (page = 1): Promise<NotificationsPage> => {
  const response = await apiClient.get("user/notifications", { params: { page } });
  return response.data.data;
};
