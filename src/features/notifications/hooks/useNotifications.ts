import { useQuery } from "@tanstack/react-query";
import { getNotifications } from "../api/notifications-api";
import { authStorage } from "@/utils/auth-storage";

export const notificationsKeys = {
  list: (page: number) => ["notifications", page] as const,
};

export function useNotifications() {
  return useQuery({
    queryKey: notificationsKeys.list(1),
    queryFn: () => getNotifications(1),
    enabled: Boolean(authStorage.getAccessToken()),
    refetchInterval: 60_000,
    staleTime: 30_000,
  });
}
