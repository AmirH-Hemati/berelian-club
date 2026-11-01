import { useQuery } from "@tanstack/react-query";
import { getMyNotifications } from "../services/notificationsService";

export function useMyNotifications() {
  const {
    data: notifications,
    isLoading,
    isError,
    refetch,
  } = useQuery({
    queryKey: ["notifications"],
    queryFn: getMyNotifications,
  });

  return { notifications, isLoading, isError, refetch };
}
