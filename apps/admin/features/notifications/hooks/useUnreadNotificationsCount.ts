import { useQuery } from "@tanstack/react-query";
import { getUnreadNotificationsCount } from "../services/notificationsService";

export function useUnreadNotificationsCount() {
  const {
    data: unreadCount,
    isLoading,
    isError,
    error,
    refetch,
  } = useQuery({
    queryKey: ["unreadNotificationsCount"],
    queryFn: getUnreadNotificationsCount,
  });

  return {
    unreadCount: unreadCount ?? 0,
    isLoading,
    isError,
    error,
    refetch,
  };
}
